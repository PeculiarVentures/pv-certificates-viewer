import { Component, h, Prop, State, Watch } from '@stencil/core';

import {
  Certificate,
  TExtension,
  EnumOIDs,
  IExtensionAuthorityKeyIdentifier,
  IExtensionSubjectKeyIdentifier,
} from '../../utils/crypto';
import validator from '../../utils/validator';
import * as dateFormatter from '../../utils/date_formatter';

export type CertificateProp = string | Certificate;

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
   * The certificate value for decode and show details. Use PEM or DER.
   */
  @Prop() certificate: CertificateProp;
  /**
   * If `true` - component will show split-button to download certificate as PEM or DER.
   */
  @Prop() download?: boolean;
  /**
   * Authority Key Identifier extension parent link.
   * <br />
   * **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.
   * @example
   *  https://censys.io/certificates?q=parsed.extensions.subject_key_id:%20{{authKeyId}}
   */
  @Prop() authKeyIdParentLink?: string;
  /**
   * Authority Key Identifier extension siblings link.
   * <br />
   * **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.
   * @example
   *  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{authKeyId}}
   */
  @Prop() authKeyIdSiblingsLink?: string;
  /**
   * Subject Key Identifier extension children link.
   * <br />
   * **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
   * @example
   *  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{subjectKeyId}}
   */
  @Prop() subjectKeyIdChildrenLink?: string;
  /**
   * Subject Key Identifier extension siblings link.
   * <br />
   * **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
   * @example
   *  https://some.com/{{subjectKeyId}}
   */
  @Prop() subjectKeyIdSiblingsLink?: string;
  /**
   * Issuer DN link.
   */
  @Prop() issuerDnLink?: string;

  @State() isDecodeInProcess: boolean = true;

  componentWillLoad() {
    this.decodeCertificate(this.certificate);
  }

  private async decodeCertificate(certificate: CertificateProp) {
    this.isDecodeInProcess = true;

    if (certificate instanceof Certificate) {
      this.certificateDecoded = certificate;
    }

    if (typeof certificate === 'string') {
      try {
        this.certificateDecoded = new Certificate(certificate, undefined, true);
      } catch (error) {
        this.certificateDecodeError = error;

        console.error(error);
      }
    }

    if (this.certificateDecoded) {
      await this.certificateDecoded.getFingerprint('SHA-1');
      await this.certificateDecoded.getFingerprint('SHA-256');
    }

    this.isDecodeInProcess = false;
  }

  /**
   * Rerun decodeCertificate if previuos value not equal current value
   */
  @Watch('certificate')
  watchCertificateAndDecode(newValue: CertificateProp, oldValue: CertificateProp) {
    if (typeof newValue === 'string' && typeof oldValue === 'string') {
      if (newValue !== oldValue) {
        this.decodeCertificate(newValue);
      }

      return;
    }

    if (newValue instanceof Certificate && oldValue instanceof Certificate) {
      if (newValue.serialNumber !== oldValue.serialNumber) {
        this.decodeCertificate(newValue);
      }
    }
  }

  private getAuthKeyIdParentLink(extension: IExtensionAuthorityKeyIdentifier) {
    return this.authKeyIdParentLink
      ?.replace('{{authKeyId}}', extension.value.keyIdentifier);
  }

  private getAuthKeyIdSiblingsLink(extension: IExtensionAuthorityKeyIdentifier) {
    return this.authKeyIdSiblingsLink
      ?.replace('{{authKeyId}}', extension.value.keyIdentifier);
  }

  private getSubjectKeyIdChildrenLink(extension: IExtensionSubjectKeyIdentifier) {
    return this.subjectKeyIdChildrenLink
      ?.replace('{{subjectKeyId}}', extension.value);
  }

  private getSubjectKeyIdSiblingsLink(extension: IExtensionSubjectKeyIdentifier) {
    return this.subjectKeyIdSiblingsLink
      ?.replace('{{subjectKeyId}}', extension.value);
  }

  private renderRowTitle(title: string) {
    return (
      <tr class="title">
        <td colSpan={2} class="h6 text_black">
          {title}
        </td>
      </tr>
    );
  }

  private renderRowValue(
    title: string,
    value: string | number | any[],
    options: { monospace?: boolean; collapse?: boolean; align?: 'middle' } = {},
  ) {
    if (
      typeof value !== 'string'
      && typeof value !== 'number'
      && !Array.isArray(value)
    ) {
      return null;
    }

    let valueElem;

    if (options.collapse) {
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
        <td
          class={{
            b3: true,
            text_grey: true,
            vertical_align_top: options.align !== 'middle',
            vertical_align_middle: options.align === 'middle',
          }}
        >
          {title}:
        </td>
        <td
          class={{
            b3: true,
            text_black: true,
            monospace: options.monospace,
          }}
        >
          {valueElem}
        </td>
      </tr>
    );
  }

  private renderRowExtensionValue(extension: TExtension) {
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
          extension.value.map(value => (
            <p class="b3 text_black">
              {value.name} ({value.oid})
            </p>
          )),
        );
      }

      case EnumOIDs.CertificatePolicies: {
        return [
          extension.value.policies.map((value, index) => (
            this.renderRowValue(
              `Policy ${index + 1}`,
              [
                <p>
                  {value.name} ({value.oid})
                </p>,
              ],
            )
          )),
          extension.value.qualifiers.map((value, index) => (
            this.renderRowValue(
              `Qualifier ${index + 1}`,
              [
                <p>
                  {value.name} ({value.oid})
                </p>,
                validator.isUrl(value.value) ? (
                  <a
                    class="text_primary"
                    href={value.value}
                    target="_blank"
                  >
                      {value.value}
                  </a>
                ) : (
                  <p>
                    {value.value}
                  </p>
                ),
              ],
            )
          )),
        ];
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
                      class="text_primary"
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
        return extension.value
          .map((value, index) => (
            this.renderRowValue(
              `Method ${index + 1}`,
              [
                <p>
                  {value.name} ({value.oid})
                </p>,
                value.type === 6 ? (
                  <a class="text_primary" href={value.value} target="_blank">{value.value}</a>
                ) : (
                  value.value
                ),
              ],
            )
          ));
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
                      class="text_primary"
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
                      class="text_primary"
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
                    {value.value
                      .map(valueType => `${valueType.name}=${valueType.value}`).join(', ')
                    }
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
                      class="text_primary"
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
                      class="text_primary"
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
                    {value.value
                      .map(valueType => `${valueType.name}=${valueType.value}`).join(', ')
                    }
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
        const parentLink = this.getAuthKeyIdParentLink(extension);
        const siblingsLink = this.getAuthKeyIdSiblingsLink(extension);

        return [
          this.renderRowValue(
            'Key Identifier',
            [
              <span>
                {extension.value.keyIdentifier}
              </span>,
              parentLink && (
                <span>
                  &nbsp;[<a class="text_primary" href={parentLink} target="_blank">parents</a>]
                </span>
              ),
              siblingsLink && (
                <span>
                  &nbsp;[<a class="text_primary" href={siblingsLink} target="_blank">siblings</a>]
                </span>
              ),
            ],
            { monospace: true },
          ),
          this.renderRowValue(
            'Authority Cert Issuer',
            extension.value.authorityCertIssuer,
          ),
          this.renderRowValue(
            'Authority Cert Serial Number',
            extension.value.authorityCertSerialNumber,
          ),
        ];
      }

      case EnumOIDs.CertificateTransparency: {
        return extension.value.map(timestamp => [
          <br />,
          this.renderRowValue(
            'Log ID',
            timestamp.logID,
            { monospace: true },
          ),
          this.renderRowValue(
            'Log Name',
            timestamp.name,
          ),
          this.renderRowValue(
            'Hash Algorithm',
            timestamp.hashAlgorithm.toUpperCase(),
          ),
          this.renderRowValue(
            'Signature Algorithm',
            timestamp.signatureAlgorithm.toUpperCase(),
          ),
          this.renderRowValue(
            'Timestamp',
            dateFormatter.short(timestamp.timestamp),
          ),
        ]);
      }

      case EnumOIDs.SubjectKeyIdentifier: {
        const childrenLink = this.getSubjectKeyIdChildrenLink(extension);
        const siblingsLink = this.getSubjectKeyIdSiblingsLink(extension);

        return this.renderRowValue(
          'Value',
          [
            <span>
              {extension.value}
            </span>,
            childrenLink && (
              <span>
                &nbsp;[<a class="text_primary" href={childrenLink} target="_blank">children</a>]
              </span>
            ),
            siblingsLink && (
              <span>
                &nbsp;[<a class="text_primary" href={siblingsLink} target="_blank">siblings</a>]
              </span>
            ),
          ],
          { monospace: true },
        );
      }

      case EnumOIDs.QualifiedCertificateStatements: {
        return extension.value.map((statement, index) => (
          this.renderRowValue(
            `Statement ${index + 1}`,
            [
              <p>
                {statement.name} ({statement.oid})
              </p>,
            ],
          )
        ));
      }

      case EnumOIDs.MicrosoftCARenewal: {
        return [
          this.renderRowValue(
            'Certificate Index',
            extension.value.certificateIndex,
          ),
          this.renderRowValue(
            'Key Index',
            extension.value.keyIndex,
          ),
        ];
      }

      case EnumOIDs.MicrosoftCertificateType: {
        return this.renderRowValue(
          'Value',
          extension.value,
        );
      }
    }

    if (typeof extension.value === 'string') {
      return this.renderRowValue(
        'Value',
        extension.value,
        { monospace: true },
      );
    }

    return this.renderRowValue('Value', extension.value);
  }

  private renderMiscellaneous() {
    if (!this.download) {
      return null;
    }

    return [
      this.renderRowTitle('Miscellaneous'),
      this.renderRowValue(
        'Download',
        [(
          <pv-button-split
            onClick={this.certificateDecoded.downloadAsPEM.bind(this)}
            actions={[{
              text: 'Download DER',
              onClick: this.certificateDecoded.downloadAsDER.bind(this),
            }]}
          >
            Download PEM
          </pv-button-split>
        )],
        { align: 'middle' },
      ),
    ];
  }

  private renderErrorState() {
    return (
      <div class="status_wrapper">
        <p class="b1 interaction_text text_black">
          There is error for certificate decode.
        </p>
      </div>
    );
  }

  private renderEmptyState() {
    return (
      <div class="status_wrapper">
        <p class="b1 interaction_text text_black">
          There is no certificate specified.
        </p>
      </div>
    );
  }

  render() {
    if (this.certificateDecodeError) {
      return this.renderErrorState();
    }

    if (!this.certificateDecoded) {
      return this.renderEmptyState();
    }

    return (
      <table>
        {this.renderRowTitle('Basic Information')}
        <tr>
          <td colSpan={2}>
            <pv-certificate-summary
              certificate={this.certificateDecoded}
              issuerDnLink={this.issuerDnLink}
            />
          </td>
        </tr>

        {this.renderRowTitle('Public Key Info')}
        {this.renderRowValue('Algorithm', this.certificateDecoded.publicKey.algorithm.name)}
        {this.renderRowValue(
          'Modulus Bits',
          this.certificateDecoded.publicKey.algorithm.modulusBits,
        )}
        {this.renderRowValue(
          'Public Exponent',
          this.certificateDecoded.publicKey.algorithm.publicExponent,
        )}
        {this.renderRowValue('Named Curve', this.certificateDecoded.publicKey.algorithm.namedCurve)}
        {this.renderRowValue(
          'Value',
          this.certificateDecoded.publicKey.value,
          { monospace: true, collapse: true },
        )}

        {this.renderRowTitle('Signature')}
        {this.renderRowValue('Algorithm', this.certificateDecoded.signature.algorithm.name)}
        {this.renderRowValue('Hash', this.certificateDecoded.signature.algorithm.hash)}
        {this.renderRowValue(
          'Value',
          this.certificateDecoded.signature.value,
          { monospace: true, collapse: true },
        )}

        {this.renderRowTitle('Fingerprints')}
        {this.renderRowValue(
          'SHA-256',
          this.certificateDecoded.fingerprints['SHA-256'],
          { monospace: true },
        )}
        {this.renderRowValue(
          'SHA-1',
          this.certificateDecoded.fingerprints['SHA-1'],
          { monospace: true },
        )}

        {this.renderRowTitle('Extensions')}
        {this.certificateDecoded.extensions.map(extension => ([
          this.renderRowValue(
            'Name',
            extension.name ? `${extension.name} (${extension.oid})` : extension.oid,
          ),
          this.renderRowValue('Critical', String(extension.critical)),
          this.renderRowExtensionValue(extension),
          <tr>
            <td colSpan={2} class="divider">
              <span class="bg_fill"></span>
            </td>
          </tr>,
        ]))}

        {this.renderMiscellaneous()}
      </table>
    );
  }
}
