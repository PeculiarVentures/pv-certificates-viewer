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
  X509Certificates,
  SshCertificate,
} from '../../crypto';

@Component({
  tag: 'peculiar-certificate-decoder',
  shadow: false,
})
export class CertificateDecoder {
  private inputPaste?: HTMLTextAreaElement;

  /**
   * Pre-loaded example certificates available in the "Load example" dropdown.
   */
  @Prop() certificateExamples?: {
    title: string;
    value: string;
  }[];

  /**
   * A certificate to decode on first load (PEM or Base64 DER).
   */
  @Prop() certificateToDecode?: string;

  /** The decoded certificate object; null while empty. */
  @State() certificateDecoded: X509Certificates
    | X509Certificate
    | X509AttributeCertificate
    | Pkcs10CertificateRequest
    | X509Crl
    | SshCertificate;

  /** Mirrors textarea content so Clear/Decode enable after paste without a decode. */
  @State() private inputHasText = false;

  /** Emitted when a certificate has been successfully parsed. */
  @Event() successParse!: EventEmitter<string>;

  /** Emitted when the input has been cleared. */
  @Event() clearCertificate!: EventEmitter<void>;

  // ─── Lifecycle ─────────────────────────────────────────────────────────────

  componentDidLoad() {
    if (this.certificateToDecode) {
      // Defer one tick to avoid Stencil re-render warning
      setTimeout(() => this.decode(this.certificateToDecode), 100);
    }
  }

  // ─── Handlers ──────────────────────────────────────────────────────────────

  private handleClickDecode = () => {
    const { value } = this.inputPaste;

    if (value) this.decode(value);
  };

  private handleClickClear = () => {
    this.clearValue();
  };

  private handleChangeInputFile = async (event: Event) => {
    const el = event.target as HTMLInputElement;

    if (el.files?.length) {
      const file = await readAsBinaryString(el.files[0]);

      if (typeof file.value === 'string') this.decode(file.value);
      el.value = '';
    }
  };

  private handleChangeExample = (event: Event) => {
    const val = (event.target as HTMLSelectElement).value;

    if (val) this.decode(val);
    else this.clearValue();
  };

  private handleDrop = async (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const files = event.dataTransfer?.files;

    if (files?.length) {
      const file = await readAsBinaryString(files[0]);

      if (typeof file.value === 'string') this.decode(file.value);
    }
  };

  private syncInputHasText = () => {
    this.inputHasText = Boolean(this.inputPaste?.value);
  };

  // ─── Core operations ───────────────────────────────────────────────────────

  clearValue() {
    this.inputPaste.value = '';
    this.inputHasText = false;
    this.certificateDecoded = null;
    this.clearCertificate.emit();
  }

  async setValue(value: typeof this.certificateDecoded) {
    this.certificateDecoded = value;
    this.inputPaste.value = await value.toString('pem');
    this.inputHasText = true;
    this.successParse.emit(await value.toString('base64url'));
  }

  async decode(value: string) {
    new Promise<X509Certificates>((resolve) => resolve(new X509Certificates(value)))
      .catch(() => new X509Certificate(value))
      .catch(() => new X509AttributeCertificate(value))
      .catch(() => new Pkcs10CertificateRequest(value))
      .catch(() => new X509Crl(value))
      .catch(() => new SshCertificate(value))
      .then((res: typeof this.certificateDecoded) => this.setValue(res))
      .catch((err) => {
        console.error(err);
        alert(`Error decoding certificate.\n\nSupported formats: X.509 Certificate, Attribute Certificate, PKCS#10 CSR, CRL, SSH Certificate.`);
      });
  }

  // ─── Render helpers ────────────────────────────────────────────────────────

