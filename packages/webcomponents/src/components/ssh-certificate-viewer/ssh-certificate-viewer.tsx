/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component,
  h,
  Prop,
  State,
  Watch,
  Host,
  Build,
} from '@stencil/core';
import { SshCertificate } from '../../crypto';
import { Typography } from '../typography';
import { SshBasicInformation } from './-components/basic_information';
import { SshPublicKey } from './-components/public_key';
import { SshSignatureKey } from './-components/signature_key';

export type TSshCertificateProp = string | SshCertificate;

@Component({
  tag: 'peculiar-ssh-certificate-viewer',
  styleUrl: '../certificate-viewer/certificate-viewer.scss',
  shadow: true,
})
export class SshCertificateViewer {
  private certificateDecoded: SshCertificate;

  private certificateDecodeError: Error;

  private mobileMediaQuery: MediaQueryList;

  /**
   * The certificate value for decode and show details. Use PEM or DER.
   */
  @Prop({ reflect: true }) certificate: TSshCertificateProp;

  /**
   * If `true` - component will show split-button to download certificate as PEM or DER.
   */
  @Prop({ reflect: true }) download?: boolean;

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

  private handleMediaQueryChange(event: MediaQueryListEvent) {
    this.mobileScreenView = event.matches;
  }

  componentWillLoad() {
    this.decodeCertificate(this.certificate);

    if (Build.isBrowser) {
      this.mobileMediaQuery = window.matchMedia(this.mobileMediaQueryString);
      this.mobileMediaQuery.addEventListener('change', this.handleMediaQueryChange.bind(this));
      this.mobileScreenView = this.mobileMediaQuery.matches;
    }
  }

  disconnectedCallback() {
    this.mobileMediaQuery.removeEventListener('change', this.handleMediaQueryChange.bind(this));
  }

  private async decodeCertificate(certificate: TSshCertificateProp) {
    this.isDecodeInProcess = true;

    try {
      if (certificate instanceof SshCertificate) {
        this.certificateDecoded = certificate;
      } else if (typeof certificate === 'string') {
        this.certificateDecoded = new SshCertificate(certificate);
      } else {
        return;
      }

      // this.certificateDecoded.parseExtensions();
      await this.certificateDecoded.parsePublicKey();
      await this.certificateDecoded.parseSignatureKey();
    } catch (error) {
      this.certificateDecodeError = error;

      console.error('Error certificate parse:', error);
    }

    this.isDecodeInProcess = false;
  }

  /**
   * Rerun decodeCertificate if previuos value not equal current value
   */
  @Watch('certificate')
  watchCertificateAndDecode(newValue: TSshCertificateProp, oldValue: TSshCertificateProp) {
    if (typeof newValue === 'string' && typeof oldValue === 'string') {
      if (newValue !== oldValue) {
        this.decodeCertificate(newValue);
      }

      return;
    }

    if (newValue instanceof SshCertificate && oldValue instanceof SshCertificate) {
      if (newValue.serialNumber !== oldValue.serialNumber) {
        this.decodeCertificate(newValue);
      }
    }
  }

  private renderErrorState() {
    return (
      <div class="status_wrapper">
        <Typography>
          There was an error decoding this certificate.
        </Typography>
      </div>
    );
  }

  private renderEmptyState() {
    return (
      <div class="status_wrapper">
        <Typography>
          There is no certificate available.
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
          <SshBasicInformation
            {...this.certificateDecoded}
          />

          <SshPublicKey
            key={this.certificateDecoded.publicKey}
          />

          <SshSignatureKey
            key={this.certificateDecoded.signatureKey}
          />
        </table>
      </Host>
    );
  }
}
