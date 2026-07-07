/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component,
  Host,
  h,
  Prop,
  State,
  Watch,
  Build,
} from '@stencil/core';
import { X509Crl } from '../../crypto';
import { buildLinkTemplateResolvers } from '../../utils/link_template_resolvers';
import {
  BasicInformation,
  IssuerName,
  Signature,
  Thumbprints,
  Miscellaneous,
  RevokedCertificates,
} from '../certificate-details-parts';
import { Typography } from '../typography';
import { ParsedExtensions } from '../parsed-extensions-viewer/parsed-extensions-viewer';

export type TCrlProp = string | X509Crl;

@Component({
  tag: 'peculiar-crl-viewer',
  styleUrl: '../certificate-viewer/certificate-viewer.scss',
  shadow: true,
})
export class CrlViewer {
  private certificateDecoded: X509Crl;

  private certificateDecodeError?: Error;

  private mobileMediaQuery: MediaQueryList;
  private readonly mediaQueryChangeHandler = (event: MediaQueryListEvent) => {
    this.mobileScreenView = event.matches;
  };

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

  /**
   * Mobile media query string to control screen view change.
   * <br />
   * **NOTE**: Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia.
   * @example
   *  (max-width: 900px)
   */
  @Prop({ reflect: false }) mobileMediaQueryString?: string = '(max-width: 900px)';

  @State() mobileScreenView = false;

  @State() isDecodeInProcess = true;

  componentWillLoad() {
    this.decodeCertificate(this.certificate);

    if (Build.isBrowser) {
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

  private async decodeCertificate(certificate: TCrlProp) {
    this.isDecodeInProcess = true;
    this.certificateDecodeError = undefined;

    try {
      if (certificate instanceof X509Crl) {
        this.certificateDecoded = certificate;
      } else if (typeof certificate === 'string') {
        this.certificateDecoded = new X509Crl(certificate);
      } else {
        return;
      }

      this.certificateDecoded.parseExtensions();
      await this.certificateDecoded.getThumbprint('SHA-1');
      await this.certificateDecoded.getThumbprint('SHA-256');
    } catch (error) {
      this.certificateDecodeError = error;

      console.error('Error certificate parse:', error);
    } finally {
      this.isDecodeInProcess = false;
    }
  }

  /**
   * Rerun decodeCertificate if previuos value not equal current value
   */
  @Watch('certificate')
  watchCertificateAndDecode(
    newValue: TCrlProp,
    oldValue: TCrlProp,
  ) {
    if (typeof newValue === 'string' && typeof oldValue === 'string') {
      if (newValue !== oldValue) {
        this.decodeCertificate(newValue);
      }

      return;
    }

    if (
      newValue instanceof X509Crl
      && oldValue instanceof X509Crl
    ) {
      if (newValue.commonName !== oldValue.commonName) {
        this.decodeCertificate(newValue);
      }
    }
  }

  private renderErrorState() {
    return (
      <div class="status_wrapper">
        <Typography>
          There was an error decoding this certificate revocation list.
        </Typography>
      </div>
    );
  }

  private renderEmptyState() {
    return (
      <div class="status_wrapper">
        <Typography>
          There is no certificate revocation list available.
        </Typography>
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
      <Host
        data-mobile-screen-view={String(this.mobileScreenView)}
      >
        <table>
          <BasicInformation
            {...this.certificateDecoded}
          />

          <IssuerName
            name={this.certificateDecoded.issuer}
            issuerDnLink={linkTemplateResolvers.getIssuerDnLink()}
          />

          <Signature
            signature={this.certificateDecoded.signature}
          />

          <Thumbprints
            thumbprints={this.certificateDecoded.thumbprints}
          />

          <ParsedExtensions
            extensions={this.certificateDecoded.extensions}
            {...linkTemplateResolvers}
          />

          <RevokedCertificates
            revokedCertificates={this.certificateDecoded.revokedCertificates}
          />

          {this.download && (
            <Miscellaneous
              certificate={this.certificateDecoded}
            />
          )}
        </table>
      </Host>
    );
  }
}
