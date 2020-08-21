import {
  Component, Host, h, Prop, State,
} from '@stencil/core';

import {
  X509AttributeCertificate,
} from '../../crypto';

import { Signature } from '../certificate-viewer/signature';
import { Thumbprints } from '../certificate-viewer/thumbprints';
import { Extensions } from '../certificate-viewer/extensions';
import { RowTitle, RowValue } from '../certificate-viewer/row';
import * as dateFormatter from '../../utils/date_formatter';

@Component({
  tag: 'peculiar-attribute-certificate-viewer',
  styleUrl: 'attribute-certificate-viewer.scss',
  scoped: true,
})
export class AttributeCertificateViewer {
  certificateDecoded: X509AttributeCertificate;

  certificateDecodeError: Error;

  @Prop() certificate: string;

  @State() isDecodeInProcess: boolean = true;

  componentWillLoad() {
    this.decodeCertificate(this.certificate);
  }

  private async decodeCertificate(certificate: string) {
    this.isDecodeInProcess = true;

    try {
      this.certificateDecoded = new X509AttributeCertificate(certificate);

      this.certificateDecoded.parseExtensions();
      await this.certificateDecoded.getThumbprint('SHA-1');
      await this.certificateDecoded.getThumbprint('SHA-256');
    } catch (error) {
      this.certificateDecodeError = error;

      console.error('Error certificate parse:', error);
    }

    this.isDecodeInProcess = false;
  }

  // eslint-disable-next-line class-methods-use-this
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

  // eslint-disable-next-line class-methods-use-this
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
      <Host>
        <table>
          <RowTitle
            value="Basic Information"
          />
          <RowValue
            name="Serial number:"
            value={this.certificateDecoded.serialNumber}
          />
          <RowValue
            name="Version:"
            value={this.certificateDecoded.version}
          />
          <RowValue
            name="Validity:"
            value={this.certificateDecoded.validity}
          />
          <RowValue
            name="Issued:"
            value={dateFormatter.short(this.certificateDecoded.notBefore)}
          />
          <RowValue
            name="Expired:"
            value={dateFormatter.short(this.certificateDecoded.notBefore)}
          />

          <Signature
            signature={this.certificateDecoded.signature}
          />

          <Thumbprints
            thumbprints={this.certificateDecoded.thumbprints}
          />

          <Extensions
            extensions={this.certificateDecoded.extensions}
            getLEILink={() => ''}
            getDNSNameLink={() => ''}
            getIPAddressLink={() => ''}
            getAuthKeyIdParentLink={() => ''}
            getAuthKeyIdSiblingsLink={() => ''}
            getSubjectKeyIdChildrenLink={() => ''}
            getSubjectKeyIdSiblingsLink={() => ''}
          />
        </table>
      </Host>
    );
  }
}
