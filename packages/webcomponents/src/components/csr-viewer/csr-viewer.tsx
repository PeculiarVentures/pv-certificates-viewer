/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, h, Prop, State, Watch } from '@stencil/core';
import { Pkcs10CertificateRequest, type ICsrJSON } from '../../crypto';
import { buildLinkTemplateResolvers } from '../../utils/link_template_resolvers';
import {
  BasicInformation,
  NameSection,
  PublicKey,
  Signature,
  Thumbprints,
  Miscellaneous,
} from '../_shared/details';
import { ParsedAttributes } from '../_shared/parsed/attributes';
import { decodeIntoViewer, toDocument } from '../_shared/viewer/decode';
import { renderViewer } from '../_shared/viewer/render';

export type TCsrProp = string | Pkcs10CertificateRequest;

type TDecoded = ICsrJSON & { thumbprints: Record<string, string>; doc: Pkcs10CertificateRequest };

@Component({
  tag: 'peculiar-csr-viewer',
  styleUrl: '../certificate-viewer/certificate-viewer.scss',
  shadow: true,
})
export class CsrViewer {
  @State() certificateDecoded?: TDecoded;

  @State() certificateDecodeError?: Error;

  /**
   * The certificate value for decode and show details. Use PEM or DER.
   */
  @Prop({ reflect: true }) certificate: TCsrProp;

  /**
   * If `true` - component will show split-button to download certificate as PEM or DER.
   */
  @Prop() download?: boolean;

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

  componentWillLoad() {
    void this.decodeCertificate(this.certificate);
  }

  private decodeCertificate(certificate: TCsrProp) {
    return decodeIntoViewer<TDecoded>(this, async () => {
      const doc = toDocument(certificate, Pkcs10CertificateRequest);

      return doc && { ...doc.toJSON(), thumbprints: await doc.getThumbprints(), doc };
    });
  }

  /**
   * Rerun decodeCertificate when the value changes
   */
  @Watch('certificate')
  watchCertificateAndDecode(newValue: TCsrProp, oldValue: TCsrProp) {
    if (newValue !== oldValue) {
      void this.decodeCertificate(newValue);
    }
  }

  render() {
    const links = buildLinkTemplateResolvers(this);

    return renderViewer<TDecoded>({
      viewer: this,
      subject: 'certificate request',
      body: (decoded) => [
        <BasicInformation {...decoded} />,
        <NameSection
          title="Subject Name"
          name={decoded.subject}
        />,
        <PublicKey publicKey={decoded.publicKey} />,
        <Signature signature={decoded.signature} />,
        <Thumbprints thumbprints={decoded.thumbprints} />,
        <ParsedAttributes
          attributes={decoded.attributes}
          {...links}
        />,
        this.download && <Miscellaneous certificate={decoded.doc} />,
      ],
    });
  }
}
