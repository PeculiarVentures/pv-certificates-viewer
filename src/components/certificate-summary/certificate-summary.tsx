import { Component, Host, h, Prop } from '@stencil/core';

import { Certificate } from '../../utils/crypto';
import * as dateFormatter from '../../utils/dateFormatter';

@Component({
  tag: 'peculiar-certificate-summary',
  styleUrl: 'certificate-summary.css',
  shadow: true,
})

export class CertificateSummary {
  @Prop() certificate: Certificate;
  @Prop() showIssuer?: boolean = true;
  /**
   * Issuer DN link.
   * NOTE: HTML component attribute must be `issuer-dn-link`.
   */
  @Prop() issuerDnLink?: string;

  renderDN(item: Certificate['subject'] | Certificate['issuer']) {
    return Object.keys(item).map((keyName) => {
      return (
        <tr class="dn_row">
          <td class="dn_name b3 text_black">{keyName}</td>
          <td class="dn_value b3 text_black">{item[keyName].value}</td>
        </tr>
      );
    });
  }

  renderMetaData(item: Certificate) {
    return ([
      <p class="meta_row">
        <span class="meta_name text_grey b3">Serial number:</span>
        <span class="meta_value b3 text_black monospace">
          {item.serialNumber}
        </span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey b3">Version:</span>
        <span class="meta_value b3 text_black">
          {item.version}
        </span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey b3">Validity:</span>
        <span class="meta_value b3 text_black">
          {item.validity}
        </span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey b3">Issued:</span>
        <span class="meta_value b3 text_black">
          {dateFormatter.short(item.notBefore)}
        </span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey b3">Expired:</span>
        <span class="meta_value b3 text_black">
          {dateFormatter.short(item.notAfter)}
        </span>
      </p>,
    ]);
  }

  render() {
    return (
      <Host>
        <div class={{
          basic_wrapper: true,
          is_only: !this.showIssuer,
        }}>
          <div class="basic_col">
            <p class="text_grey b3 dn_row">
              Subject DN:
            </p>
            <table class="table_attributes">
              <tbody>
                {this.renderDN(this.certificate.subject)}
              </tbody>
            </table>
          </div>
          {this.showIssuer && (
            <div class="basic_col stroke_border">
              <p class="text_grey b3 dn_row">
                {this.issuerDnLink ? (
                  <a href={this.issuerDnLink} target="_blank" class="text_primary">
                    Issuer DN
                  </a>
                ) : (
                  'Issuer DN'
                )}:
              </p>
              <table class="table_attributes">
                <tbody>
                  {this.renderDN(this.certificate.issuer)}
                </tbody>
              </table>
            </div>
          )}
          <div class="basic_meta">
            {this.renderMetaData(this.certificate)}
          </div>
        </div>
      </Host>
    );
  }
}
