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

  async componentWillLoad() {
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

  renderCertificates() {

    return this.certificatesDecoded.map(certificate => (
      <tr>
        <td>
          {certificate.commonName}
        </td>
        <td>
          {certificate.fingerprint}
        </td>
        <td>
          <button>Details</button>
          <button onClick={certificate.downloadAsPEM}>Download PEM</button>
          <button onClick={certificate.downloadAsDER}>Download DER</button>
        </td>
        <td />
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
