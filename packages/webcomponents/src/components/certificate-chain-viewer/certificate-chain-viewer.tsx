/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component,
  h,
  Prop,
  State,
  Host,
} from '@stencil/core';
import { X509Certificates } from '../../crypto';
import { Typography } from '../typography';
import { Miscellaneous } from '../certificate-details-parts';

@Component({
  tag: 'peculiar-certificate-chain-viewer',
  styleUrl: 'certificate-chain-viewer.scss',
  shadow: true,
})
export class CertificateChainViewer {
  /**
   * The certificate value for decode and show details. Use PEM or DER.
   */
  @Prop({ reflect: true }) certificates: X509Certificates;

  /**
   * If `true` - component will show split-button to download certificate as PEM or DER.
   */
  @Prop({ reflect: true }) download?: boolean;

  @State() selectedCertificateIndex = 0;

  private renderEmptyState() {
    return (
      <div class="status_wrapper">
        <Typography>
          There is no certificates available.
        </Typography>
      </div>
    );
  }

  render() {
    if (!this.certificates) {
      return this.renderEmptyState();
    }

    return (
      <Host>
        <div
          role="tablist"
          class="tabs"
        >
          {Array.from(this.certificates).map((certificate, index) => (
            <button
              type="button"
              role="tab"
              class="tab"
              aria-selected={index === this.selectedCertificateIndex ? 'true' : 'false'}
              onClick={() => {
                this.selectedCertificateIndex = index;
              }}
            >
              {certificate.commonName}
            </button>
          ))}
        </div>
        {Array.from(this.certificates).map((certificate, index) => {
          if (index === this.selectedCertificateIndex) {
            return (
              <peculiar-certificate-viewer
                certificate={certificate}
                download={false}
              />
            );
          }

          return null;
        })}

        <table>
          {this.download && (
            <Miscellaneous
              certificate={this.certificates}
            />
          )}
        </table>
      </Host>
    );
  }
}
