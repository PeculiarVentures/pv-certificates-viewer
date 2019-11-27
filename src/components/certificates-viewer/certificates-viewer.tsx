import { Component, h, Prop, State, Watch, Host } from '@stencil/core';
import { Certificate } from '../../utils/crypto';

export interface ICertificate {
  value: string;
  name?: string;
  tests?: {
    valid?: string;
    revoked?: string;
    expired?: string;
  };
}

interface ICertificateDecoded extends Certificate {
  tests?: ICertificate['tests'];
}

@Component({
  tag: 'pv-certificates-viewer',
  styleUrls: [
    '../../styles/reset.css',
    '../../styles/system.css',
    'certificates-viewer.css',
  ],
  shadow: true,
})
export class CertificatesViewer {
  /**
   * List of certificates values for decode and show in the list.
   */
  @Prop() certificates: ICertificate[] = [];

  @State() certificatesDecoded: ICertificateDecoded[] = [];
  @State() expandedRow: Certificate['serialNumber'] | null;
  @State() certificateSelectedForDetails: string | null;

  private isHasTests: boolean = false;
  private isHasRoots: boolean = false;

  componentWillLoad() {
    this.certificatesDecodeAndSet();
  }

  @Watch('certificates')
  watchCertificates() {
    this.certificatesDecodeAndSet();
  }

  async certificatesDecodeAndSet() {
    this.isHasTests = false;
    this.isHasRoots = false;

    if (!Array.isArray(this.certificates)) {
      return [];
    }

    const data: ICertificateDecoded[] = [];

    for (let certificate of this.certificates) {
      const cert = new Certificate(certificate.value, certificate.name);
      await cert.getFingerprint();

      try {
        data.push(Object.assign(
          cert,
          { tests: certificate.tests },
        ));

        if (!this.isHasRoots && cert.isRoot) {
          this.isHasRoots = true;
        }

        if (!this.isHasTests) {
          if (
            certificate.tests &&
            (certificate.tests.expired || certificate.tests.revoked || certificate.tests.valid)
          ) {
            this.isHasTests = true;
          }
        }
      } catch(error) {
        console.error(error);
      }
    }

    this.certificatesDecoded = data;
  }

  onClickDownload(certificate: Certificate, downloadType: 'PEM' | 'DER', event: MouseEvent) {
    event.stopPropagation();

    if (downloadType === 'PEM') {
      return certificate.downloadAsPEM();
    }

    return certificate.downloadAsDER();
  }

  onClickDetails = (value: string, event: MouseEvent) => {
    event.stopPropagation();

    this.certificateSelectedForDetails = value;
  }

  onClickModalClose = () => {
    this.certificateSelectedForDetails = null;
  }

  onClickRow(serialNumber: Certificate['serialNumber']) {
    const isExpandedRowClicked = this.expandedRow === serialNumber;

    this.expandedRow = isExpandedRowClicked
      ? null
      : serialNumber;
  }

  renderExpandedRow(certificate: Certificate) {
    let colSpan = 4;

    if (this.isHasTests) {
      colSpan += 1;
    }

    if (!this.isHasRoots) {
      colSpan += 1;
    }

    return (
      <tr class="expanded_summary fill_grey_1_opacity">
        <td colSpan={colSpan} class="stroke_border">
          <pv-certificate-summary
            certificate={certificate}
            showIssuer={!certificate.isRoot}
          />
        </td>
      </tr>
    );
  }

  renderCertificateTests(tests: ICertificateDecoded['tests']) {
    if (!tests) {
      return null;
    }

    const elems = [];

    if (tests.valid) {
      elems.push((
        <pv-button
          class="button_table_action"
          href={tests.valid}
          target="_blank"
        >
          Valid
        </pv-button>
      ));
    }

    if (tests.revoked) {
      elems.push((
        <pv-button
          class="button_table_action"
          href={tests.revoked}
          target="_blank"
        >
          Revoked
        </pv-button>
      ));
    }

    if (tests.expired) {
      elems.push((
        <pv-button
          class="button_table_action"
          href={tests.expired}
          target="_blank"
        >
          Expired
        </pv-button>
      ));
    }

    return elems;
  }

