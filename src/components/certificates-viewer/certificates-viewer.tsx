import { Component, h, Prop, State, Watch, Host } from '@stencil/core';
import { Certificate } from '../../utils/crypto';
import dayjs from 'dayjs';

@Component({
  tag: 'pv-certificates-viewer',
  styleUrl: 'certificates-viewer.css',
  shadow: true
})
export class CertificatesViewer {
  @Prop() certificates: string = '';

  @State() certificatesDecoded: Certificate[] = [];
  @State() expandedRow: Certificate['serialNumber'] | null;
  @State() certificateSelectedForDetails: string | null;

  componentWillLoad() {
    this.certificatesDecodeAndSet();
  }

  @Watch('certificates')
  watchCertificates() {
    this.certificatesDecodeAndSet();
  }

  async certificatesDecodeAndSet() {
    const data = [];

    for (let value of this.certificatesPropParsed) {
      const certificate = new Certificate(value);
      await certificate.getFingerprint();

      try {
        data.push(certificate)
      } catch(error) {
        console.error(error);
      }
    }

    this.certificatesDecoded = data;
  }

  get certificatesPropParsed() {
    return this.certificates.split(',');
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

  onClickModalOverlay = () => {
    this.certificateSelectedForDetails = null;
  }

  onClickRow(serialNumber: Certificate['serialNumber']) {
    const isExpandedRowClicked = this.expandedRow === serialNumber;

    this.expandedRow = isExpandedRowClicked
      ? null
      : serialNumber;
  }

  renderDN(item: Certificate['subject'] | Certificate['issuer']) {
    return Object.keys(item).map(subject => (
      <p>
        <span>{item[subject].name}</span>
        <span>{item[subject].value}</span>
      </p>
    ));
  }

  renderMetaData(item: Certificate) {
    return ([
      <p>
        <span>Serial number:</span>
        <span>{item.serialNumber}</span>
      </p>,
      <p>
        <span>Version:</span>
        <span>{item.version}</span>
      </p>,
      <p>
        <span>Validity:</span>
        <span>{item.validity} days</span>
      </p>,
      <p>
        <span>Issued:</span>
        <span>{dayjs(item.notBefore).format('ddd, MMM D, YYYY h:mm:ss')}</span>
      </p>,
      <p>
        <span>Expired:</span>
        <span>{dayjs(item.notAfter).format('ddd, MMM D, YYYY h:mm:ss')}</span>
      </p>,
    ]);
  }

  renderCertificates() {
    return this.certificatesDecoded.map(certificate => {
      const isExpandedRow = certificate.serialNumber === this.expandedRow;

      return ([
        <tr
          class={isExpandedRow && 'fill_grey'}
          onClick={this.onClickRow.bind(this, certificate.serialNumber)}
        >
          <td>
            {certificate.commonName}
          </td>
          <td>
            {certificate.fingerprint}
          </td>
          <td>
            <button
              onClick={this.onClickDetails.bind(this, certificate.base64)}
            >
              Details
            </button>
            <button
              onClick={this.onClickDownload.bind(this, certificate, 'PEM')}
            >
              Download PEM
            </button>
            <button
              onClick={this.onClickDownload.bind(this, certificate, 'DER')}
            >
              Download DER
            </button>
          </td>
          <td />
        </tr>,
        isExpandedRow && (
          <tr class="fill_grey">
            <td colSpan={1}>
              <span>Subject DN:</span>
              {this.renderDN(certificate.subject)}
            </td>
            <td colSpan={1}>
              <span>Issuer DN:</span>
              {this.renderDN(certificate.issuer)}
            </td>
            <td colSpan={2}>
              {this.renderMetaData(certificate)}
            </td>
          </tr>
        ),
    ])})
  }

  renderCertificateDetailsModal() {
    if (!this.certificateSelectedForDetails) {
      return null;
    }

    return  (
      <div class="modal_wrapper">
        <div
          class="modal_overlay"
          onClick={this.onClickModalOverlay}
        />
        <div class="modal_content">
          <pv-certificate-viewer
            certificate={this.certificateSelectedForDetails}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <Host>
        <table>
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Fingerprint (SHA-1)
              </th>
              <th>
                Actions
              </th>
              <th>
                Test URLs
              </th>
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
