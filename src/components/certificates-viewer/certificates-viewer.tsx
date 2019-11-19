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
    return Object.keys(item).map(subject => {
      return (
        <p class="dn_row">
          <span class="dn_name b3 text_black">{item[subject].name}</span>
          <span class="dn_value b3 text_black">{item[subject].value}</span>
        </p>
      )
    })
  }

  renderMetaData(item: Certificate) {
    return ([
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Serial number:</span>
        <span class="meta_value text_black b3">{item.serialNumber}</span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Version:</span>
        <span class="meta_value text_black b3">{item.version}</span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Validity:</span>
        <span class="meta_value text_black b3">{item.validity} days</span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Issued:</span>
        <span class="meta_value text_black b3">{dayjs(item.notBefore).format('ddd, MMM D, YYYY h:mm:ss')}</span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Expired:</span>
        <span class="meta_value text_black b3">{dayjs(item.notAfter).format('ddd, MMM D, YYYY h:mm:ss')}</span>
      </p>,
    ]);
  }

  renderCertificates() {
    return this.certificatesDecoded.map(certificate => {
      const isExpanded = certificate.serialNumber === this.expanded;

      return ([
        <tr
          class={isExpanded && 'expanded fill_grey_2_opacity'}
          onClick={this.setExpanded.bind(this, certificate.serialNumber)}
        >
          <td colSpan={2} class="align-left b3">
            {certificate.commonName}
          </td>
          <td colSpan={6} class="align-left b3">
            {certificate.fingerprint}
          </td>
          <td colSpan={2} class="align-center">
            <button
              onClick={this.onClickDetails}
              class="b3 text_secondary"
            >
              Details
            </button>
            <button
              onClick={this.onClickDownload.bind(this, certificate, 'PEM')}
              class="b3 text_secondary"
            >
              PEM
            </button>
            <button
              onClick={this.onClickDownload.bind(this, certificate, 'DER')}
              class="b3 text_secondary"
            >
              DER
            </button>
          </td>
          <td colSpan={2} class="align-center" />
        </tr>,
        isExpanded && (
          <tr class="expanded fill_grey_2_opacity">
            <td colSpan={3}>
              <p class="text_grey_5 b3 dn_row">
                Subject DN:
              </p>
              {this.renderDN(certificate.subject)}
            </td>
            <td colSpan={3}>
              <p class="text_grey_5 b3 dn_row">
                Issuer DN:
              </p>
              {this.renderDN(certificate.issuer)}
            </td>
            <td colSpan={6}>
              {this.renderMetaData(certificate)}
            </td>
          </tr>
        ),
    ])})
  }

  render() {
    return (
      <table>
        <thead class="fill_grey_5">
          <tr>
            <th colSpan={2} class="align-left text_white h7">
              Name
            </th>
            <th colSpan={6} class="align-letf text_white h7">
              Fingerprint (SHA-1)
            </th>
            <th colSpan={2} class="align-center text_white h7">
              Actions
            </th>
            <th colSpan={2} class="align-center text_white h7">
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
