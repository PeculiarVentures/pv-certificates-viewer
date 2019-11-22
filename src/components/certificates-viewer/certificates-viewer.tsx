import { Component, h, Prop, State, Watch, Host } from '@stencil/core';
import { Certificate } from '../../utils/crypto';
import dayjs from 'dayjs';

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

  onClickModalClose = () => {
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
            {certificate.commonName}
          </td>
          <td colSpan={3} class="b3 stroke_grey_3_border">
            {certificate.fingerprint}
          </td>
          <td class="align-center stroke_grey_3_border">
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
          onClick={this.onClickModalClose}
        />
        <div class="modal_content">
          <div class="fill_grey_2 modal_title stroke_grey_3_border">
            <p class="h4">
              Certificate details
            </p>
            <button class="modal_close" onClick={this.onClickModalClose}>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.7204 14.375L21.0654 19.7185C21.3115 19.9658 21.3115 20.3693 21.0654 20.6154L20.615 21.0645C20.3689 21.3118 19.9667 21.3118 19.7181 21.0645L14.3744 15.721L9.03194 21.0645C8.78327 21.3118 8.3811 21.3118 8.13371 21.0645L7.68459 20.6154C7.43847 20.3693 7.43847 19.9658 7.68459 19.7185L13.0296 14.375L7.68459 9.03155C7.43847 8.78417 7.43847 8.38074 7.68459 8.13463L8.13371 7.68554C8.3811 7.43815 8.78327 7.43815 9.03194 7.68554L14.3744 13.029L19.7181 7.68554C19.9667 7.43815 20.3689 7.43815 20.615 7.68554L21.0654 8.13463C21.3115 8.38074 21.3115 8.78417 21.0654 9.03155L15.7204 14.375Z"
                  fill="#2A3134"
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
