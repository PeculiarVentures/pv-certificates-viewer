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
      <tr class="title">
        <td colSpan={2} class="h6 stroke_grey_3_border text_black">
          {title}
        </td>
      </tr>
    );
  }

  renderRowValue(title: string, value: string | number | any[], valueMonospace?: boolean) {
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
        <td
          class={{
            b3: true,
            text_black: true,
            monospace: valueMonospace,
          }}
        >
          {Array.isArray(value) ? value : value.toString()}
        </td>
      </tr>
    );
  }

  renderRowExtensionValue(extension: TExtension) {
    if (typeof extension.value === 'string') {
      return this.renderRowValue('Value', extension.value, true);
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
            <p class="b3 text_black">
              {value.name} ({value.oid})
            </p>
          )),
        );
      }

      case EnumOIDs.CertificatePolicies: {
        return this.renderRowValue(
          'Values',
          extension.value.map((value) => (
            <p class="b3 text_black">
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
                    <a class="text_secondary" href={valuePoint.value}>
                      {valuePoint.value}
                    </a>
                  </p>
                );
              }

              return (
                <p class="b3 text_black">
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
                <p class="b3 text_black">
                  {value.accessMethod}: <a class="text_secondary" href={accessLocation.value}>{accessLocation.value}</a>
                </p>
              );
            }

            return (
              <p class="b3 text_black">
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
                    <a class="text_secondary" href={`https://censys.io/ipv4?q=${value.value}`}>
                      {value.value}
                    </a>
                  </p>
                );
              }

              if (value.type === 7) {
                return (
                  <p class="b3">
                    <a class="text_secondary" href={`https://censys.io/ipv4?q=${value.value}`}>
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
                <p class="b3 text_black">
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
                    <a class="text_secondary" href={`https://censys.io/ipv4?q=${value.value}`}>
                      {value.value}
                    </a>
                  </p>
                );
              }

              if (value.type === 7) {
                return (
                  <p class="b3">
                    <a class="text_secondary" href={`https://censys.io/ipv4?q=${value.value}`}>
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
                <p class="b3 text_black">
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
          this.renderRowValue('Key Identifier', extension.value.keyIdentifier, true),
          this.renderRowValue('Authority Cert Issuer', extension.value.authorityCertIssuer),
          this.renderRowValue('Authority Cert Serial Number', extension.value.authorityCertSerialNumber),
        ];
      }
    }

    return this.renderRowValue('Value', extension.value);
  }



  renderDN(item: Certificate['subject'] | Certificate['issuer']) {
    return Object.keys(item).map(subject => {
      return (
        <p class="dn_row">
          <span class="dn_name b3 text_black">{subject}</span>
          <span class="dn_value b3 text_black">{item[subject].value}</span>
        </p>
      )
    })
  }

  renderMetaData(item: Certificate) {
    return ([
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Serial number:</span>
        <span class="meta_value b3 text_black">{item.serialNumber}</span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Version:</span>
        <span class="meta_value b3 text_black">{item.version}</span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Validity:</span>
        <span class="meta_value b3 text_black">{item.validity} days</span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Issued:</span>
        <span class="meta_value b3 text_black">{dayjs(item.notBefore).format('ddd, MMM D, YYYY h:mm A')}</span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Expired:</span>
        <span class="meta_value b3 text_black">{dayjs(item.notAfter).format('ddd, MMM D, YYYY h:mm A')}</span>
      </p>,
    ]);
  }

  renderBasicInformation(certificate: Certificate) {
    return (
      <tr>
        <td colSpan={2}>
          <div class="basic_info">
            <div class="basic_col">
              <p class="text_grey_5 b3 dn_row">
                Subject DN:
              </p>
              {this.renderDN(certificate.subject)}
            </div>
            <div class="basic_col stroke_grey_3_border">
              <p class="text_grey_5 b3 dn_row">
                Issuer DN:
              </p>
              {this.renderDN(certificate.issuer)}
            </div>
            <div class="basic_meta">
              {this.renderMetaData(certificate)}
            </div>
          </div>
        </td>
      </tr>
    );
  }

  render() {
    if (!this.cert) {
      return null;
    }

    return (
      <table>
        {this.renderRowTitle('PEM')}
        <tr>
          <td colSpan={2}>
            <div
              class="pem_block stroke_grey_3_border b3 text_black monospace"
            >
              {this.cert.pem}
            </div>
          </td>
        </tr>

        {this.renderRowTitle('Basic Information')}
        {this.renderBasicInformation(this.cert)}

        {this.renderRowTitle('Public Key Info')}
        {this.renderRowValue('Algorithm', this.cert.publicKey.algorithm.name)}
        {this.renderRowValue('Modulus Bits', this.cert.publicKey.algorithm.modulusBits)}
        {this.renderRowValue('Public Exponent', this.cert.publicKey.algorithm.publicExponent)}
        {this.renderRowValue('Named Curve', this.cert.publicKey.algorithm.namedCurve)}
        {this.renderRowValue('Value', this.cert.publicKey.value, true)}

        {this.renderRowTitle('Signature')}
        {this.renderRowValue('Algorithm', this.cert.signature.algorithm.name)}
        {this.renderRowValue('Hash', this.cert.signature.algorithm.hash)}
        {this.renderRowValue('Value', this.cert.signature.value, true)}

        {this.renderRowTitle('Extensions')}
        {this.cert.extensions.map((extension) => ([
          this.renderRowValue('Name', extension.name ? `${extension.name} (${extension.oid})` : extension.oid),
          this.renderRowValue('Critical', String(extension.critical)),
          this.renderRowExtensionValue(extension),
          <tr>
            <td colSpan={2} class="divider">
              <span class="fill_grey_3_opacity_border"></span>
            </td>
          </tr>,
        ]))}
      </table>
    );
  }
}
