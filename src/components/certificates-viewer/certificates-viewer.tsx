import { Component, h, Prop, State, Watch, Host } from '@stencil/core';
import { Certificate } from '../../utils/crypto';
import dayjs from 'dayjs';

@Component({
  tag: 'pv-certificates-viewer',
  styleUrls: [
    '../../styles/reset.css',
    '../../styles/theme.css',
    '../../styles/system.css',
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
    if (!item) {
      return null;
    }

    return Object.keys(item).map(keyName => {
      return (
        <p class="dn_row">
          <span class="dn_name b3">{keyName}</span>
          <span class="dn_value b3">{item[keyName].value}</span>
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
        <span class="meta_value b3">{dayjs(item.notBefore).format('ddd, MMM D, YYYY h:mm A')}</span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Expired:</span>
        <span class="meta_value b3">{dayjs(item.notAfter).format('ddd, MMM D, YYYY h:mm A')}</span>
      </p>,
    ]);
  }

  renderExpandedRow(certificate: Certificate) {
    return (
      <tr class="expanded_summary fill_grey_1_opacity">
        <td colSpan={certificate.isRoot ? 3 : 2} class="stroke_grey_3_border">
          <p class="text_grey_5 b3 dn_row">
            Subject DN:
          </p>
          {this.renderDN(certificate.subject)}
        </td>
        {certificate.isRoot
          ? null
          : (
            <td colSpan={1} class="stroke_grey_3_border">
              <p class="text_grey_5 b3 dn_row">
                Issuer DN:
              </p>
              {this.renderDN(certificate.issuer)}
            </td>
          )
        }
        <td colSpan={2} class="stroke_grey_3_border">
          {this.renderMetaData(certificate)}
        </td>
      </tr>
    );
  }

  renderCertificates() {
    return this.certificatesDecoded.map(certificate => {
      const isExpandedRow = certificate.serialNumber === this.expandedRow;

      return ([
        <tr
          class={isExpandedRow && 'expanded fill_grey_1_opacity'}
          onClick={this.onClickRow.bind(this, certificate.serialNumber)}
          key={certificate.serialNumber}
        >
          <td class="b3 stroke_grey_3_border">
            <span class="mobile_title text_grey_5 align-left b3">Subject:</span>
            <span class="content">{certificate.commonName}</span>
          </td>
          <td colSpan={3} class="b3 stroke_grey_3_border">
            <span class="mobile_title text_grey_5 align-left b3">Hash (SHA-256):</span>
            <span class="content">{certificate.fingerprint}</span>
          </td>
          <td class="align-center stroke_grey_3_border">
            <span class="mobile_title text_grey_5 align-left b3">Action:</span>
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
