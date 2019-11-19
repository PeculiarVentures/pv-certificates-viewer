import { Component, h, Prop } from '@stencil/core';
import { Certificate } from '../../utils/crypto';

@Component({
  tag: 'pv-certificate-viewer',
  styleUrl: 'certificate-viewer.css',
  shadow: true
})
export class CertificateViewer {
  cert: Certificate;

  @Prop() certificate: string;

  componentWillLoad() {
    this.cert = new Certificate(this.certificate, true);

    console.log(this.cert);
  }

  render() {
    return (
      <table>
        <tr>
          <td colSpan={2}>
            <h3>
              Basic Information
            </h3>
          </td>
        </tr>
        <tr>
          <td>
            Subject DN:
          </td>
          <td>
            {this.cert.subject.map(sbj => `${sbj.name}=${sbj.value}`).join(',')}
          </td>
        </tr>
        <tr>
          <td>
            Issuer DN:
          </td>
          <td>
            {this.cert.issuer.map(sbj => `${sbj.name}=${sbj.value}`).join(',')}
          </td>
        </tr>
        <tr>
          <td>
            Serial Number:
          </td>
          <td>
            {this.cert.serialNumber}
          </td>
        </tr>
        <tr>
          <td>
            Version:
          </td>
          <td>
            {this.cert.version}
          </td>
        </tr>
        <tr>
          <td>
            Issued:
          </td>
          <td>
            {this.cert.notBefore}
          </td>
        </tr>
        <tr>
          <td>
            Expired:
          </td>
          <td>
            {this.cert.notAfter}
          </td>
        </tr>
        <tr>
          <td>
            Validity:
          </td>
          <td>
            {this.cert.validity} days
          </td>
        </tr>

        <tr>
          <td colSpan={2}>
            <br/>
            <h3>
              Public Key Info
            </h3>
          </td>
        </tr>
        <tr>
          <td>
            Algorithm:
          </td>
          <td>
            {this.cert.publicKey.algorithm.name}
          </td>
        </tr>
        <tr>
          <td>
            Modulus Bits:
          </td>
          <td>
            {this.cert.publicKey.algorithm.modulusBits}
          </td>
        </tr>
        <tr>
          <td>
            Public Exponent:
          </td>
          <td>
            {this.cert.publicKey.algorithm.publicExponent}
          </td>
        </tr>
        <tr>
          <td>
            Named Curve:
          </td>
          <td>
            {this.cert.publicKey.algorithm.namedCurve}
          </td>
        </tr>
        <tr>
          <td>
            Value:
          </td>
          <td>
            {this.cert.publicKey.value}
          </td>
        </tr>

        <tr>
          <td colSpan={2}>
            <br/>
            <h3>
              Signature
            </h3>
          </td>
        </tr>
        <tr>
          <td>
            Algorithm:
          </td>
          <td>
            {this.cert.signature.algorithm.name}
          </td>
        </tr>
        <tr>
          <td>
            Hash:
          </td>
          <td>
            {this.cert.signature.algorithm.hash}
          </td>
        </tr>
        <tr>
          <td>
            Value:
          </td>
          <td>
            {this.cert.signature.value}
          </td>
        </tr>

        <tr>
          <td colSpan={2}>
            <br/>
            <h3>
              Extensions
            </h3>
          </td>
        </tr>
        {this.cert.extensions.map((extension) => ([
          <tr>
            <td>
              Name:
            </td>
            <td>
              {extension.name ? `${extension.name} (${extension.oid})` : extension.oid}
            </td>
          </tr>,
          <tr>
            <td>
              Critical:
            </td>
            <td>
              {extension.critical ? 'Yes' : 'No'}
            </td>
          </tr>,
          <tr>
            <td>
              Value:
            </td>
            <td>
              {JSON.stringify(extension.value)}
            </td>
          </tr>,
          <tr>
            <td colSpan={2}>
              <br/>
            </td>
          </tr>,
        ]))}
      </table>
    );
  }
}
