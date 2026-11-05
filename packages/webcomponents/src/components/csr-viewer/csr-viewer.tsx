/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, Host, h, Prop, State, Watch } from '@stencil/core';
import { Pkcs10CertificateRequest } from '../../crypto';
import { buildLinkTemplateResolvers } from '../../utils/link_template_resolvers';
import {
  BasicInformation,
  toDisplayVersion,
  SubjectName,
  Signature,
  Thumbprints,
  Miscellaneous,
  PublicKey,
} from '../_shared/details';
import { ParsedAttributes } from '../_shared/parsed/attributes';
import { Typography } from '../_shared/typography';
import { runViewerDecode } from '../_shared/viewer/decode';

export type TCsrProp = string | Pkcs10CertificateRequest;

@Component({
  tag: 'peculiar-csr-viewer',
  styleUrl: '../certificate-viewer/certificate-viewer.scss',
  shadow: true,
})
export class CsrViewer {
  @State() private certificateDecoded?: Pkcs10CertificateRequest;

  @State() private certificateDecodeError?: Error;

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

  private async decodeCertificate(certificate: TCsrProp) {
    await runViewerDecode<Pkcs10CertificateRequest>(this, {
      onStart: () => {
        this.certificateDecodeError = undefined;
      },
      run: async () => {
        let decoded: Pkcs10CertificateRequest;

        if (certificate instanceof Pkcs10CertificateRequest) {
          decoded = certificate;
        } else if (typeof certificate === 'string') {
          decoded = new Pkcs10CertificateRequest(certificate);
        } else {
          return undefined;
        }

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
  watchCertificateAndDecode(newValue: TCsrProp, oldValue: TCsrProp) {
    if (newValue !== oldValue) {
      void this.decodeCertificate(newValue);
    }
  }

  private renderErrorState() {
    return (
      <div class="status_wrapper">
        <Typography>There was an error decoding this certificate request.</Typography>
      </div>
    );
  }

  private renderEmptyState() {
    return (
      <div class="status_wrapper">
        <Typography>There is no certificate request available.</Typography>
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

          <SubjectName name={this.certificateDecoded.subject} />

          <PublicKey publicKey={this.certificateDecoded.publicKey} />

          <Signature signature={this.certificateDecoded.signature} />

          <Thumbprints thumbprints={this.certificateDecoded.thumbprints} />

          <ParsedAttributes
            attributes={this.certificateDecoded.attributes}
            {...linkTemplateResolvers}
          />

          {this.download && <Miscellaneous certificate={this.certificateDecoded} />}
        </table>
      </Host>
    );
  }
}
