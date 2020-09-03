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
  shadow: true,
})

export class CertificateSummary {
  @Prop() certificate: X509Certificate;

  @Prop() showIssuer?: boolean = true;

  // eslint-disable-next-line class-methods-use-this
  renderRow(name: string, value: string | number, monospace?: boolean) {
    return (
      <tr>
        <td>
          <peculiar-typography
            color="grey_5"
          >
            {name}
            :
          </peculiar-typography>
        </td>
        <td>
          <peculiar-typography
            class="meta_value"
            monospace={monospace}
          >
            {value}
          </peculiar-typography>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <Host>
        <table>
          <tbody>
            {this.renderRow('Subject Name', this.certificate.subjectToString())}
            {this.showIssuer && this.renderRow('Issuer Name', this.certificate.issuerToString())}

            {this.renderRow('Serial Number', this.certificate.serialNumber, true)}
            {this.renderRow('Version', this.certificate.version)}
            {this.renderRow('Validity', this.certificate.validity)}
            {this.renderRow('Issued', dateShort(this.certificate.notBefore))}
            {this.renderRow('Expired', dateShort(this.certificate.notAfter))}
          </tbody>
        </table>
      </Host>
    );
  }
}
