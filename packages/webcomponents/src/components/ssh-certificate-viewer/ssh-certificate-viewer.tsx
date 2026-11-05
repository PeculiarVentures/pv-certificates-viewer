/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, h, Prop, State, Watch } from '@stencil/core';
import { SshCertificate, type ISshCertificateJSON } from '../../crypto';
import { decodeIntoViewer, toDocument } from '../_shared/viewer/decode';
import { renderViewer } from '../_shared/viewer/render';
import { SshBasicInformation } from './-components/basic_information';
import { SshMiscellaneous } from './-components/miscellaneous';
import { SshPublicKey } from './-components/public_key';
import { SshSignatureKey } from './-components/signature_key';

export type TSshCertificateProp = string | SshCertificate;

type TDecoded = ISshCertificateJSON & { doc: SshCertificate };

@Component({
  tag: 'peculiar-ssh-certificate-viewer',
  styleUrl: '../certificate-viewer/certificate-viewer.scss',
  shadow: true,
})
export class SshCertificateViewer {
  @State() certificateDecoded?: TDecoded;

  @State() certificateDecodeError?: Error;

  /**
   * The certificate value for decode and show details. Use PEM or DER.
   */
  @Prop({ reflect: true }) certificate: TSshCertificateProp;

  /**
   * If `true` - component will show split-button to download certificate as PEM or DER.
   */
  @Prop({ reflect: true }) download?: boolean;

  componentWillLoad() {
    void this.decodeCertificate(this.certificate);
  }

  private decodeCertificate(certificate: TSshCertificateProp) {
    return decodeIntoViewer<TDecoded>(this, async () => {
      const doc = toDocument(certificate, SshCertificate);

      if (!doc) {
        return undefined;
      }

      await doc.decodeKeys();

      return { ...doc.toJSON(), doc };
    });
  }

  /**
   * Rerun decodeCertificate when the value changes
   */
  @Watch('certificate')
  watchCertificateAndDecode(newValue: TSshCertificateProp, oldValue: TSshCertificateProp) {
    if (newValue !== oldValue) {
      void this.decodeCertificate(newValue);
    }
  }

  render() {
    return renderViewer<TDecoded>({
      viewer: this,
      subject: 'certificate',
      body: (decoded) => [
        <SshBasicInformation {...decoded} />,
        <SshPublicKey key={decoded.publicKey} />,
        <SshSignatureKey key={decoded.signatureKey} />,
        this.download && <SshMiscellaneous certificate={decoded.doc} />,
      ],
    });
  }
}
