/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, Host, h, Prop, State, Watch } from '@stencil/core';
import { X509AttributeCertificate } from '../../crypto';
import { buildLinkTemplateResolvers } from '../../utils/link_template_resolvers';
import {
  BasicInformation,
  toDisplayVersion,
  Signature,
  Thumbprints,
  Miscellaneous,
  Holder,
  Issuer,
} from '../_shared/details';
import { ParsedAttributes } from '../_shared/parsed/attributes';
import { ParsedExtensions } from '../_shared/parsed/extensions';
import { Typography } from '../_shared/typography';
import { runViewerDecode } from '../_shared/viewer/decode';

export type TAttributeCertificateProp = string | X509AttributeCertificate;

@Component({
  tag: 'peculiar-attribute-certificate-viewer',
  styleUrl: '../certificate-viewer/certificate-viewer.scss',
  shadow: true,
})
export class AttributeCertificateViewer {
  @State() private certificateDecoded?: X509AttributeCertificate;

  @State() private certificateDecodeError?: Error;

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

  private async decodeCertificate(certificate: TAttributeCertificateProp) {
    await runViewerDecode<X509AttributeCertificate>(this, {
      onStart: () => {
        this.certificateDecodeError = undefined;
      },
      run: async () => {
        let decoded: X509AttributeCertificate;

        if (certificate instanceof X509AttributeCertificate) {
          decoded = certificate;
        } else if (typeof certificate === 'string') {
          decoded = new X509AttributeCertificate(certificate);
        } else {
          return undefined;
        }

        decoded.parseExtensions();
        decoded.parseAttributes();
        await decoded.getThumbprint('SHA-1');
        await decoded.getThumbprint('SHA-256');

        return decoded;
      },
      onSuccess: (decoded) => {
        this.certificateDecoded = decoded;
      },
      onError: (error) => {
        this.certificateDecodeError = error as Error;
        console.error('Error certificate parse:', error);
      },
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

  private renderErrorState() {
    return (
      <div class="status_wrapper">
        <Typography>There was an error decoding this attribute certificate.</Typography>
      </div>
    );
  }

  private renderEmptyState() {
    return (
      <div class="status_wrapper">
        <Typography>There is no attribute certificate available.</Typography>
      </div>
    );
  }

  render() {
    if (this.certificateDecodeError) {
      return this.renderErrorState();
    }

    if (!this.certificateDecoded) {
      return this.renderEmptyState();
    }

    const linkTemplateResolvers = buildLinkTemplateResolvers(this);

    return (
      <Host>
        <table>
          <BasicInformation
            {...this.certificateDecoded}
            version={toDisplayVersion(this.certificateDecoded.version)}
          />

          <Issuer issuer={this.certificateDecoded.issuer} />

          <Holder holder={this.certificateDecoded.holder} />

          <Signature signature={this.certificateDecoded.signature} />

          <Thumbprints thumbprints={this.certificateDecoded.thumbprints} />

          <ParsedAttributes
            attributes={this.certificateDecoded.attributes}
            {...linkTemplateResolvers}
          />

          <ParsedExtensions
            extensions={this.certificateDecoded.extensions}
            {...linkTemplateResolvers}
          />

          {this.download && <Miscellaneous certificate={this.certificateDecoded} />}
        </table>
      </Host>
    );
  }
}
