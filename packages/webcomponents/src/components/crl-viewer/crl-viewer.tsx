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

import { CRL } from '../../crypto';
import { getDNSNameLink, getIPAddressLink, getLEILink } from '../../utils/third_party_links';
import {
  BasicInformation,
  IssuerName,
  Signature,
  Thumbprints,
  Extensions,
  Miscellaneous,
  RevokedCertificates,
} from '../certificate-details-parts';
import { Typography } from '../typography';

export type CrlProp = string | CRL;

@Component({
  tag: 'peculiar-crl-viewer',
  styleUrl: '../certificate-viewer/certificate-viewer.scss',
  shadow: true,
})
export class CrlViewer {
  private certificateDecoded: CRL;

  private certificateDecodeError: Error;

  private mobileMediaQuery: MediaQueryList;

  /**
   * The certificate value for decode and show details. Use PEM or DER.
   */
  @Prop({ reflect: true }) certificate: CrlProp;

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

  @State() mobileScreenView: boolean = false;

  @State() isDecodeInProcess: boolean = true;

  private mediaQueryChange(event: MediaQueryListEvent) {
    this.mobileScreenView = event.matches;
  }

  componentWillLoad() {
    this.decodeCertificate(this.certificate);

    if (Build.isBrowser) {
      this.mobileMediaQuery = window.matchMedia(this.mobileMediaQueryString);
      this.mobileMediaQuery.addEventListener('change', this.mediaQueryChange.bind(this));
      this.mobileScreenView = this.mobileMediaQuery.matches;
    }
  }

  disconnectedCallback() {
    this.mobileMediaQuery.removeEventListener('change', this.mediaQueryChange.bind(this));
  }

  private async decodeCertificate(certificate: CrlProp) {
    this.isDecodeInProcess = true;

    try {
      if (certificate instanceof CRL) {
        this.certificateDecoded = certificate;
      } else if (typeof certificate === 'string') {
        this.certificateDecoded = new CRL(certificate);
      } else {
        return;
      }

      this.certificateDecoded.parseExtensions();
      await this.certificateDecoded.getThumbprint('SHA-1');
      await this.certificateDecoded.getThumbprint('SHA-256');
    } catch (error) {
      this.certificateDecodeError = error;

      console.error('Error certificate parse:', error);
    }

    this.isDecodeInProcess = false;
  }

  private getAuthKeyIdParentLink = (value: string) => this.authKeyIdParentLink
    ?.replace('{{authKeyId}}', value);

  private getAuthKeyIdSiblingsLink = (value: string) => this.authKeyIdSiblingsLink
    ?.replace('{{authKeyId}}', value);

  private getIssuerDnLink() {
    return this.issuerDnLink;
  }

  /**
   * Rerun decodeCertificate if previuos value not equal current value
   */
  @Watch('certificate')
  watchCertificateAndDecode(
    newValue: CrlProp,
    oldValue: CrlProp,
  ) {
    if (typeof newValue === 'string' && typeof oldValue === 'string') {
      if (newValue !== oldValue) {
        this.decodeCertificate(newValue);
      }

      return;
    }

    if (
      newValue instanceof CRL
      && oldValue instanceof CRL
    ) {
      if (newValue.commonName !== oldValue.commonName) {
        this.decodeCertificate(newValue);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private renderErrorState() {
    return (
      <div class="status_wrapper">
        <Typography>
          There was an error decoding this certificate revocation list.
        </Typography>
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
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
            issuerDnLink={this.getIssuerDnLink()}
          />

          <Signature
            signature={this.certificateDecoded.signature}
          />

          <Thumbprints
            thumbprints={this.certificateDecoded.thumbprints}
          />

          <Extensions
            extensions={this.certificateDecoded.extensions}
            getLEILink={getLEILink}
            getDNSNameLink={getDNSNameLink}
            getIPAddressLink={getIPAddressLink}
            getAuthKeyIdParentLink={this.getAuthKeyIdParentLink}
            getAuthKeyIdSiblingsLink={this.getAuthKeyIdSiblingsLink}
          />

          <RevokedCertificates
            revokedCertificates={this.certificateDecoded.revokedCertificates}
            getDNSNameLink={getDNSNameLink}
            getIPAddressLink={getIPAddressLink}
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
