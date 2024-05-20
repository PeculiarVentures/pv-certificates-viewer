/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component,
  Host,
  h,
  State,
  Prop,
  Event,
  EventEmitter,
} from '@stencil/core';

import { readAsBinaryString } from '../../utils';
import {
  X509Certificate,
  X509AttributeCertificate,
  Pkcs10CertificateRequest,
  X509Crl,
} from '../../crypto';
import { Button } from '../button';
import { Typography } from '../typography';

@Component({
  tag: 'peculiar-certificate-decoder',
  styleUrl: 'certificate-decoder.scss',
  shadow: true,
})
export class CertificateDecoder {
  private inputPaste?: HTMLTextAreaElement;

  /**
   * The example certificate value for decode and show details. Use PEM or DER.
   */
  @Prop() certificateExamples?: {
    title: string;
    value: string;
  }[];

  /**
   * The default certificate value for decode and show details. Use PEM or DER.
   */
  @Prop() defaultCertificate?: string;

  @State() certificateDecoded: X509Certificate
  | X509AttributeCertificate
  | Pkcs10CertificateRequest
  | X509Crl;

  /**
   * Emitted when the certificate has been successfully parsed.
   */
  @Event() successParse!: EventEmitter<string>;

  /**
   * Emitted when the certificate has been removed.
   */
  @Event() clearCertificate!: EventEmitter<void>;

  componentDidLoad() {
    if (this.defaultCertificate) {
      /**
       * Prevent Stencil warning about re-render
       */
      setTimeout(() => this.decode(this.defaultCertificate), 100);
    }
  }

  private handleClickDecode = () => {
    const { value } = this.inputPaste;

    if (value) {
      this.decode(value);
    }
  };

  private handleClickClear = () => {
    this.clearValue();
  };

  private handleChangeInputFile = async (event: any) => {
    const element = event.target;

    if (element.files) {
      const file = await readAsBinaryString(element.files[0]);

      if (typeof file.value === 'string') {
        this.decode(file.value);
      }

      element.value = '';
    }
  };

  private handleChangeExample = (event: any) => {
    if (event.target.value) {
      this.decode(event.target.value);
    } else {
      this.clearValue();
    }
  };

  private handleDropFile = async (event: any) => {
    event.stopPropagation();
    event.preventDefault();

    const element = event.dataTransfer;

    if (element.files) {
      const file = await readAsBinaryString(element.files[0]);

      if (typeof file.value === 'string') {
        this.decode(file.value);
      }
    }
  };

  clearValue() {
    this.inputPaste.value = '';
    this.certificateDecoded = null;
    this.clearCertificate.emit();
  }

  setValue(value: typeof this.certificateDecoded) {
    this.certificateDecoded = value;
    this.inputPaste.value = value.toString('pem');
    this.successParse.emit(value.toString('base64'));
  }

  decode(certificate: string) {
    new Promise((resolve) => {
      resolve(new X509Certificate(certificate));
    })
      .catch(() => new X509AttributeCertificate(certificate))
      .catch(() => new Pkcs10CertificateRequest(certificate))
      .catch(() => new X509Crl(certificate))
      .then((res: typeof this.certificateDecoded) => this.setValue(res))
      .catch((err) => {
        this.clearValue();

        console.log(err);
        alert('Error decoding file. Please try to use Certificate/AttributeCertificate/CertificateRequest/CRL.');
      });
  }

  render() {
    return (
      <Host>
        <textarea
          placeholder="Certificate DER or PEM"
          class="textarea t-b2 c-black"
          ref={(el) => { this.inputPaste = el; }}
          onDrop={this.handleDropFile}
        />
        <div class="controls">
          <div class="control_row">
            <Typography
              variant="b3"
              color="secondary-tint-2"
            >
              Drag or load file:
            </Typography>
            <input
              type="file"
              accept="application/pkix-cert,application/x-x509-ca-cert,application/x-x509-user-cert,application/pkcs10,application/pkix-crl,.csr,.req,.crl"
              onChange={this.handleChangeInputFile}
              value=""
            />
          </div>
          {this.certificateExamples?.length && (
            <div class="control_row">
              <Typography
                variant="b3"
                color="secondary-tint-2"
              >
                Load examples:
              </Typography>
              <select onChange={this.handleChangeExample}>
                <option value="">None</option>
                {this.certificateExamples.map((example) => (
                  <option value={example.value}>
                    {example.title}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div class="control_row">
            <Button
              onClick={this.handleClickDecode}
            >
              Decode
            </Button>
            <Button
              onClick={this.handleClickClear}
            >
              Clear
            </Button>
          </div>
        </div>
        {this.certificateDecoded instanceof X509Certificate && (
          <peculiar-certificate-viewer
            certificate={this.certificateDecoded}
            class="viewer"
            download
          />
        )}
        {this.certificateDecoded instanceof X509AttributeCertificate && (
          <peculiar-attribute-certificate-viewer
            certificate={this.certificateDecoded}
            class="viewer"
            download
          />
        )}
        {this.certificateDecoded instanceof Pkcs10CertificateRequest && (
          <peculiar-csr-viewer
            certificate={this.certificateDecoded}
            class="viewer"
            download
          />
        )}
        {this.certificateDecoded instanceof X509Crl && (
          <peculiar-crl-viewer
            certificate={this.certificateDecoded}
            class="viewer"
            download
          />
        )}
      </Host>
    );
  }
}
