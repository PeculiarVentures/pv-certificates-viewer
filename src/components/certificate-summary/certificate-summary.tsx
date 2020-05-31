import { Component, Host, h, Prop } from '@stencil/core';

import { X509Certificate } from '../../utils/crypto';
import * as dateFormatter from '../../utils/dateFormatter';

@Component({
  tag: 'peculiar-certificate-summary',
  styleUrl: 'certificate-summary.scss',
  scoped: true,
})

export class CertificateSummary {
  @Prop() certificate: X509Certificate;

  @Prop() showIssuer?: boolean = true;
  /**
   * Issuer DN link.
   * NOTE: HTML component attribute must be `issuer-dn-link`.
   */
  @Prop() issuerDnLink?: string;

  /**
   * Choose view type instead @media.
   */
  @Prop() view?: 'mobile';

  renderDN(item: X509Certificate['subject'] | X509Certificate['issuer']) {
    return Object.keys(item).map((keyName) => {
      return (
        <tr class="dn_row">
          <td class="dn_name">
            <peculiar-typography>
              {keyName}
            </peculiar-typography>
          </td>
          <td class="dn_value">
            <peculiar-typography>
              {item[keyName].value}
            </peculiar-typography>
          </td>
        </tr>
      );
    });
  }

  renderMetaData(item: X509Certificate) {
    return ([
      <div class="meta_row">
        <peculiar-typography
          class="meta_name"
          color="grey_5"
        >
          Serial number:
        </peculiar-typography>
        <peculiar-typography
          class="meta_value"
          monospace={true}
        >
          {item.serialNumber}
        </peculiar-typography>
      </div>,
      <div class="meta_row">
        <peculiar-typography
          class="meta_name"
          color="grey_5"
        >
          Version:
        </peculiar-typography>
        <peculiar-typography
          class="meta_value"
        >
          {item.version}
        </peculiar-typography>
      </div>,
      <div class="meta_row">
        <peculiar-typography
          class="meta_name"
          color="grey_5"
        >
          Validity:
        </peculiar-typography>
        <peculiar-typography
          class="meta_value"
        >
          {item.validity}
        </peculiar-typography>
      </div>,
      <div class="meta_row">
        <peculiar-typography
          class="meta_name"
          color="grey_5"
        >
          Issued:
        </peculiar-typography>
        <peculiar-typography
          class="meta_value"
        >
          {dateFormatter.short(item.notBefore)}
        </peculiar-typography>
      </div>,
      <div class="meta_row">
        <peculiar-typography
          class="meta_name"
          color="grey_5"
        >
          Expired:
        </peculiar-typography>
        <peculiar-typography
          class="meta_value"
        >
          {dateFormatter.short(item.notAfter)}
        </peculiar-typography>
      </div>,
    ]);
  }

  render() {
    return (
      <Host
        data-view={this.view}
      >
        <div
          class={{
            basic_wrapper: true,
            is_only: !this.showIssuer,
          }}
        >
          <div class="basic_col">
            <peculiar-typography
              class="dn_row"
              color="grey_5"
            >
              Subject DN:
            </peculiar-typography>
            <table class="table_attributes">
              <tbody>
                {this.renderDN(this.certificate.subject)}
              </tbody>
            </table>
          </div>
          {this.showIssuer && (
            <div class="basic_col peculiar_stroke_grey_3">
              <peculiar-typography
                class="dn_row"
                color="grey_5"
              >
                {this.issuerDnLink ? (
                  <a href={this.issuerDnLink} target="_blank" class="peculiar_color_primary">
                    Issuer DN
                  </a>
                ) : (
                  'Issuer DN'
                )}:
              </peculiar-typography>
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
