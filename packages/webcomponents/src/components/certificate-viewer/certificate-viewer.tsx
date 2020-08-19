import {
  Component, h, Prop, State, Watch, Host,
} from '@stencil/core';

import {
  X509Certificate,
} from '../../crypto';

import { PublicKey } from './public_key';
import { Signature } from './signature';
import { Thumbprints } from './thumbprints';
import { Extensions } from './extensions';
import { Miscellaneous } from './miscellaneous';
import { RowTitle } from './row';

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

      console.error('Error certificate parse:', error);
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

  private getAuthKeyIdParentLink = (value: string) => this.authKeyIdParentLink
      ?.replace('{{authKeyId}}', value);

  private getAuthKeyIdSiblingsLink = (value: string) => this.authKeyIdSiblingsLink
      ?.replace('{{authKeyId}}', value);

  private getSubjectKeyIdChildrenLink = (value: string) => this.subjectKeyIdChildrenLink
      ?.replace('{{subjectKeyId}}', value);

  private getSubjectKeyIdSiblingsLink = (value: string) => this.subjectKeyIdSiblingsLink
      ?.replace('{{subjectKeyId}}', value);

  // eslint-disable-next-line class-methods-use-this
  private getLEILink(value: string) {
    return `https://www.gleif.org/lei/${value}`;
  }

  // eslint-disable-next-line class-methods-use-this
  private getDNSNameLink(value: string) {
    return `https://censys.io/ipv4?q=${value}`;
  }

  // eslint-disable-next-line class-methods-use-this
  private getIPAddressLink(value: string) {
    return `https://censys.io/ipv4?q=${value}`;
  }

  private getIssuerDnLink() {
    return this.issuerDnLink;
  }

  // eslint-disable-next-line class-methods-use-this
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

  // eslint-disable-next-line class-methods-use-this
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
          <RowTitle
            value="Basic Information"
          />
          <tr>
            <td colSpan={2}>
              <peculiar-certificate-summary
                certificate={this.certificateDecoded}
                issuerDnLink={this.getIssuerDnLink()}
                view={this.view}
              />
            </td>
          </tr>

          <PublicKey
            publicKey={this.certificateDecoded.publicKey}
          />

          <Signature
            signature={this.certificateDecoded.signature}
          />

          <Thumbprints
            thumbprints={this.certificateDecoded.thumbprints}
          />

          <Extensions
            extensions={this.certificateDecoded.extensions}
            getLEILink={this.getLEILink}
            getDNSNameLink={this.getDNSNameLink}
            getIPAddressLink={this.getIPAddressLink}
            getAuthKeyIdParentLink={this.getAuthKeyIdParentLink}
            getAuthKeyIdSiblingsLink={this.getAuthKeyIdSiblingsLink}
            getSubjectKeyIdChildrenLink={this.getSubjectKeyIdChildrenLink}
            getSubjectKeyIdSiblingsLink={this.getSubjectKeyIdSiblingsLink}
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
