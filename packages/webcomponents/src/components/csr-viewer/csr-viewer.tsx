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

import { CSR } from '../../crypto';
import { getDNSNameLink, getIPAddressLink, getLEILink } from '../../utils/third_party_links';
import {
  BasicInformation,
  SubjectName,
  Signature,
  Thumbprints,
  Extensions,
  Miscellaneous,
  PublicKey,
  Attributes,
} from '../certificate-details-parts';
import { Typography } from '../typography';

export type CsrProp = string | CSR;

@Component({
  tag: 'peculiar-csr-viewer',
  styleUrl: '../certificate-viewer/certificate-viewer.scss',
  shadow: true,
})
export class CsrViewer {
  private certificateDecoded: CSR;

  private certificateDecodeError: Error;

  private mobileMediaQuery: MediaQueryList;

  /**
   * The certificate value for decode and show details. Use PEM or DER.
   */
  @Prop({ reflect: true }) certificate: CsrProp;

  /**
   * If `true` - component will show split-button to download certificate as PEM or DER.
   */
  @Prop() download?: boolean;

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
   * Mobile media query string to control screen view change.
   * <br />
   * **NOTE**: Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia.
   * @example
   *  (max-width: 900px)
   */
  @Prop({ reflect: false }) mobileMediaQueryString?: string = '(max-width: 900px)';

  @State() mobileScreenView: boolean = false;

  @State() isDecodeInProcess: boolean = true;

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

  private async decodeCertificate(certificate: CsrProp) {
    this.isDecodeInProcess = true;

    try {
      if (certificate instanceof CSR) {
        this.certificateDecoded = certificate;
      } else if (typeof certificate === 'string') {
        this.certificateDecoded = new CSR(certificate);
      } else {
        return;
      }

      this.certificateDecoded.parseAttributes();
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
  watchCertificateAndDecode(
    newValue: CsrProp,
    oldValue: CsrProp,
  ) {
    if (typeof newValue === 'string' && typeof oldValue === 'string') {
      if (newValue !== oldValue) {
        this.decodeCertificate(newValue);
      }

      return;
    }

    if (
      newValue instanceof CSR
      && oldValue instanceof CSR
    ) {
      if (newValue.commonName !== oldValue.commonName) {
        this.decodeCertificate(newValue);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private getAuthKeyIdParentLink = (value: string) => value;

  // eslint-disable-next-line class-methods-use-this
  private getAuthKeyIdSiblingsLink = (value: string) => value;

  private getSubjectKeyIdChildrenLink = (value: string) => this.subjectKeyIdChildrenLink
    ?.replace('{{subjectKeyId}}', value);

  private getSubjectKeyIdSiblingsLink = (value: string) => this.subjectKeyIdSiblingsLink
    ?.replace('{{subjectKeyId}}', value);

  // eslint-disable-next-line class-methods-use-this
  private renderErrorState() {
    return (
      <div class="status_wrapper">
        <Typography>
          There was an error decoding this certificate request.
        </Typography>
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  private renderEmptyState() {
    return (
      <div class="status_wrapper">
        <Typography>
          There is no certificate request available.
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

          <SubjectName
            name={this.certificateDecoded.subject}
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

          <Attributes
            attributes={this.certificateDecoded.attributes}
            getLEILink={getLEILink}
            getDNSNameLink={getDNSNameLink}
            getIPAddressLink={getIPAddressLink}
            getAuthKeyIdParentLink={this.getAuthKeyIdParentLink}
            getAuthKeyIdSiblingsLink={this.getAuthKeyIdSiblingsLink}
            getSubjectKeyIdChildrenLink={this.getSubjectKeyIdChildrenLink}
            getSubjectKeyIdSiblingsLink={this.getSubjectKeyIdSiblingsLink}
          />

          <Extensions
            extensions={this.certificateDecoded.extensions}
            title="Extension Request"
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
        </table>
      </Host>
    );
  }
}
