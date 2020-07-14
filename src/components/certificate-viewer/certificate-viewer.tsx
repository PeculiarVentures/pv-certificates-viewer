import { Component, h, Prop, State, Watch, Host } from '@stencil/core';

import {
  X509Certificate,
} from '../../crypto';

import { rowTitle } from './row_title';
import { publicKey } from './public_key';
import { signature } from './signature';
import { thumbprints } from './thumbprints';
import { extensions } from './extensions';

export type CertificateProp = string | X509Certificate;

@Component({
  tag: 'peculiar-certificate-viewer',
  styleUrl: 'certificate-viewer.scss',
  scoped: true,
})
export class CertificateViewer {
  certificateDecoded: X509Certificate;
  certificateDecodeError: Error;

  /**
   * The certificate value for decode and show details. Use PEM or DER.
   */
  @Prop() certificate: CertificateProp;
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
  @Prop() authKeyIdParentLink?: string;
  /**
   * Authority Key Identifier extension siblings link.
   * <br />
   * **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.
   * @example
   *  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{authKeyId}}
   */
  @Prop() authKeyIdSiblingsLink?: string;
  /**
   * Subject Key Identifier extension children link.
   * <br />
   * **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
   * @example
   *  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{subjectKeyId}}
   */
  @Prop() subjectKeyIdChildrenLink?: string;
  /**
   * Subject Key Identifier extension siblings link.
   * <br />
   * **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
   * @example
   *  https://some.com/{{subjectKeyId}}
   */
  @Prop() subjectKeyIdSiblingsLink?: string;
  /**
   * Issuer DN link.
   */
  @Prop() issuerDnLink?: string;

  /**
   * Choose view type instead @media.
   */
  @Prop() view?: 'mobile';

  @State() isDecodeInProcess: boolean = true;

  componentWillLoad() {
    this.decodeCertificate(this.certificate);
  }

  private async decodeCertificate(certificate: CertificateProp) {
    this.isDecodeInProcess = true;

    try {
      if (certificate instanceof X509Certificate) {
        this.certificateDecoded = certificate;
      }

      if (typeof certificate === 'string') {
        this.certificateDecoded = new X509Certificate(certificate);
      }

      this.certificateDecoded.parseExtensions();
      await this.certificateDecoded.getThumbprint('SHA-1');
      await this.certificateDecoded.getThumbprint('SHA-256');
    } catch (error) {
      this.certificateDecodeError = error;

      console.error(error);
    }

    this.isDecodeInProcess = false;
  }

  /**
   * Rerun decodeCertificate if previuos value not equal current value
   */
  @Watch('certificate')
  watchCertificateAndDecode(newValue: CertificateProp, oldValue: CertificateProp) {
    if (typeof newValue === 'string' && typeof oldValue === 'string') {
      if (newValue !== oldValue) {
        this.decodeCertificate(newValue);
      }

      return;
    }

    if (newValue instanceof X509Certificate && oldValue instanceof X509Certificate) {
      if (newValue.serialNumber !== oldValue.serialNumber) {
        this.decodeCertificate(newValue);
      }
    }
  }

  // private getAuthKeyIdParentLink(extension: IExtensionAuthorityKeyIdentifier) {
  //   return this.authKeyIdParentLink
  //     ?.replace('{{authKeyId}}', extension.value.keyIdentifier);
  // }

  // private getAuthKeyIdSiblingsLink(extension: IExtensionAuthorityKeyIdentifier) {
  //   return this.authKeyIdSiblingsLink
  //     ?.replace('{{authKeyId}}', extension.value.keyIdentifier);
  // }

  // private getSubjectKeyIdChildrenLink(extension: IExtensionSubjectKeyIdentifier) {
  //   return this.subjectKeyIdChildrenLink
  //     ?.replace('{{subjectKeyId}}', extension.value);
  // }

  // private getSubjectKeyIdSiblingsLink(extension: IExtensionSubjectKeyIdentifier) {
  //   return this.subjectKeyIdSiblingsLink
  //     ?.replace('{{subjectKeyId}}', extension.value);
  // }

  // private getLEILink(extension: IExtensionLEI) {
  //   return `https://www.gleif.org/lei/${extension.value}`;
  // }

  private renderErrorState() {
    return (
      <div class="status_wrapper">
        <peculiar-typography
          type="b1"
          class="interaction_text"
        >
          There is error for certificate decode.
        </peculiar-typography>
      </div>
    );
  }

  private renderEmptyState() {
    return (
      <div class="status_wrapper">
        <peculiar-typography
          type="b1"
          class="interaction_text"
        >
          There is no certificate available.
        </peculiar-typography>
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
        data-view={this.view}
      >
        <table>
          {rowTitle('Basic Information')}
          <tr>
            <td colSpan={2}>
              <peculiar-certificate-summary
                certificate={this.certificateDecoded}
                issuerDnLink={this.issuerDnLink}
                view={this.view}
              />
            </td>
          </tr>

          {publicKey(this.certificateDecoded.publicKey)}

          {signature(this.certificateDecoded.signature)}

          {thumbprints(this.certificateDecoded.thumbprints)}

          {extensions(this.certificateDecoded.extensions)}
        </table>
      </Host>
    );
  }
}
