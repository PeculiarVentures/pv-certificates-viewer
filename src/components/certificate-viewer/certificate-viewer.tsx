import { Component, h, Prop } from '@stencil/core';
import { Certificate, TExtension, EnumOIDs } from '../../utils/crypto';

@Component({
  tag: 'pv-certificate-viewer',
  styleUrls: [
    '../../styles/reset.css',
    '../../styles/system.css',
    'certificate-viewer.css',
  ],
  shadow: true,
})
export class CertificateViewer {
  certificateDecoded: Certificate;
  certificateDecodeError: Error;

  /**
   * The certificate value for decode and show details. Use PEM or DER format.
   */
  @Prop() certificate: string;

  componentWillLoad() {
    if (this.certificate) {
      try {
        this.certificateDecoded = new Certificate(this.certificate, undefined, true);
      } catch (error) {
        this.certificateDecodeError = error;
      }
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

  renderRowValue(title: string, value: string | number | any[], valueMonospace?: boolean, collapseValue?: boolean) {
    if (
      typeof value !== 'string'
      && typeof value !== 'number'
      && !Array.isArray(value)
    ) {
      return null;
    }

    let valueElem;

    if (collapseValue) {
      valueElem = (
        <pv-text-hider>
          {value}
        </pv-text-hider>
      );
    } else {
      valueElem = Array.isArray(value)
        ? value
        : value.toString();
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
          {valueElem}
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
                    <a
                      class="text_secondary"
                      href={valuePoint.value}
                      target="_blank"
                    >
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
                  {value.accessMethod}: <a class="text_secondary" href={accessLocation.value} target="_blank">{accessLocation.value}</a>
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
                    <a
                      class="text_secondary"
                      href={`https://censys.io/ipv4?q=${value.value}`}
                      target="_blank"
                    >
                      {value.value}
                    </a>
                  </p>
                );
              }

              if (value.type === 7) {
                return (
                  <p class="b3">
                    <a
                      class="text_secondary"
                      href={`https://censys.io/ipv4?q=${value.value}`}
                      target="_blank"
                    >
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
                    <a
                      class="text_secondary"
                      href={`https://censys.io/ipv4?q=${value.value}`}
                      target="_blank"
                    >
                      {value.value}
                    </a>
                  </p>
                );
              }

              if (value.type === 7) {
                return (
                  <p class="b3">
                    <a
                      class="text_secondary"
                      href={`https://censys.io/ipv4?q=${value.value}`}
                      target="_blank"
                    >
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

  render() {
    if (this.certificateDecodeError) {  
      return (
        <div class="status_wrapper">
          <p class="b1 interaction_text">
            There is error for certificate decode.
          </p>
        </div>
      )
    }

    if (!this.certificateDecoded) {
      return (
        <div class="status_wrapper">
          <p class="b1 interaction_text">
            There is no certificate specified.
          </p>
        </div>
      )
    }

    return (
      <table>
        {this.renderRowTitle('Basic Information')}
        <tr>
          <td colSpan={2}>
            <pv-certificate-summary certificate={this.certificateDecoded} />
          </td>
        </tr>

        {this.renderRowTitle('Public Key Info')}
        {this.renderRowValue('Algorithm', this.certificateDecoded.publicKey.algorithm.name)}
        {this.renderRowValue('Modulus Bits', this.certificateDecoded.publicKey.algorithm.modulusBits)}
        {this.renderRowValue('Public Exponent', this.certificateDecoded.publicKey.algorithm.publicExponent)}
        {this.renderRowValue('Named Curve', this.certificateDecoded.publicKey.algorithm.namedCurve)}
        {this.renderRowValue('Value', this.certificateDecoded.publicKey.value, true, true)}

        {this.renderRowTitle('Signature')}
        {this.renderRowValue('Algorithm', this.certificateDecoded.signature.algorithm.name)}
        {this.renderRowValue('Hash', this.certificateDecoded.signature.algorithm.hash)}
        {this.renderRowValue('Value', this.certificateDecoded.signature.value, true, true)}

        {this.renderRowTitle('Extensions')}
        {this.certificateDecoded.extensions.map((extension) => ([
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
