import { Component, h, Prop, State } from '@stencil/core';
import { Certificate } from '../../utils/crypto';

@Component({
  tag: 'pv-certificates-viewer',
  styleUrl: 'certificates-viewer.css',
  shadow: true
})
export class CertificatesViewer {
  @Prop() certificates: string = '';
  @State() certificatesDecoded: Certificate[] = [];

  error: Error;

  componentWillLoad() {
    const data = [];

    this.certificatesPropParsed.forEach((value) => {
      try {
        data.push(new Certificate(value))
      } catch(error) {
        this.error = error;
      }
    });

    this.certificatesDecoded = data;
  }

  get certificatesPropParsed() {
    return this.certificates ? this.certificates.split(',') : [];
  }

  renderEmptyState() {
    return (
      <tr>
        <td
          colSpan={4}
          class="empty"
        >
          No certificates provided
        </td>
      </tr>
    )
  }

  renderError() {
    return (
      <tr>
        <td
          colSpan={4}
          class="empty"
        >
          Certificate parsing error occured
        </td>
      </tr>
    )
  }

  renderCertificates() {

    if (this.error) {
      return this.renderError();
    }

    if (!this.certificatesDecoded.length) {
      return this.renderEmptyState();
    }

    console.log(this.certificatesDecoded)

    return this.certificatesDecoded.map(certificate => (
      <tr>
        <td>
          {certificate.commonName}
        </td>
        <td>
          {certificate.serialNumber}
        </td>
        <td>
          <button>Details</button>
          <button>Download</button>
        </td>
        <td>
          <a href="#">Valid</a>
          <a href="#">Revoked</a>
          <a href="#">Expired</a>
        </td>
      </tr>
    ))
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>
              Subject
            </th>
            <th>
              Hash (SHA-256)
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
