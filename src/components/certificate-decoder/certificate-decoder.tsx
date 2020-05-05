import { Component, Host, h, State, Prop } from '@stencil/core';

import readFile from '../../utils/readFile';
import history from '../../utils/history';
import { Certificate } from '../../utils/crypto';

@Component({
  tag: 'peculiar-certificate-decoder',
  styleUrl: 'certificate-decoder.css',
  shadow: true,
})
export class CertificateDecoder {
  private inputPaste?: HTMLTextAreaElement;

  /**
   * The example certificate value for decode and show details. Use PEM or DER.
   */
  @Prop() certificateExample?: string;

  @State() certificateDecoded: Certificate;

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
  }

  private onClickExample = () => {
    this.decode(this.certificateExample);
  }

  private onClickClear = () => {
    this.clear();
  }

  private onChangeInputFile = async (e: any) => {
    const element = e.target;

    if (element.files) {
      const file = await readFile.readAsBinaryString(element.files[0]);

      if (typeof file.value === 'string') {
        this.decode(file.value);
      }

      element.value = '';
    }
  }

  private onDropFile = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    const element = e.dataTransfer;

    if (element.files) {
      const file = await readFile.readAsBinaryString(element.files[0]);

      if (typeof file.value === 'string') {
        this.decode(file.value);
      }
    }
  }

  clear() {
    this.inputPaste.value = '';
    this.certificateDecoded = null;

    history.replace({ search: '' });
  }

  decode(certificate: string) {
    try {
      const decoded = new Certificate(certificate, undefined, true);

      this.certificateDecoded = decoded;
      this.inputPaste.value = decoded.pem;

      history.replace({
        search: history.queryStringify({
          cert: decoded.base64,
        }),
      });
    } catch (error) {
      this.certificateDecoded = null;

      console.error(error);
      alert('Error decoding certificate. Please use another file');
    }
  }

  render() {
    return (
      <Host>
        <textarea
          placeholder="Certificate DER or PEM"
          class="input_paste fill_white stroke_border text_black"
          ref={el => this.inputPaste = el}
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
              accept="application/pkix-cert,application/x-x509-ca-cert,application/x-x509-user-cert"
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
        {this.certificateDecoded && (
          <peculiar-certificate-viewer
            certificate={this.certificateDecoded}
            class="viewer"
            download
          />
        )}
      </Host>
    );
  }
}
