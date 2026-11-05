/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, h, Prop, State, Watch } from '@stencil/core';
import { X509Certificate, type ICertificateJSON } from '../../crypto';
import { buildLinkTemplateResolvers } from '../../utils/link_template_resolvers';
import {
  BasicInformation,
  NameSection,
  PublicKey,
  Signature,
  Thumbprints,
  Miscellaneous,
} from '../_shared/details';
import { ParsedExtensions } from '../_shared/parsed/extensions';
import { decodeIntoViewer, toDocument } from '../_shared/viewer/decode';
import { renderViewer } from '../_shared/viewer/render';

export type TCertificateProp = string | X509Certificate;

type TDecoded = ICertificateJSON & { thumbprints: Record<string, string>; doc: X509Certificate };

@Component({
  tag: 'peculiar-certificate-viewer',
  styleUrl: 'certificate-viewer.scss',
  shadow: true,
})
export class CertificateViewer {
  @State() certificateDecoded?: TDecoded;

  @State() certificateDecodeError?: Error;

  /**
   * The certificate value for decode and show details. Use PEM or DER.
   */
  @Prop({ reflect: true }) certificate: TCertificateProp;

  /**
   * If `true` - component will show split-button to download certificate as PEM or DER.
   */
  @Prop({ reflect: true }) download?: boolean;

  /**
   * Authority Key Identifier extension parent link.
   * <br />
   * **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.
   * @example
   *  https://censys.io/certificates?q=parsed.extensions.subject_key_id:%20{{authKeyId}}
   */
  @Prop({ reflect: true }) authKeyIdParentLink?: string;

  /**
   * Authority Key Identifier extension siblings link.
   * <br />
   * **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.
   * @example
   *  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{authKeyId}}
   */
  @Prop({ reflect: true }) authKeyIdSiblingsLink?: string;

  /**
   * Subject Key Identifier extension children link.
   * <br />
   * **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
   * @example
   *  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{subjectKeyId}}
   */
  @Prop({ reflect: true }) subjectKeyIdChildrenLink?: string;

  /**
   * Subject Key Identifier extension siblings link.
   * <br />
   * **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
   * @example
   *  https://some.com/{{subjectKeyId}}
   */
  @Prop({ reflect: true }) subjectKeyIdSiblingsLink?: string;

  /**
   * Issuer DN link.
   * **NOTE**: HTML component attribute must be `issuer-dn-link`.
   */
  @Prop({ reflect: true }) issuerDnLink?: string;

  componentWillLoad() {
    void this.decodeCertificate(this.certificate);
  }

  private decodeCertificate(certificate: TCertificateProp) {
    return decodeIntoViewer<TDecoded>(this, async () => {
      const doc = toDocument(certificate, X509Certificate);

      return doc && { ...doc.toJSON(), thumbprints: await doc.getThumbprints(), doc };
    });
  }

  /**
   * Rerun decodeCertificate when the value changes
   */
  @Watch('certificate')
  watchCertificateAndDecode(newValue: TCertificateProp, oldValue: TCertificateProp) {
    if (newValue !== oldValue) {
      void this.decodeCertificate(newValue);
    }
  }

  render() {
    const links = buildLinkTemplateResolvers(this);

    return renderViewer<TDecoded>({
      viewer: this,
      subject: 'certificate',
      body: (decoded) => [
        <BasicInformation {...decoded} />,
        <NameSection
          title="Subject Name"
          name={decoded.subject}
        />,
        <NameSection
          title="Issuer Name"
          name={decoded.issuer}
          href={links.getIssuerDnLink()}
        />,
        <PublicKey publicKey={decoded.publicKey} />,
        <Signature signature={decoded.signature} />,
        <Thumbprints thumbprints={decoded.thumbprints} />,
        <ParsedExtensions
          extensions={decoded.extensions}
          {...links}
        />,
        this.download && <Miscellaneous certificate={decoded.doc} />,
      ],
    });
  }
}
