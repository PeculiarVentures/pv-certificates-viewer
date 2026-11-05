/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, h, Prop, State, Watch } from '@stencil/core';
import { X509Crl, type ICrlJSON } from '../../crypto';
import { buildLinkTemplateResolvers } from '../../utils/link_template_resolvers';
import {
  BasicInformation,
  NameSection,
  Signature,
  Thumbprints,
  Miscellaneous,
  RevokedCertificates,
} from '../_shared/details';
import { ParsedExtensions } from '../_shared/parsed/extensions';
import { decodeIntoViewer, toDocument } from '../_shared/viewer/decode';
import { renderViewer } from '../_shared/viewer/render';

export type TCrlProp = string | X509Crl;

type TDecoded = ICrlJSON & { thumbprints: Record<string, string>; doc: X509Crl };

@Component({
  tag: 'peculiar-crl-viewer',
  styleUrl: '../certificate-viewer/certificate-viewer.scss',
  shadow: true,
})
export class CrlViewer {
  @State() certificateDecoded?: TDecoded;

  @State() certificateDecodeError?: Error;

  /**
   * The certificate value for decode and show details. Use PEM or DER.
   */
  @Prop({ reflect: true }) certificate: TCrlProp;

  /**
   * If `true` - component will show split-button to download certificate as PEM or DER.
   */
  @Prop() download?: boolean;

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
   * Issuer DN link.
   * **NOTE**: HTML component attribute must be `issuer-dn-link`.
   */
  @Prop({ reflect: true }) issuerDnLink?: string;

  componentWillLoad() {
    void this.decodeCertificate(this.certificate);
  }

  private decodeCertificate(certificate: TCrlProp) {
    return decodeIntoViewer<TDecoded>(this, async () => {
      const doc = toDocument(certificate, X509Crl);

      return doc && { ...doc.toJSON(), thumbprints: await doc.getThumbprints(), doc };
    });
  }

  /**
   * Rerun decodeCertificate when the value changes
   */
  @Watch('certificate')
  watchCertificateAndDecode(newValue: TCrlProp, oldValue: TCrlProp) {
    if (newValue !== oldValue) {
      void this.decodeCertificate(newValue);
    }
  }

  render() {
    const links = buildLinkTemplateResolvers(this);

    return renderViewer<TDecoded>({
      viewer: this,
      subject: 'certificate revocation list',
      body: (decoded) => [
        <BasicInformation {...decoded} />,
        <NameSection
          title="Issuer Name"
          name={decoded.issuer}
          href={links.getIssuerDnLink()}
        />,
        <Signature signature={decoded.signature} />,
        <Thumbprints thumbprints={decoded.thumbprints} />,
        <ParsedExtensions
          extensions={decoded.extensions}
          {...links}
        />,
        <RevokedCertificates revokedCertificates={decoded.revokedCertificates} />,
        this.download && <Miscellaneous certificate={decoded.doc} />,
      ],
    });
  }
}
