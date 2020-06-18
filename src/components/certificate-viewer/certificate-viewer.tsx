import { Component, h, Prop, State, Watch, Host } from '@stencil/core';

import {
  Certificate,
  TExtension,
  EnumOIDs,
  IExtensionAuthorityKeyIdentifier,
  IExtensionSubjectKeyIdentifier,
  IExtensionLEI,
} from '../../utils/crypto';
import validator from '../../utils/validator';
import * as dateFormatter from '../../utils/dateFormatter';

export type CertificateProp = string | Certificate;

@Component({
  tag: 'peculiar-certificate-viewer',
  styleUrl: 'certificate-viewer.scss',
  scoped: true,
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

  /**
   * Choose view type instead @media.
   */
  @Prop() view?: 'mobile';

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

  private getLEILink(extension: IExtensionLEI) {
    return `https://www.gleif.org/lei/${extension.value}`;
  }

  private renderRowTitle(title: string) {
    return (
      <tr class="title">
        <td colSpan={2}>
          <peculiar-typography
            type="h6"
          >
            {title}
          </peculiar-typography>
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
        <peculiar-text-hider>
          {value}
        </peculiar-text-hider>
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
            vertical_align_top: options.align !== 'middle',
            vertical_align_middle: options.align === 'middle',
          }}
        >
          <peculiar-typography
            color="grey_5"
          >
            {title}:
          </peculiar-typography>
        </td>
        <td
          class={{
            monospace: options.monospace,
          }}
        >
          <peculiar-typography
            monospace={options.monospace}
          >
            {valueElem}
          </peculiar-typography>
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
            <peculiar-typography>
              {value.name} ({value.oid})
            </peculiar-typography>
          )),
        );
      }

      case EnumOIDs.CertificatePolicies: {
        return [
          extension.value.policies.map((value, index) => (
            this.renderRowValue(
              `Policy ${index + 1}`,
              [
                <peculiar-typography>
                  {value.name} ({value.oid})
                </peculiar-typography>,
              ],
            )
          )),
          extension.value.qualifiers.map((value, index) => (
            this.renderRowValue(
              `Qualifier ${index + 1}`,
              [
                <peculiar-typography>
                  {value.name} ({value.oid})
                </peculiar-typography>,
                validator.isUrl(value.value) ? (
                  <a
                    class="peculiar_color_primary"
                    href={value.value}
                    target="_blank"
                  >
                      {value.value}
                  </a>
                ) : (
                  <peculiar-typography>
                    {value.value}
                  </peculiar-typography>
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
                  <peculiar-typography>
                    <a
                      class="peculiar_color_primary"
                      href={valuePoint.value}
                      target="_blank"
                    >
                      {valuePoint.value}
                    </a>
                  </peculiar-typography>
                );
              }

              return (
                <peculiar-typography>
                  {valuePoint.value}
                </peculiar-typography>
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
                <peculiar-typography>
                  {value.name} ({value.oid})
                </peculiar-typography>,
                value.type === 6 ? (
                  <a class="peculiar_color_primary" href={value.value} target="_blank">
                    {value.value}
                  </a>
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
                  <peculiar-typography>
                    <a
                      class="peculiar_color_primary"
                      href={`https://censys.io/ipv4?q=${value.value}`}
                      target="_blank"
                    >
                      {value.value}
                    </a>
                  </peculiar-typography>
                );
              }

              if (value.type === 7) {
                return (
                  <peculiar-typography>
                    <a
                      class="peculiar_color_primary"
                      href={`https://censys.io/ipv4?q=${value.value}`}
                      target="_blank"
                    >
                      {value.value}
                    </a>
                  </peculiar-typography>
                );
              }

              if (value.type === 4) {
                return (
                  <peculiar-typography>
                    {value.value
                      .map(valueType => `${valueType.name}=${valueType.value}`).join(', ')
                    }
                  </peculiar-typography>
                );
              }

              return (
                <peculiar-typography>
                  {value.value}
                </peculiar-typography>
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
                  <peculiar-typography>
                    <a
                      class="peculiar_color_primary"
                      href={`https://censys.io/ipv4?q=${value.value}`}
                      target="_blank"
                    >
                      {value.value}
                    </a>
                  </peculiar-typography>
                );
              }

              if (value.type === 7) {
                return (
                  <peculiar-typography>
                    <a
                      class="peculiar_color_primary"
                      href={`https://censys.io/ipv4?q=${value.value}`}
                      target="_blank"
                    >
                      {value.value}
                    </a>
                  </peculiar-typography>
                );
              }

              if (value.type === 4) {
                return (
                  <peculiar-typography>
                    {value.value
                      .map(valueType => `${valueType.name}=${valueType.value}`).join(', ')
                    }
                  </peculiar-typography>
                );
              }

              return (
                <peculiar-typography>
                  {value.value}
                </peculiar-typography>
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
                  &nbsp;[<a class="peculiar_color_primary" href={parentLink} target="_blank">
                    parents
                  </a>]
                </span>
              ),
              siblingsLink && (
                <span>
                  &nbsp;[<a class="peculiar_color_primary" href={siblingsLink} target="_blank">
                    siblings
                  </a>]
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
                &nbsp;[<a class="peculiar_color_primary" href={childrenLink} target="_blank">
                  children
                </a>]
              </span>
            ),
            siblingsLink && (
              <span>
                &nbsp;[<a class="peculiar_color_primary" href={siblingsLink} target="_blank">
                  siblings
                </a>]
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
              <peculiar-typography>
                {statement.name} ({statement.oid})
              </peculiar-typography>,
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

      case EnumOIDs.SubjectDirectoryAttributes: {
        return extension.value.map((attribute, index) => (
          this.renderRowValue(
            `Attribute ${index + 1}`,
            [
              <peculiar-typography>
                {attribute.name} ({attribute.oid})
              </peculiar-typography>,
              attribute.value.map(value => (
                <peculiar-typography>
                  {dateFormatter.short(value)}
                </peculiar-typography>
              )),
            ],
          )
        ));
      }

      case EnumOIDs.AdobeTimestamp: {
        return [
          this.renderRowValue(
            'Version',
            extension.value.version,
          ),
          this.renderRowValue(
            'Location',
            [(
              <a class="peculiar_color_primary" href={extension.value.location} target="_blank">
                {extension.value.location}
              </a>
            )],
          ),
          this.renderRowValue(
            'Require Auth',
            (extension.value.requiresAuth || false).toString(),
          ),
        ];
      }

      case EnumOIDs.LEI: {
        const leiLink = this.getLEILink(extension);

        return this.renderRowValue(
          'Value',
          [(
            <a class="peculiar_color_primary" href={leiLink} target="_blank">
              {extension.value}
            </a>
          )],
        );
      }

      case EnumOIDs.Role: {
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
          <peculiar-button-split
            onClick={this.certificateDecoded.downloadAsPEM.bind(this)}
            actions={[{
              text: 'Download DER',
              onClick: this.certificateDecoded.downloadAsDER.bind(this),
            }]}
          >
            Download PEM
          </peculiar-button-split>
        )],
        { align: 'middle' },
      ),
    ];
  }

  private renderExtensions() {
    if (!this.certificateDecoded.extensions.length) {
      return null;
    }

    return [
      this.renderRowTitle('Extensions'),
      this.certificateDecoded.extensions.map(extension => ([
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
      ])),
    ];
  }

  private renderErrorState() {
    return (
      <div class="status_wrapper">
        <peculiar-typography
          type="b1"
          class="interaction_text"
        >
          There is error for certificate decode.
        </peculiar-typography>
      </div>
    );
  }

  private renderEmptyState() {
    return (
      <div class="status_wrapper">
        <peculiar-typography
          type="b1"
          class="interaction_text"
        >
          There is no certificate available.
        </peculiar-typography>
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
      <Host
        data-view={this.view}
      >
        <table>
          {this.renderRowTitle('Basic Information')}
          <tr>
            <td colSpan={2}>
              <peculiar-certificate-summary
                certificate={this.certificateDecoded}
                issuerDnLink={this.issuerDnLink}
                view={this.view}
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
          {this.renderRowValue(
            'Named Curve',
            this.certificateDecoded.publicKey.algorithm.namedCurve,
          )}
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

          {this.renderExtensions()}

          {this.renderMiscellaneous()}
        </table>
      </Host>
    );
  }
}
