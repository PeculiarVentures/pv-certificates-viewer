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
import { dateShort, l10n } from '../../utils';

@Component({
  tag: 'peculiar-certificate-summary',
  styleUrl: 'certificate-summary.scss',
  shadow: true,
})

export class CertificateSummary {
  @Prop() certificate: X509Certificate;

  @Prop() showIssuer?: boolean = true;

  // eslint-disable-next-line class-methods-use-this
  renderRow(name: string | string[], value: string | number, monospace?: boolean) {
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
            {this.renderRow(
              l10n.getString('subjectName'),
              this.certificate.subjectToString(),
            )}
            {this.showIssuer && this.renderRow(
              l10n.getString('issuerName'),
              this.certificate.issuerToString(),
            )}

            {this.renderRow(
              l10n.getString('serialNumber'),
              this.certificate.serialNumber,
              true,
            )}
            {this.renderRow(
              l10n.getString('version'),
              this.certificate.version,
            )}
            {this.renderRow(
              l10n.getString('validity'),
              this.certificate.validity,
            )}
            {this.renderRow(
              l10n.getString('issued'),
              dateShort(this.certificate.notBefore),
            )}
            {this.renderRow(
              l10n.getString('expired'),
              dateShort(this.certificate.notAfter),
            )}
          </tbody>
        </table>
      </Host>
    );
  }
}
