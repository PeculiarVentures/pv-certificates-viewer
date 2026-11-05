/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { base64, base64url, hex } from '@peculiar/utils/encoding';
import { PemConverter } from '../encoding/pem_converter';
import { getCertificateThumbprint } from '../encoding/raw';
import { AsnData } from './asn_data';

export type TEncodingFormat = 'pem' | 'base64' | 'base64url';

interface IDownloader {
  asPEM: (pem: string, name: string) => void;
  asDER: (raw: ArrayBuffer, name: string) => void;
}

/**
 * Shared behavior of the ASN.1 documents (certificate, CRL, CSR, attribute certificate).
 * New members are methods, not getters or fields, so the instance shape stays as it was.
 */
export abstract class AsnDocument<TAsn, TJson> extends AsnData<TAsn> {
  public thumbprints: Record<string, string> = {};

  public abstract readonly type: string;

  public abstract readonly tag: string;

  public abstract get commonName(): string;

  #json?: TJson;

  protected abstract buildJSON(): TJson;

  protected abstract downloader(): IDownloader;

  /** Everything the viewers render, decoded once and cached: plain data with bytes as hex. */
  public toJSON(): TJson {
    this.#json ??= this.buildJSON();

    return this.#json;
  }

  /** Computes thumbprints. Also stores them in `thumbprints` for backward compatibility. */
  public async getThumbprints(algorithms = ['SHA-1', 'SHA-256']): Promise<Record<string, string>> {
    const result: Record<string, string> = {};

    for (const algorithm of algorithms) {
      try {
        const thumbprint = await getCertificateThumbprint(algorithm, this.raw);

        if (thumbprint) {
          result[algorithm] = hex.encode(thumbprint);
        }
      } catch (error) {
        console.error('Error thumbprint get:', error);
      }
    }

    Object.assign(this.thumbprints, result);

    return result;
  }

  /** @deprecated Use `getThumbprints([algorithm])`. */
  public async getThumbprint(algorithm = 'SHA-1'): Promise<void> {
    await this.getThumbprints([algorithm]);
  }

  public toString(format: TEncodingFormat = 'pem'): string {
    switch (format) {
      case 'pem':
        return PemConverter.encode(this.raw, this.tag);
      case 'base64url':
        return base64url.encode(this.raw);
      default:
        return base64.encode(this.raw);
    }
  }

  public download(format: 'pem' | 'der', name = this.commonName) {
    if (format === 'pem') {
      this.downloader().asPEM(this.toString('pem'), name);
    } else {
      this.downloader().asDER(this.raw, name);
    }
  }

  /** @deprecated Use `download('pem', name)`. */
  public downloadAsPEM(name?: string) {
    this.download('pem', name || this.commonName);
  }

  /** @deprecated Use `download('der', name)`. */
  public downloadAsDER(name?: string) {
    this.download('der', name || this.commonName);
  }
}