  private renderDecodedComponent() {
    const cert = this.certificateDecoded;

    if (cert instanceof X509Certificates) {
      return <peculiar-certificate-chain-viewer certificates={cert} download />;
    }

    if (cert instanceof X509Certificate) {
      return <peculiar-certificate-viewer certificate={cert} download />;
    }

    if (cert instanceof X509AttributeCertificate) {
      return <peculiar-attribute-certificate-viewer certificate={cert} download />;
    }

    if (cert instanceof Pkcs10CertificateRequest) {
      return <peculiar-csr-viewer certificate={cert} download />;
    }

    if (cert instanceof X509Crl) {
      return <peculiar-crl-viewer certificate={cert} download />;
    }

    if (cert instanceof SshCertificate) {
      return <peculiar-ssh-certificate-viewer certificate={cert} download />;
    }

    return null;
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  render() {
    const hasDecoded = !!this.certificateDecoded;
    const canActOnInput = hasDecoded || this.inputHasText;

    return (
      <Host class="relative grid h-full min-h-0 w-full grid-cols-1 overflow-hidden bg-gray-100 font-sans min-[821px]:grid-cols-2 max-[820px]:h-auto">
        <div
          class="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-gray-200 min-[821px]:block"
          aria-hidden="true"
        />

        {/* ══════════════════════ LEFT PANE — INPUT ══════════════════════ */}
        <div class="flex min-h-0 flex-col overflow-hidden bg-white max-[820px]:min-h-64 max-[820px]:border-b max-[820px]:border-gray-200">

          <div class="flex shrink-0 items-center justify-between gap-2 border-b border-gray-200 bg-gray-100 px-4 py-2">
            <span class="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-gray-500">
              <svg
                width="12" height="12"
                class="shrink-0 text-blue-600 opacity-80"
                fill="none" stroke="currentColor"
                stroke-width="2" viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Encoded Input
            </span>

            <div class="flex shrink-0 items-center gap-1">
              <label
                class="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md border border-gray-300 bg-white px-2.5 py-1 font-mono text-xs tracking-wide text-gray-700 transition-all duration-150 hover:opacity-80 disabled:pointer-events-none disabled:cursor-default disabled:opacity-40"
                title="Load from file"
              >
                <svg
                  width="11" height="11"
                  fill="none" stroke="currentColor"
                  stroke-width="2" viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Upload
                <input
                  type="file"
                  accept=".pem,.crt,.cer,.der,.csr,.req,.crl,.pub,application/pkix-cert,application/x-x509-ca-cert,application/x-x509-user-cert,application/pkcs10,application/pkix-crl"
                  class="hidden"
                  onChange={this.handleChangeInputFile}
                />
              </label>

              <button
                type="button"
                class="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md border border-gray-300 bg-white px-2.5 py-1 font-mono text-xs tracking-wide text-gray-700 transition-all duration-150 hover:opacity-80 disabled:pointer-events-none disabled:cursor-default disabled:opacity-40"
                disabled={!canActOnInput}
                onClick={this.handleClickClear}
              >
                Clear
              </button>

              <button
                type="button"
                class="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md bg-blue-600 px-2.5 py-1 font-mono text-xs tracking-wide text-white transition-all duration-150 hover:opacity-80 disabled:pointer-events-none disabled:cursor-default disabled:opacity-40"
                disabled={!canActOnInput}
                onClick={this.handleClickDecode}
              >
                Decode →
              </button>
            </div>
          </div>

          <textarea
            class="min-h-0 w-full flex-1 resize-none border-0 bg-gray-100 px-4 py-4 font-mono text-xs leading-snug tracking-wide text-blue-800 caret-blue-600 outline-none transition-colors duration-150 placeholder:italic placeholder:text-gray-400 focus:bg-white"
            placeholder={'Paste a PEM or Base64 DER certificate here,\nor drag & drop a .pem / .crt file…\n\n-----BEGIN CERTIFICATE-----\nMIIFaz…\n-----END CERTIFICATE-----'}
            ref={(el) => { this.inputPaste = el as HTMLTextAreaElement; }}
            onInput={this.syncInputHasText}
            onDrop={this.handleDrop}
          />
        </div>

        {/* ══════════════════════ RIGHT PANE — OUTPUT ══════════════════════ */}
        <div class="flex min-h-0 flex-col overflow-hidden bg-white">
          <div class="flex shrink-0 items-center justify-between gap-2 border-b border-gray-200 bg-gray-100 px-4 py-2">
            <span class="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-gray-500">
              <svg
                width="12" height="12"
                class="shrink-0 text-blue-600 opacity-80"
                fill="none" stroke="currentColor"
                stroke-width="2" viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Decoded Output
            </span>

            {this.certificateExamples?.length > 0 && (
              <div class="relative max-w-xs shrink">
                <select
                  class="w-full max-w-xs cursor-pointer appearance-none rounded-md border border-gray-300 bg-white py-1 pl-2 pr-8 font-mono text-xs text-gray-700 transition-colors hover:border-blue-600 focus:border-blue-600 focus:outline-none"
                  onChange={this.handleChangeExample}
                >
                  <option value="">Load example…</option>
                  {this.certificateExamples.map((ex) => (
                    <option value={ex.value}>{ex.title}</option>
                  ))}
                </select>
                <svg
                  class="pointer-events-none absolute right-2 top-1/2 size-2.5 -translate-y-1/2 text-gray-500"
                  fill="none" stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 10 6"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M1 1l4 4 4-4"
                  />
                </svg>
              </div>
            )}
          </div>

          <div class="min-h-0 flex-1 overflow-y-auto bg-white [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
            {!hasDecoded
              ? this.renderPlaceholder()
              : this.renderDecodedComponent()}
          </div>
        </div>

      </Host>
    );
  }

  private renderPlaceholder() {
    return (
      <div class="flex h-full flex-col items-center justify-center gap-3 p-10">
        <div class="flex size-12 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-gray-400">
          <svg
            width="24" height="24"
            fill="none" stroke="currentColor"
            stroke-width="1.5" viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p class="text-center font-mono text-xs leading-relaxed text-gray-400">
          Paste a certificate on the left
          <br />
          and click
          {' '}
          <strong class="font-semibold text-blue-600">Decode</strong>
          {' '}
          — or load an example.
        </p>
      </div>
    );
  }
}