  renderCertificates() {
    return this.certificatesDecoded.map(certificate => {
      const isExpandedRow = certificate.serialNumber === this.expandedRow;

      return ([
        <tr
          class={{
            stroke_border: true,
            'expanded fill_grey_1_opacity': isExpandedRow,
          }}
          onClick={this.onClickRow.bind(this, certificate.serialNumber)}
          key={certificate.serialNumber}
        >
          {!this.isHasRoots && (
            <td class="b3 stroke_border">
              <span class="mobile_title text_grey align-left b3">
                Issuer:
              </span>
              <span class="content">
                {certificate.issuer && certificate.issuer.CN ? certificate.issuer.CN.value : ''}
              </span>
            </td>
          )}
          <td class="b3 stroke_border">
            <span class="mobile_title text_grey align-left b3">
              Name:
            </span>
            <span class="content">
              {certificate.commonName}
            </span>
          </td>
          <td class="b3 stroke_border">
            <span class="mobile_title text_grey align-left b3">
              Public Key:
            </span>
            <span class="content">
              {certificate.publicKey.algorithm.name} {certificate.publicKey.algorithm.modulusBits || certificate.publicKey.algorithm.namedCurve}
            </span>
          </td>
          <td class="b3 stroke_border">
            <span class="mobile_title text_grey align-left b3">
              Fingerprint (SHA-1):
            </span>
            <span class="content monospace">
              {certificate.fingerprint}
            </span>
          </td>
          <td class="align-center stroke_border">
            <span class="mobile_title text_grey align-left b3">
              Actions:
            </span>
            <span class="content">
              <pv-button
                onClick={this.onClickDetails.bind(this, certificate.base64)}
                class="button_table_action"
              >
                Details
              </pv-button>
              <pv-button-split
                onClick={this.onClickDownload.bind(this, certificate, 'PEM')}
                actions={[{
                  text: 'Download DER',
                  onClick: this.onClickDownload.bind(this, certificate, 'DER'),
                }]}
                class="button_table_action"
              >
                Download PEM
              </pv-button-split>
            </span>
          </td>
          {this.isHasTests && (
            <td class="align-center stroke_border">
              <span class="mobile_title text_grey align-left b3">
                Test URLs:
              </span>
              <span class="content">
                {this.renderCertificateTests(certificate.tests)}
              </span>
            </td>
          )}
        </tr>,
        isExpandedRow && this.renderExpandedRow(certificate),
    ])})
  }

  renderCertificateDetailsModal() {
    if (!this.certificateSelectedForDetails) {
      return null;
    }

    return  (
      <div class="modal_wrapper">
        <div class="modal_content">
          <div class="fill_grey_light modal_title stroke_border">
            <h4 class="h4 text_black">
              Certificate details
            </h4>
            <button
              class="modal_close"
              onClick={this.onClickModalClose}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
                class="svg_fill_black"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.7204 14.375L21.0654 19.7185C21.3115 19.9658 21.3115 20.3693 21.0654 20.6154L20.615 21.0645C20.3689 21.3118 19.9667 21.3118 19.7181 21.0645L14.3744 15.721L9.03194 21.0645C8.78327 21.3118 8.3811 21.3118 8.13371 21.0645L7.68459 20.6154C7.43847 20.3693 7.43847 19.9658 7.68459 19.7185L13.0296 14.375L7.68459 9.03155C7.43847 8.78417 7.43847 8.38074 7.68459 8.13463L8.13371 7.68554C8.3811 7.43815 8.78327 7.43815 9.03194 7.68554L14.3744 13.029L19.7181 7.68554C19.9667 7.43815 20.3689 7.43815 20.615 7.68554L21.0654 8.13463C21.3115 8.38074 21.3115 8.78417 21.0654 9.03155L15.7204 14.375Z"
                />
              </svg>
            </button>
          </div>
          <div class="fill_white">
            <pv-certificate-viewer
              certificate={this.certificateSelectedForDetails}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.certificatesDecoded.length) {
      return (
        <div class="status_wrapper stroke_grey_3_border">
          <p class="b1 interaction_text text_black">
            There is no certificate specified.
          </p>
        </div>
      )
    }

    return (
      <Host>
        <table
          class={{
            text_black: true,
            m_extra: this.isHasTests || !this.isHasRoots,
          }}
        >
          <thead class="fill_grey_light">
            <tr class="stroke_border">
              {!this.isHasRoots && (
                <th class="h7 stroke_border col_issuer">
                  Issuer
                </th>
              )}
              <th class="h7 stroke_border col_name">
                Name
              </th>
              <th class="h7 stroke_border col_public_key">
                Public Key
              </th>
              <th class="h7 stroke_border col_fingerprint">
                Fingerprint (SHA-1)
              </th>
              <th class="align-center h7 stroke_border col_actions">
                Actions
              </th>
              {this.isHasTests && (
                <th class="align-center h7 stroke_border col_tests">
                  Test URLs
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {this.renderCertificates()}
          </tbody>
        </table>
        {this.renderCertificateDetailsModal()}
      </Host>
    );
  }
}
