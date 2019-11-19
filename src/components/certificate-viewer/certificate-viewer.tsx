import { Component, h, Prop } from '@stencil/core';
import { Certificate } from '../../utils/crypto';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);


@Component({
  tag: 'pv-certificate-viewer',
  styleUrls: [
    '../../styles/reset.css',
    '../../styles/theme.css',
    'certificate-viewer.css',
  ],
  shadow: true
})
export class CertificateViewer {
  cert: Certificate;

  @Prop() certificate: string;

  componentWillLoad() {
    try {
      this.cert = new Certificate(this.certificate, true);
    } catch (error) {
      console.error(error);
    }
  }

  renderRowTitle(title: string) {
    return (
      <tr>
        <td colSpan={2} class="h7">
          {title}
        </td>
      </tr>
    );
  }

  renderRowValue(title: string, value: string | number) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      return null;
    }

    return (
      <tr>
        <td class="b3 text_grey_5">
          {title}:
        </td>
        <td class="b3">
          {value}
        </td>
      </tr>
    );
  }

  render() {
    if (!this.cert) {
      return null;
    }

    return (
      <table class="text_black">
        {this.renderRowTitle('Basic Information')}
        {this.renderRowValue('Subject DN', this.cert.subject.map(obj => `${obj.name}=${obj.value}`).join(','))}
        {this.renderRowValue('Issuer DN', this.cert.issuer.map(obj => `${obj.name}=${obj.value}`).join(','))}
        {this.renderRowValue('Serial Number', this.cert.serialNumber)}
        {this.renderRowValue('Version', this.cert.version)}
        {this.renderRowValue('Issued', dayjs(this.cert.notBefore).format('llll'))}
        {this.renderRowValue('Expired', dayjs(this.cert.notAfter).format('llll'))}
        {this.renderRowValue('Validity', `${this.cert.validity} days`)}
        <tr>
          <td colSpan={2}>
            <br/>
          </td>
        </tr>

        {this.renderRowTitle('Public Key Info')}
        {this.renderRowValue('Algorithm', this.cert.publicKey.algorithm.name)}
        {this.renderRowValue('Modulus Bits', this.cert.publicKey.algorithm.modulusBits)}
        {this.renderRowValue('Public Exponent', this.cert.publicKey.algorithm.publicExponent)}
        {this.renderRowValue('Named Curve', this.cert.publicKey.algorithm.namedCurve)}
        {this.renderRowValue('Value', this.cert.publicKey.value)}
        <tr>
          <td colSpan={2}>
            <br/>
          </td>
        </tr>

        {this.renderRowTitle('Signature')}
        {this.renderRowValue('Algorithm', this.cert.signature.algorithm.name)}
        {this.renderRowValue('Hash', this.cert.signature.algorithm.hash)}
        {this.renderRowValue('Value', this.cert.signature.value)}
        <tr>
          <td colSpan={2}>
            <br/>
          </td>
        </tr>

        {this.renderRowTitle('Extensions')}
        {this.cert.extensions.map((extension) => ([
          this.renderRowValue('Name', extension.name ? `${extension.name} (${extension.oid})` : extension.oid),
          this.renderRowValue('Critical', extension.critical ? 'Yes' : 'No'),
          this.renderRowValue('Value', JSON.stringify(extension.value)),
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
