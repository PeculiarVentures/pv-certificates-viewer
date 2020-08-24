import {
  Component, Host, h, Prop, State,
} from '@stencil/core';
import { Convert } from 'pvtsutils';

import {
  X509AttributeCertificate,
} from '../../crypto';

import { Signature } from '../certificate-viewer/signature';
import { Attributes } from '../certificate-viewer/attributes';
import { Thumbprints } from '../certificate-viewer/thumbprints';
import { Extensions } from '../certificate-viewer/extensions';
import { GeneralNamePart } from '../certificate-viewer/extensions/general_name_part';
import { RowTitle, RowValue } from '../certificate-viewer/row';
import * as dateFormatter from '../../utils/date_formatter';
import { getStringByOID } from '../certificate-viewer/get_string_by_oid';

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
      this.certificateDecoded.parseAttributes();
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
            name="Serial number"
            value={this.certificateDecoded.serialNumber}
          />
          <RowValue
            name="Version"
            value={this.certificateDecoded.version}
          />
          <RowValue
            name="Validity"
            value={this.certificateDecoded.validity}
          />
          <RowValue
            name="Issued"
            value={dateFormatter.short(this.certificateDecoded.notBefore)}
          />
          <RowValue
            name="Expired"
            value={dateFormatter.short(this.certificateDecoded.notBefore)}
          />

          <RowTitle
            value="Issuer"
          />
          {this.certificateDecoded.issuer.map((item) => (
            <GeneralNamePart
              generalName={item}
              getDNSNameLink={() => ''}
              getIPAddressLink={() => ''}
            />
          ))}

          <RowTitle
            value="Holder"
          />
          {this.certificateDecoded.holder?.baseCertificateID.issuer.map((item) => (
            <GeneralNamePart
              generalName={item}
              getDNSNameLink={() => ''}
              getIPAddressLink={() => ''}
            />
          ))}
          <tr>
            <td />
            <td />
          </tr>
          <RowValue
            name="Serial"
            value={Convert.ToHex(this.certificateDecoded.holder?.baseCertificateID.serial)}
            monospace
          />
          <tr>
            <td />
            <td />
          </tr>
          <RowValue
            name="Digest Info"
            value=""
          />
          <RowValue
            name="Algorithm"
            value={getStringByOID(this.certificateDecoded.holder?.objectDigestInfo.digestAlgorithm.algorithm)}
          />
          <RowValue
            name="Value"
            value={Convert.ToHex(this.certificateDecoded.holder?.objectDigestInfo.objectDigest)}
            monospace
          />
          <RowValue
            name="Type"
            value={this.certificateDecoded.holder?.objectDigestInfo.digestedObjectType}
          />

          <Signature
            signature={this.certificateDecoded.signature}
          />

          <Thumbprints
            thumbprints={this.certificateDecoded.thumbprints}
          />

          <Attributes
            attributes={this.certificateDecoded.attributes}
            getLEILink={() => ''}
            getDNSNameLink={() => ''}
            getIPAddressLink={() => ''}
            getAuthKeyIdParentLink={() => ''}
            getAuthKeyIdSiblingsLink={() => ''}
            getSubjectKeyIdChildrenLink={() => ''}
            getSubjectKeyIdSiblingsLink={() => ''}
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
