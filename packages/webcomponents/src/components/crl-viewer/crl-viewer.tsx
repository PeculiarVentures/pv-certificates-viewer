/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, Host, h, Prop, State, Watch } from '@stencil/core';
import { X509Crl } from '../../crypto';
import { buildLinkTemplateResolvers } from '../../utils/link_template_resolvers';
import {
  BasicInformation,
  toDisplayVersion,
  IssuerName,
  Signature,
  Thumbprints,
  Miscellaneous,
  RevokedCertificates,
} from '../_shared/details';
import { ParsedExtensions } from '../_shared/parsed/extensions';
import { Typography } from '../_shared/typography';
import { runViewerDecode } from '../_shared/viewer/decode';

export type TCrlProp = string | X509Crl;

@Component({
  tag: 'peculiar-crl-viewer',
  styleUrl: '../certificate-viewer/certificate-viewer.scss',
  shadow: true,
})
export class CrlViewer {
  @State() private certificateDecoded?: X509Crl;

  @State() private certificateDecodeError?: Error;

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

  private async decodeCertificate(certificate: TCrlProp) {
    await runViewerDecode<X509Crl>(this, {
      onStart: () => {
        this.certificateDecodeError = undefined;
      },
      run: async () => {
        let decoded: X509Crl;

        if (certificate instanceof X509Crl) {
          decoded = certificate;
        } else if (typeof certificate === 'string') {
          decoded = new X509Crl(certificate);
        } else {
          return undefined;
        }

        decoded.parseExtensions();
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
  watchCertificateAndDecode(newValue: TCrlProp, oldValue: TCrlProp) {
    if (newValue !== oldValue) {
      void this.decodeCertificate(newValue);
    }
  }

  private renderErrorState() {
    return (
      <div class="status_wrapper">
        <Typography>There was an error decoding this certificate revocation list.</Typography>
      </div>
    );
  }

  private renderEmptyState() {
    return (
      <div class="status_wrapper">
        <Typography>There is no certificate revocation list available.</Typography>
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
            version={toDisplayVersion(this.certificateDecoded.asn.tbsCertList.version)}
          />

          <IssuerName
            name={this.certificateDecoded.issuer}
            issuerDnLink={linkTemplateResolvers.getIssuerDnLink()}
          />

          <Signature signature={this.certificateDecoded.signature} />

          <Thumbprints thumbprints={this.certificateDecoded.thumbprints} />

          <ParsedExtensions
            extensions={this.certificateDecoded.extensions}
            {...linkTemplateResolvers}
          />

          <RevokedCertificates revokedCertificates={this.certificateDecoded.revokedCertificates} />

          {this.download && <Miscellaneous certificate={this.certificateDecoded} />}
        </table>
      </Host>
    );
  }
}
