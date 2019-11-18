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
  @State() expanded: Certificate['signature']['value'];

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

  setExpanded(signature) {
    const isExpandedClicked = this.expanded === signature;

    this.expanded = isExpandedClicked
      ? null
      : signature;
  }

  renderCertificates() {

    return this.certificatesDecoded.map(certificate => {
      const isExpanded = certificate.signature.value === this.expanded;

      return (
        <tr class={isExpanded && 'fill_grey'}>
          <td>
            {certificate.commonName}
          </td>
          <td>
            {certificate.fingerprint}
          </td>
          <td>
            <button onClick={this.setExpanded.bind(this, certificate.signature.value)}>Details</button>
            <button onClick={certificate.downloadAsPEM}>Download PEM</button>
            <button onClick={certificate.downloadAsDER}>Download DER</button>
          </td>
          <td />
        </tr>
    )})
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
