/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, h, Prop, State, Watch, Host } from '@stencil/core';
import { SshCertificate } from '../../crypto';
import { Typography } from '../_shared/typography';
import { runViewerDecode } from '../_shared/viewer/decode';
import { SshBasicInformation } from './-components/basic_information';
import { SshMiscellaneous } from './-components/miscellaneous';
import { SshPublicKey } from './-components/public_key';
import { SshSignatureKey } from './-components/signature_key';

export type TSshCertificateProp = string | SshCertificate;

@Component({
  tag: 'peculiar-ssh-certificate-viewer',
  styleUrl: '../certificate-viewer/certificate-viewer.scss',
  shadow: true,
})
export class SshCertificateViewer {
  @State() private certificateDecoded?: SshCertificate;

  @State() private certificateDecodeError?: Error;

  /**
   * The certificate value for decode and show details. Use PEM or DER.
   */
  @Prop({ reflect: true }) certificate: TSshCertificateProp;

  /**
   * If `true` - component will show split-button to download certificate as PEM or DER.
   */
  @Prop({ reflect: true }) download?: boolean;

  componentWillLoad() {
    void this.decodeCertificate(this.certificate);
  }

  private async decodeCertificate(certificate: TSshCertificateProp) {
    await runViewerDecode<SshCertificate>(this, {
      onStart: () => {
        this.certificateDecodeError = undefined;
      },
      run: async () => {
        let decoded: SshCertificate;

        if (certificate instanceof SshCertificate) {
          decoded = certificate;
        } else if (typeof certificate === 'string') {
          decoded = new SshCertificate(certificate);
        } else {
          return undefined;
        }

        await decoded.parsePublicKey();
        await decoded.parseSignatureKey();

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
  watchCertificateAndDecode(newValue: TSshCertificateProp, oldValue: TSshCertificateProp) {
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

    return (
      <Host>
        <table>
          <SshBasicInformation {...this.certificateDecoded} />

          <SshPublicKey key={this.certificateDecoded.publicKey} />

          <SshSignatureKey key={this.certificateDecoded.signatureKey} />

          {this.download && <SshMiscellaneous certificate={this.certificateDecoded} />}
        </table>
      </Host>
    );
  }
}
