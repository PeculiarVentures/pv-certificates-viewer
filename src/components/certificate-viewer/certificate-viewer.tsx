import { Component, h, Prop } from '@stencil/core';
import { Certificate, TExtension, EnumOIDs } from '../../utils/crypto';
import dayjs from 'dayjs';

@Component({
  tag: 'pv-certificate-viewer',
  styleUrls: [
    '../../styles/reset.css',
    '../../styles/theme.css',
    '../../styles/system.css',
    'certificate-viewer.css',
  ],
  shadow: true,
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

  renderRowValue(title: string, value: string | number | any[]) {
    if (
      typeof value !== 'string'
      && typeof value !== 'number'
      && !Array.isArray(value)
    ) {
      return null;
    }

    return (
      <tr>
        <td class="b3 text_grey_5">
          {title}:
        </td>
        <td class="b3">
          {Array.isArray(value) ? value : value.toString()}
        </td>
      </tr>
    );
  }

  renderRowExtensionValue(extension: TExtension) {
    if (typeof extension.value === 'string') {
      return this.renderRowValue('Value', extension.value);
    }

    switch (extension.oid) {
      case EnumOIDs.BasicConstraints: {
        return [
          this.renderRowValue('cA', String(extension.value.cA)),
          this.renderRowValue('pathLenConstraint', extension.value.pathLenConstraint),
        ];
      }

      case EnumOIDs.NetscapeCertificateType:
      case EnumOIDs.KeyUsage: {
        return this.renderRowValue('Value', extension.value.join(', '));
      }

      case EnumOIDs.ExtendedKeyUsage: {
        return this.renderRowValue(
          'Values',
          extension.value.map((value) => (
            <p class="b3">
              {value.name} ({value.oid})
            </p>
          )),
        );
      }

      case EnumOIDs.CertificatePolicies: {
        return this.renderRowValue(
          'Values',
          extension.value.map((value) => (
            <p class="b3">
              {value.name
                ? `${value.name} (${value.oid})`
                : value.oid
              }
            </p>
          )),
        );
      }

      case EnumOIDs.CRLDistributionPoints: {
        return this.renderRowValue(
          'Paths',
          extension.value.map((value) => {
            if (!value.distributionPoint) {
              return null;
            }

            return value.distributionPoint.map((valuePoint) => {
              if (valuePoint.type === 6) {
                return (
                  <p class="b3">
                    <a href={valuePoint.value}>
                      {valuePoint.value}
                    </a>
                  </p>
                );
              }

              return (
                <p class="b3">
                  {valuePoint.value}
                </p>
              );
            });
          }),
        );
      }

      case EnumOIDs.CertificateAuthorityInformationAccess: {
        return this.renderRowValue(
          'Paths',
          extension.value.map((value) => {
            const accessLocation: Record<string, any> = value.accessLocation;

            if (accessLocation.type === 6) {
              return (
                <p class="b3">
                  {value.accessMethod}: <a href={accessLocation.value}>{accessLocation.value}</a>
                </p>
              );
            }

            return (
              <p class="b3">
                {value.accessMethod}: {accessLocation.value}
              </p>
            );
          }),
        );
      }

      case EnumOIDs.NameConstraints: {
        return [
          this.renderRowValue(
            'Permitted Values',
            extension.value.permitted.map((value) => {
              if (value.type === 2) {
                return (
                  <p class="b3">
                    <a href={`https://censys.io/ipv4?q=${value.value}`}>
                      {value.value}
                    </a>
                  </p>
                );
              }

              if (value.type === 7) {
                return (
                  <p class="b3">
                    <a href={`https://censys.io/ipv4?q=${value.value}`}>
                      {value.value}
                    </a>
                  </p>
                );
              }

              if (value.type === 4) {
                return (
                  <p class="b3">
                    {value.value.map((valueType) => `${valueType.name}=${valueType.value}`).join(', ')}
                  </p>
                );
              }

              return (
                <p class="b3">
                  {value.value}
                </p>
              );
            }),
          ),
        ];
      }

      case EnumOIDs.SubjectAlternativeName: {
        return [
          this.renderRowValue(
            'Values',
            extension.value.map((value) => {
              if (value.type === 2) {
                return (
                  <p class="b3">
                    <a href={`https://censys.io/ipv4?q=${value.value}`}>
                      {value.value}
                    </a>
                  </p>
                );
              }

              if (value.type === 7) {
                return (
                  <p class="b3">
                    <a href={`https://censys.io/ipv4?q=${value.value}`}>
                      {value.value}
                    </a>
                  </p>
                );
              }

              if (value.type === 4) {
                return (
                  <p class="b3">
                    {value.value.map((valueType) => `${valueType.name}=${valueType.value}`).join(', ')}
                  </p>
                );
              }

              return (
                <p class="b3">
                  {value.value}
                </p>
              );
            }),
          ),
        ];
      }

      case EnumOIDs.CertificateTemplate: {
        return [
          this.renderRowValue('Template Id', extension.value.templateID),
          this.renderRowValue('Template Major Version', extension.value.templateMajorVersion),
          this.renderRowValue('Template Minor Version', extension.value.templateMinorVersion),
        ];
      }

      case EnumOIDs.AuthorityKeyIdentifier: {
        return [
          this.renderRowValue('Key Identifier', extension.value.keyIdentifier),
          this.renderRowValue('Authority Cert Issuer', extension.value.authorityCertIssuer),
          this.renderRowValue('Authority Cert Serial Number', extension.value.authorityCertSerialNumber),
        ];
      }
    }

    return this.renderRowValue('Value', extension.value);
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
        {this.renderRowValue('Issued', dayjs(this.cert.notBefore).format('ddd, MMM D, YYYY h:mm A'))}
        {this.renderRowValue('Expired', dayjs(this.cert.notAfter).format('ddd, MMM D, YYYY h:mm A'))}
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
          this.renderRowValue('Critical', String(extension.critical)),
          this.renderRowExtensionValue(extension),
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
