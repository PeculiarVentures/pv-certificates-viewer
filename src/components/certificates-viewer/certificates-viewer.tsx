import { Component, h, Prop, State, Watch } from '@stencil/core';
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
  @State() expanded: Certificate['serialNumber'];

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

  onClickDetails = (event: MouseEvent) => {
    event.stopPropagation();
  }

  setExpanded(serialNumber: Certificate['serialNumber']) {
    const isExpandedClicked = this.expanded === serialNumber;

    this.expanded = isExpandedClicked
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
      const isExpanded = certificate.serialNumber === this.expanded;

      return ([
        <tr
          class={isExpanded && 'fill_grey'}
          onClick={this.setExpanded.bind(this, certificate.serialNumber)}
        >
          <td>
            {certificate.commonName}
          </td>
          <td>
            {certificate.fingerprint}
          </td>
          <td>
            <button
              onClick={this.onClickDetails}
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
        isExpanded && (
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

  render() {
    return (
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
    );
  }
}
