/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component, Host, h, State, Prop,
} from '@stencil/core';

import { validator, history, readAsBinaryString } from '../../utils';
import { X509Certificate, X509AttributeCertificate, CSR } from '../../crypto';

@Component({
  tag: 'peculiar-certificate-decoder',
  styleUrl: 'certificate-decoder.scss',
  scoped: true,
})
export class CertificateDecoder {
  private inputPaste?: HTMLTextAreaElement;

  /**
   * The example certificate value for decode and show details. Use PEM or DER.
   */
  @Prop() certificateExample?: string;

  @State() certificateDecoded: X509Certificate | X509AttributeCertificate | CSR;

  componentDidLoad() {
    const parsedHash = history.parseHash(window.location.search);

    if (parsedHash.cert) {
      /**
       * Prevent Stencil warning about re-render
       */
      setTimeout(() => this.decode(parsedHash.cert), 100);
    }
  }

  private onClickDecode = () => {
    const { value } = this.inputPaste;

    if (value) {
      this.decode(value);
    }
  };

  private onClickExample = () => {
    this.decode(this.certificateExample);
  };

  private onClickClear = () => {
    this.clearValue();
  };

  private onChangeInputFile = async (e: any) => {
    const element = e.target;

    if (element.files) {
      const file = await readAsBinaryString(element.files[0]);

      if (typeof file.value === 'string') {
        this.decode(file.value);
      }

      element.value = '';
    }
  };

  private onDropFile = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    const element = e.dataTransfer;

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

    history.replace({ search: '' });
  }

  setValue(value: X509Certificate | X509AttributeCertificate | CSR) {
    this.certificateDecoded = value;
    this.inputPaste.value = value.export('pem');

    history.replace({
      search: history.queryStringify({
        cert: value.export('base64'),
      }),
    });
  }

  decode(certificate: string) {
    const isPem = validator.isPem(certificate);
    const isX509Pem = validator.isX509Pem(certificate);
    const isPkcs10Pem = validator.isPkcs10Pem(certificate);
    const isX509AttributePem = validator.isX509AttributePem(certificate);
    let decoded: X509Certificate | X509AttributeCertificate | CSR;
    let decodeError: Error;

    if (isPem && !(isX509Pem || isX509AttributePem || isPkcs10Pem)) {
      this.clearValue();

      alert('Unsupported file type. Please try to use Certificate/AttributeCertificate/CertificateRequest.');

      return;
    }

    try {
      if (isX509Pem) {
        decoded = new X509Certificate(certificate);
      }

      if (isX509AttributePem) {
        decoded = new X509AttributeCertificate(certificate);
      }

      if (isPkcs10Pem) {
        decoded = new CSR(certificate);
      }
    } catch (error) {
      decodeError = error;
    }

    if (!decoded) {
      try {
        decoded = new X509Certificate(certificate);
      } catch (error) {
        decodeError = error;
      }
    }

    if (!decoded) {
      try {
        decoded = new X509AttributeCertificate(certificate);
      } catch (error) {
        decodeError = error;
      }
    }

    if (!decoded) {
      try {
        decoded = new CSR(certificate);
      } catch (error) {
        decodeError = error;
      }
    }

    if (!decoded) {
      this.clearValue();

      console.log(decodeError);
      alert('Error decoding file. Please try to use Certificate/AttributeCertificate/CertificateRequest.');
    } else {
      this.setValue(decoded);
    }
  }

  render() {
    return (
      <Host>
        <textarea
          placeholder="Certificate DER or PEM"
          class="input_paste peculiar_fill_light peculiar_stroke_grey_3 peculiar_color_dark"
          ref={(el) => { this.inputPaste = el; }}
          onDrop={this.onDropFile}
        />
        <div class="controls">
          <peculiar-button
            fill="fill"
            class="button"
            onClick={this.onClickDecode}
          >
            Decode
          </peculiar-button>
          <peculiar-button class="button">
            Choose file
            <input
              type="file"
              class="input_file"
              accept="application/pkix-cert,application/x-x509-ca-cert,application/x-x509-user-cert,application/pkcs10,.csr,.req"
              onChange={this.onChangeInputFile}
              value=""
            />
          </peculiar-button>
          <peculiar-button
            class="button"
            onClick={this.onClickClear}
          >
            Clear
          </peculiar-button>
          {this.certificateExample && (
            <peculiar-button
              class="button"
              onClick={this.onClickExample}
            >
              Example
            </peculiar-button>
          )}
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
        {this.certificateDecoded instanceof CSR && (
          <peculiar-csr-viewer
            certificate={this.certificateDecoded}
            class="viewer"
            download
          />
        )}
      </Host>
    );
  }
}
