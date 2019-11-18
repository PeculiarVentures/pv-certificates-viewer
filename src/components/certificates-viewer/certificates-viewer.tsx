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

  componentWillLoad() {
    const data = [];

    this.certificatesPropParsed.forEach((value) => {
      try {
        data.push(new Certificate(value))
      } catch(error) {
        console.error(error);
      }
    });

    this.certificatesDecoded = data;
  }

  get certificatesPropParsed() {
    return this.certificates.split(',');
  }

  render() {
    return (
      <section>
        <h3>
          Certificates:
        </h3>
        <ul>
          {this.certificatesDecoded.map(value => (
            <li>
              {value.serialNumber}
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
