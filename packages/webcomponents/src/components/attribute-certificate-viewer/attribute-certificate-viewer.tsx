/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, h, Prop, State, Watch } from '@stencil/core';
import { X509AttributeCertificate, type IAttributeCertificateJSON } from '../../crypto';
import { buildLinkTemplateResolvers } from '../../utils/link_template_resolvers';
import {
  BasicInformation,
  Signature,
  Thumbprints,
  Miscellaneous,
  Holder,
  Issuer,
} from '../_shared/details';
import { ParsedAttributes } from '../_shared/parsed/attributes';
import { ParsedExtensions } from '../_shared/parsed/extensions';
import { decodeIntoViewer, toDocument } from '../_shared/viewer/decode';
import { renderViewer } from '../_shared/viewer/render';

export type TAttributeCertificateProp = string | X509AttributeCertificate;

type TDecoded = IAttributeCertificateJSON & {
  thumbprints: Record<string, string>;
  doc: X509AttributeCertificate;
};

@Component({
  tag: 'peculiar-attribute-certificate-viewer',
  styleUrl: '../certificate-viewer/certificate-viewer.scss',
  shadow: true,
})
export class AttributeCertificateViewer {
  @State() certificateDecoded?: TDecoded;

  @State() certificateDecodeError?: Error;

  /**
   * The certificate value for decode and show details. Use PEM or DER.
   */
  @Prop() certificate: TAttributeCertificateProp;

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

  private decodeCertificate(certificate: TAttributeCertificateProp) {
    return decodeIntoViewer<TDecoded>(this, async () => {
      const doc = toDocument(certificate, X509AttributeCertificate);

      return doc && { ...doc.toJSON(), thumbprints: await doc.getThumbprints(), doc };
    });
  }

  /**
   * Rerun decodeCertificate when the value changes
   */
  @Watch('certificate')
  watchCertificateAndDecode(
    newValue: TAttributeCertificateProp,
    oldValue: TAttributeCertificateProp,
  ) {
    if (newValue !== oldValue) {
      void this.decodeCertificate(newValue);
    }
  }

  render() {
    const links = buildLinkTemplateResolvers(this);

    return renderViewer<TDecoded>({
      viewer: this,
      subject: 'attribute certificate',
      body: (decoded) => [
        <BasicInformation {...decoded} />,
        <Issuer issuer={decoded.issuer} />,
        <Holder holder={decoded.holder} />,
        <Signature signature={decoded.signature} />,
        <Thumbprints thumbprints={decoded.thumbprints} />,
        <ParsedAttributes
          attributes={decoded.attributes}
          {...links}
        />,
        <ParsedExtensions
          extensions={decoded.extensions}
          {...links}
        />,
        this.download && <Miscellaneous certificate={decoded.doc} />,
      ],
    });
  }
}
