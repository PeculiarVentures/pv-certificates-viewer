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

  async componentWillLoad() {
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

  @Watch('certificates')
  watchCertificates() {
    this.certificatesDecodeAndSet();
  }

  setExpanded(serialNumber: Certificate['serialNumber']) {
    const isExpandedClicked = this.expanded === serialNumber;

    this.expanded = isExpandedClicked
      ? null
      : serialNumber;
  }

  renderDN(item: Certificate['subject'] | Certificate['issuer']) {
    return Object.keys(item).map(subject => {
      return (
        <p>
          <span>{item[subject].name}</span>
          &nbsp;
          <span>{item[subject].value}</span>
        </p>
      )
    })
  }

  renderMetaData(item: Certificate) {
    return ([
      <p>
        <span>Serial number:</span>
        &nbsp;
        <span>{item.serialNumber}</span>
      </p>,
      <p>
        <span>Version:</span>
        &nbsp;
        <span>{item.version}</span>
      </p>,
      <p>
        <span>Validity:</span>
        &nbsp;
        <span>{item.validity} days</span>
      </p>,
      <p>
        <span>Issued:</span>
        &nbsp;
        <span>{dayjs(item.notBefore).format('ddd, MMM D, YYYY h:mm:ss')}</span>
      </p>,
      <p>
        <span>Expired:</span>
        &nbsp;
        <span>{dayjs(item.notAfter).format('ddd, MMM D, YYYY h:mm:ss')}</span>
      </p>,
    ])
  }

  renderCertificates() {
    return this.certificatesDecoded.map(certificate => {
      const isExpanded = certificate.serialNumber === this.expanded;

      return ([
        <tr class={isExpanded && 'fill_grey'}>
          <td>
            {certificate.commonName}
          </td>
          <td>
            {certificate.fingerprint}
          </td>
          <td>
            <button onClick={this.setExpanded.bind(this, certificate.serialNumber)}>
              Details
            </button>
            <button onClick={certificate.downloadAsPEM}>
              Download PEM
            </button>
            <button onClick={certificate.downloadAsDER}>
              Download DER
            </button>
          </td>
          <td />
        </tr>,
        isExpanded && (
          <tr class="fill_grey">
            <td colSpan={1}>
              <span>Subject DN:</span>
              &nbsp;
              {this.renderDN(certificate.subject)}
            </td>
            <td colSpan={1}>
              <span>Issuer DN:</span>
              &nbsp;
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
      <table class="table">
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
