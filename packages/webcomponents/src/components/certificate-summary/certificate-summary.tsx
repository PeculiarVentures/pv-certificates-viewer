/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component, Host, h, Prop,
} from '@stencil/core';

import type { X509Certificate } from '../../crypto';
import { dateShort } from '../../utils';

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
   * **NOTE**: HTML component attribute must be `issuer-dn-link`.
   */
  @Prop({ reflect: true }) issuerDnLink?: string;

  // eslint-disable-next-line class-methods-use-this
  renderDN(dns: X509Certificate['subject'] | X509Certificate['issuer']) {
    return dns.map((dn) => (
      <tr
        class="dn_row"
      >
        <td class="dn_name">
          <peculiar-typography
            color="grey_5"
          >
            {dn.shortName || dn.type}
          </peculiar-typography>
        </td>
        <td class="dn_value">
          <peculiar-typography>
            {dn.value}
          </peculiar-typography>
        </td>
      </tr>
    ));
  }

  // eslint-disable-next-line class-methods-use-this
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
          monospace
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
          {dateShort(item.notBefore)}
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
          {dateShort(item.notAfter)}
        </peculiar-typography>
      </div>,
    ]);
  }

  render() {
    return (
      <Host>
        <div
          class={{
            basic_wrapper: true,
            is_only: !this.showIssuer,
          }}
        >
          <div class="basic_col">
            <peculiar-typography
              class="dn_row"
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
              {this.issuerDnLink ? (
                <peculiar-link
                  href={this.issuerDnLink}
                  class="dn_row"
                >
                  Issuer DN:
                </peculiar-link>
              ) : (
                <peculiar-typography
                  class="dn_row"
                >
                  Issuer DN:
                </peculiar-typography>
              )}
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
