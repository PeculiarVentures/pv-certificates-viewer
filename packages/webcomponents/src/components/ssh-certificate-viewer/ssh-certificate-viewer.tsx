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
import { runViewerDecode } from '../_shared/decode';
import { Typography } from '../typography';
import { SshBasicInformation } from './-components/basic_information';
import { SshPublicKey } from './-components/public_key';
import { SshSignatureKey } from './-components/signature_key';
import { SshMiscellaneous } from './-components/miscellaneous';

export type TSshCertificateProp = string | SshCertificate;

@Component({
  tag: 'peculiar-ssh-certificate-viewer',
  styleUrl: '../certificate-viewer/certificate-viewer.scss',
  shadow: true,
})
export class SshCertificateViewer {
  private certificateDecoded: SshCertificate;

  private certificateDecodeError?: Error;

  private mobileMediaQuery: MediaQueryList;
  private readonly mediaQueryChangeHandler = (event: MediaQueryListEvent) => {
    this.mobileScreenView = event.matches;
  };

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

  private async decodeCertificate(certificate: TSshCertificateProp) {
    await runViewerDecode<SshCertificate>({
      setLoading: (isLoading) => {
        this.isDecodeInProcess = isLoading;
      },
      onStart: () => {
        this.certificateDecodeError = undefined;
      },
      run: () => {
        if (certificate instanceof SshCertificate) {
          return certificate;
        }

        if (typeof certificate === 'string') {
          return new SshCertificate(certificate);
        }

        return undefined;
      },
      onSuccess: async (decoded) => {
        await decoded.parsePublicKey();
        await decoded.parseSignatureKey();
        this.certificateDecoded = decoded;
      },
      onError: (error) => {
        this.certificateDecodeError = error as Error;
        console.error('Error certificate parse:', error);
      },
    });
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

          {this.download && (
            <SshMiscellaneous
              certificate={this.certificateDecoded}
            />
          )}
        </table>
      </Host>
    );
  }
}
