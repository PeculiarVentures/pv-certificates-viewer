import { Component, h, Prop, State, Watch, Host } from '@stencil/core';
import { Certificate } from '../../utils/crypto';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);

@Component({
  tag: 'pv-certificates-viewer',
  styleUrls: [
    '../../styles/reset.css',
    '../../styles/theme.css',
    'certificates-viewer.css',
  ],
  shadow: true,
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
    return Object.keys(item).map(subject => {
      return (
        <p class="dn_row">
          <span class="dn_name b3">{item[subject].name}</span>
          <span class="dn_value b3">{item[subject].value}</span>
        </p>
      )
    })
  }

  renderMetaData(item: Certificate) {
    return ([
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Serial number:</span>
        <span class="meta_value b3">{item.serialNumber}</span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Version:</span>
        <span class="meta_value b3">{item.version}</span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Validity:</span>
        <span class="meta_value b3">{item.validity} days</span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Issued:</span>
        <span class="meta_value b3">{dayjs(item.notBefore).format('llll')}</span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Expired:</span>
        <span class="meta_value b3">{dayjs(item.notAfter).format('llll')}</span>
      </p>,
    ]);
  }

  renderCertificates() {
    return this.certificatesDecoded.map(certificate => {
      const isExpandedRow = certificate.serialNumber === this.expandedRow;

      return ([
        <tr
          class={isExpandedRow && 'expanded fill_grey_1_opacity'}
          onClick={this.onClickRow.bind(this, certificate.serialNumber)}
        >
          <td class="b3 stroke_grey_3_border">
            {certificate.commonName}
          </td>
          <td colSpan={3} class="b3 stroke_grey_3_border">
            {certificate.fingerprint}
          </td>
          <td class="align-center stroke_grey_3_border">
            <button
              onClick={this.onClickDetails.bind(this, certificate.base64)}
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
        </tr>,
        isExpandedRow && (
          <tr class="expanded_summary fill_grey_1_opacity">
            <td colSpan={2} class="stroke_grey_3_border">
              <p class="text_grey_5 b3 dn_row">
                Subject DN:
              </p>
              {this.renderDN(certificate.subject)}
            </td>
            <td colSpan={1} class="stroke_grey_3_border">
              <p class="text_grey_5 b3 dn_row">
                Issuer DN:
              </p>
              {this.renderDN(certificate.issuer)}
            </td>
            <td colSpan={2} class="stroke_grey_3_border">
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
        <div class="modal_content fill_white">
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
        <table class="text_black">
          <thead class="fill_grey_2">
            <tr>
              <th class="h7 stroke_grey_3_border">
                Name
              </th>
              <th colSpan={3} class="h7 stroke_grey_3_border">
                Fingerprint (SHA-1)
              </th>
              <th class="align-center h7 stroke_grey_3_border">
                Actions
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
