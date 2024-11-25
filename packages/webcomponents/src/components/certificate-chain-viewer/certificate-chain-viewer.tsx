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
  Host,
} from '@stencil/core';

import {
  X509Certificates,
} from '../../crypto';
import { Typography } from '../typography';

export type CertificateProp = X509Certificates;

@Component({
  tag: 'peculiar-certificate-chain-viewer',
  styleUrl: 'certificate-chain-viewer.scss',
  shadow: true,
})
export class CertificateChainViewer {
  // private certificateDecoded: X509Certificates;

  // private certificateDecodeError: Error;

  // private mobileMediaQuery: MediaQueryList;

  /**
   * The certificate value for decode and show details. Use PEM or DER.
   */
  @Prop({ reflect: true }) certificate: CertificateProp;

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

  @State() mobileScreenView: boolean = false;

  @State() isDecodeInProcess: boolean = true;

  // private handleMediaQueryChange(event: MediaQueryListEvent) {
  //   this.mobileScreenView = event.matches;
  // }

  // componentWillLoad() {
  //   this.decodeCertificate(this.certificate);

  //   if (Build.isBrowser) {
  //     this.mobileMediaQuery = window.matchMedia(this.mobileMediaQueryString);
  //     this.mobileMediaQuery.addEventListener('change', this.handleMediaQueryChange.bind(this));
  //     this.mobileScreenView = this.mobileMediaQuery.matches;
  //   }
  // }

  // disconnectedCallback() {
  //   this.mobileMediaQuery.removeEventListener('change', this.handleMediaQueryChange.bind(this));
  // }

  // private async decodeCertificate(certificate: CertificateProp) {
  //   this.isDecodeInProcess = true;

  //   try {
  //     this.certificateDecoded = certificate;

  //     // this.certificateDecoded.parseExtensions();
  //     // await this.certificateDecoded.getThumbprint('SHA-1');
  //     // await this.certificateDecoded.getThumbprint('SHA-256');
  //   } catch (error) {
  //     this.certificateDecodeError = error;

  //     console.error('Error certificate parse:', error);
  //   }

  //   this.isDecodeInProcess = false;
  // }

  /**
   * Rerun decodeCertificate if previuos value not equal current value
   */
  // @Watch('certificate')
  // watchCertificateAndDecode(newValue: CertificateProp, oldValue: CertificateProp) {
  //   if (typeof newValue === 'string' && typeof oldValue === 'string') {
  //     if (newValue !== oldValue) {
  //       this.decodeCertificate(newValue);
  //     }

  //     return;
  //   }

  //   if (newValue instanceof X509Certificate && oldValue instanceof X509Certificate) {
  //     if (newValue.serialNumber !== oldValue.serialNumber) {
  //       this.decodeCertificate(newValue);
  //     }
  //   }
  // }

  // private getAuthKeyIdParentLink = (value: string) => this.authKeyIdParentLink
  //   ?.replace('{{authKeyId}}', value);

  // private getAuthKeyIdSiblingsLink = (value: string) => this.authKeyIdSiblingsLink
  //   ?.replace('{{authKeyId}}', value);

  // private getSubjectKeyIdChildrenLink = (value: string) => this.subjectKeyIdChildrenLink
  //   ?.replace('{{subjectKeyId}}', value);

  // private getSubjectKeyIdSiblingsLink = (value: string) => this.subjectKeyIdSiblingsLink
  //   ?.replace('{{subjectKeyId}}', value);

  // private getIssuerDnLink() {
  //   return this.issuerDnLink;
  // }

  // eslint-disable-next-line class-methods-use-this
  // private renderErrorState() {
  //   return (
  //     <div class="status_wrapper">
  //       <Typography>
  //         There was an error decoding this certificate.
  //       </Typography>
  //     </div>
  //   );
  // }

  // eslint-disable-next-line class-methods-use-this
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
    // if (this.certificateDecodeError) {
    //   return this.renderErrorState();
    // }

    if (!this.certificate) {
      return this.renderEmptyState();
    }

    return (
      <Host>
        {Array.from(this.certificate).map((certificate) => (
          <peculiar-certificate-viewer
            certificate={certificate}
            download={false}
          />
        ))}
        {/* <table>
          <BasicInformation
            {...this.certificateDecoded}
          />

          <SubjectName
            name={this.certificateDecoded.subject}
          />

          <IssuerName
            name={this.certificateDecoded.issuer}
            issuerDnLink={this.getIssuerDnLink()}
          />

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
            getLEILink={getLEILink}
            getDNSNameLink={getDNSNameLink}
            getIPAddressLink={getIPAddressLink}
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
        </table> */}
      </Host>
    );
  }
}
