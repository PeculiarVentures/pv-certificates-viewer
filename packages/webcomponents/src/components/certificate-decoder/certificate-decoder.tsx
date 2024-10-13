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
  Fragment,
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

interface ICertificateDecoded {
  name: string;
  body: X509Certificate
  | X509AttributeCertificate
  | Pkcs10CertificateRequest
  | X509Crl;
}

const base64Re = /-----BEGIN [^-]+-----([A-Za-z0-9+/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+/=\s]+)====/;

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
  @Prop() certificateExamples?: {
    title: string;
    value: string;
  }[];

  /**
   * The default certificate value for decode and show details. Use PEM or DER.
   */
  @Prop() certificatesToDecode?: string[];

  @State() certificatesDecoded: ICertificateDecoded[];

  /**
   * Emitted when the certificate has been successfully parsed.
   */
  @Event() successParse!: EventEmitter<string[]>;

  /**
   * Emitted when the certificate has been removed.
   */
  @Event() clearCertificate!: EventEmitter<void>;

  componentDidLoad() {
    if (this.certificatesToDecode) {
      /**
       * Prevent Stencil warning about re-render
       */
      setTimeout(() => this.decode(this.certificatesToDecode), 100);
    }
  }

  private handleClickDecode = () => {
    const { value } = this.inputPaste;

    if (value) {
      const matches = [...value.matchAll(new RegExp(base64Re, 'g'))];
      const result = matches.map((match) => match[0].trim());

      if (result.length) {
        this.decode(result);
      } else {
        this.decode([value]);
      }
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
        this.decode([file.value]);
      }

      element.value = '';
    }
  };

  private handleChangeExample = (event: any) => {
    if (event.target.value) {
      this.decode([event.target.value]);
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
        this.decode([file.value]);
      }
    }
  };

  clearValue() {
    this.inputPaste.value = '';
    this.certificatesDecoded = null;
    this.clearCertificate.emit();
  }

  setValue(values: typeof this.certificatesDecoded) {
    this.certificatesDecoded = values;
    this.inputPaste.value = values.map((value) => value.body.toString('pem')).join('\n');
    this.successParse.emit(values.map((value) => value.body.toString('base64url')));
  }

  decode(certificates: string[]) {
    Promise.all(certificates.map((certificate) => (
      new Promise<X509Certificate>((resolve) => {
        resolve(new X509Certificate(certificate));
      })
        .catch(() => new X509AttributeCertificate(certificate))
        .catch(() => new Pkcs10CertificateRequest(certificate))
        .catch(() => new X509Crl(certificate))
        .catch((error) => {
          console.log(error);

          alert(`Error decoding certificate:\n"${certificate}"\n\nPlease try to use Certificate/AttributeCertificate/CertificateRequest/CRL.`);
        })
    )))
      .then((result: ICertificateDecoded['body'][]) => {
        this.setValue(
          result
            .filter((cert) => cert)
            .map((cert) => ({
              name: cert.commonName,
              body: cert,
            })),
        );
      });
  }

  static renderCertificateBody(body: ICertificateDecoded['body']) {
    if (body instanceof X509Certificate) {
      return (
        <peculiar-certificate-viewer
          certificate={body}
          download
        />
      );
    }

    if (body instanceof X509AttributeCertificate) {
      return (
        <peculiar-attribute-certificate-viewer
          certificate={body}
          download
        />
      );
    }

    if (body instanceof Pkcs10CertificateRequest) {
      return (
        <peculiar-csr-viewer
          certificate={body}
          download
        />
      );
    }

    if (body instanceof X509Crl) {
      return (
        <peculiar-crl-viewer
          certificate={body}
          download
        />
      );
    }

    return null;
  }

  renderCertificates() {
    if (!this.certificatesDecoded?.length) {
      return null;
    }

    if (this.certificatesDecoded.length === 1) {
      return CertificateDecoder.renderCertificateBody(this.certificatesDecoded[0].body);
    }

    return (
      <div class="tabs-container">
        {this.certificatesDecoded.map((cert, index) => (
          <Fragment>
            <input
              type="radio"
              id={`tab-${index}`}
              name="cert-tabs"
              checked={index === 0}
            />
            <Typography
              variant="s2"
              component="label"
              // @ts-ignore
              htmlFor={`tab-${index}`}
              class="tab-control"
              color="black"
            >
              {cert.name}
            </Typography>
            <div class="tab-content">
              {CertificateDecoder.renderCertificateBody(cert.body)}
            </div>
          </Fragment>
        ))}
      </div>
    );
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
        {this.renderCertificates()}
      </Host>
    );
  }
}
