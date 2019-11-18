import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'pv-certificates-viewer',
  styleUrl: 'certificates-viewer.css',
  shadow: true
})
export class CertificatesViewer {
  @Prop() certificates: string = '';
  @State() certificatesDecoded: ICertificate[] = [];

  componentWillLoad() {
    this.certificatesDecoded = [{
      subject: 'GTS Root R1',
      issuer: 'GTS Root R1',
      fingerprint: 'e1c950e6ef22f84c5645728b922060d7d5a7a3e8',
      issued: '2019-11-18T11:56:50.463Z',
      expired: '2019-11-18T11:56:50.463Z',
      validity: 1,
      version: 0,
      serialNumber: 'serial number',
    }, {
      subject: 'GTS Root R2',
      issuer: 'GTS Root R2',
      fingerprint: 'e1c950e6ef22f84c5645728b922060d7d5a7a3e8',
      issued: '2019-11-18T11:56:50.463Z',
      expired: '2019-11-18T11:56:50.463Z',
      validity: 1,
      version: 0,
      serialNumber: 'serial number',
    }];
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
              {value.subject}
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
