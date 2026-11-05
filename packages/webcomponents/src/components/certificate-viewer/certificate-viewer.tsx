/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, h, Prop, State, Watch, Host, Build } from '@stencil/core';
import { X509Certificate } from '../../crypto';
import { buildLinkTemplateResolvers } from '../../utils/link_template_resolvers';
import {
  BasicInformation,
  SubjectName,
  IssuerName,
  PublicKey,
  Signature,
  Thumbprints,
  Miscellaneous,
} from '../_shared/details';
import { ParsedExtensions } from '../_shared/parsed/extensions';
import { Typography } from '../_shared/typography';
import { runViewerDecode } from '../_shared/viewer/decode';

export type TCertificateProp = string | X509Certificate;

@Component({
  tag: 'peculiar-certificate-viewer',
  styleUrl: 'certificate-viewer.scss',
  shadow: true,
})
export class CertificateViewer {
  @State() private certificateDecoded?: X509Certificate;

  @State() private certificateDecodeError?: Error;

  private mobileMediaQuery: MediaQueryList;
  private readonly mediaQueryChangeHandler = (event: MediaQueryListEvent) => {
    this.mobileScreenView = event.matches;
  };

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

  /**
   * Mobile media query string to control screen view change.
   * <br />
   * **NOTE**: Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia.
   * @example
   *  (max-width: 900px)
   */
  @Prop({ reflect: false }) mobileMediaQueryString?: string = '(max-width: 900px)';

  @State() mobileScreenView = false;

  componentWillLoad() {
    void this.decodeCertificate(this.certificate);

    if (Build.isBrowser && this.mobileMediaQueryString) {
      this.mobileMediaQuery = window.matchMedia(this.mobileMediaQueryString);
      this.mobileMediaQuery.addEventListener('change', this.mediaQueryChangeHandler);
      this.mobileScreenView = this.mobileMediaQuery.matches;
    }
  }

  disconnectedCallback() {
    if (this.mobileMediaQuery) {
      this.mobileMediaQuery.removeEventListener('change', this.mediaQueryChangeHandler);
    }
  }

  private async decodeCertificate(certificate: TCertificateProp) {
    await runViewerDecode<X509Certificate>(this, {
      onStart: () => {
        this.certificateDecodeError = undefined;
      },
      run: async () => {
        let decoded: X509Certificate;

        if (certificate instanceof X509Certificate) {
          decoded = certificate;
        } else if (typeof certificate === 'string') {
          decoded = new X509Certificate(certificate);
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
  watchCertificateAndDecode(newValue: TCertificateProp, oldValue: TCertificateProp) {
    if (newValue !== oldValue) {
      void this.decodeCertificate(newValue);
    }
  }

  private renderErrorState() {
    return (
      <div class="status_wrapper">
        <Typography>There was an error decoding this certificate.</Typography>
      </div>
    );
  }

  private renderEmptyState() {
    return (
      <div class="status_wrapper">
        <Typography>There is no certificate available.</Typography>
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
      <Host data-mobile-screen-view={String(this.mobileScreenView)}>
        <table>
          <BasicInformation {...this.certificateDecoded} />

          <SubjectName name={this.certificateDecoded.subject} />

          <IssuerName
            name={this.certificateDecoded.issuer}
            issuerDnLink={linkTemplateResolvers.getIssuerDnLink()}
          />

          <PublicKey publicKey={this.certificateDecoded.publicKey} />

          <Signature signature={this.certificateDecoded.signature} />

          <Thumbprints thumbprints={this.certificateDecoded.thumbprints} />

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
