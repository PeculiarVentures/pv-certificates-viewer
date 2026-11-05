/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ECParameters, id_ecPublicKey } from '@peculiar/asn1-ecc';
import { id_rsaEncryption, RSAPublicKey } from '@peculiar/asn1-rsa';
import { AsnConvert } from '@peculiar/asn1-schema';
import { SubjectPublicKeyInfo } from '@peculiar/asn1-x509';
import { CompositePublicKey, id_composite_key } from '@peculiar/asn1-x509-post-quantum';
import { toUint8Array } from '@peculiar/utils/bytes';
import { hex } from '@peculiar/utils/encoding';

export interface IPublicKey {
  algorithm: string;
  value: BufferSource;
  params?: ECParameters | RSAPublicKey | IPublicKey[];
}

export interface IPublicKeyJSON {
  algorithm: string;
  /** DER-encoded SubjectPublicKeyInfo, hex. */
  value: string;
  namedCurve?: string;
  modulusBits?: number;
  exponent?: number;
  /** Component keys of a composite key. */
  parts?: IPublicKeyJSON[];
}

/** Decodes the algorithm parameters of a SubjectPublicKeyInfo (EC curve, RSA key, composite parts). */
export function parsePublicKeyInfo(publicKeyInfo: SubjectPublicKeyInfo): IPublicKey {
  const { subjectPublicKey, algorithm } = publicKeyInfo;
  let params: IPublicKey['params'];

  if (algorithm.algorithm === id_ecPublicKey && algorithm.parameters) {
    params = AsnConvert.parse(algorithm.parameters, ECParameters);
  }

  if (algorithm.algorithm === id_rsaEncryption) {
    params = AsnConvert.parse(subjectPublicKey, RSAPublicKey);
  }

  if (algorithm.algorithm === id_composite_key) {
    params = AsnConvert.parse(subjectPublicKey, CompositePublicKey).map(parsePublicKeyInfo);
  }

  return {
    params,
    value: AsnConvert.serialize(publicKeyInfo),
    algorithm: algorithm.algorithm,
  };
}

/** Bit length of an unsigned big-endian integer, ignoring leading zero bytes. */
export function bitLength(value: BufferSource): number {
  const bytes = toUint8Array(value);
  const start = bytes.findIndex((byte) => byte !== 0);

  if (start === -1) {
    return 0;
  }

  return (bytes.length - start - 1) * 8 + (32 - Math.clz32(bytes[start]));
}

/** Unsigned big-endian integer as a number (exact up to 2^53). */
export function toNumber(value: BufferSource): number {
  return toUint8Array(value).reduce((acc, byte) => acc * 256 + byte, 0);
}

export function publicKeyToJSON(key: IPublicKey): IPublicKeyJSON {
  const { params } = key;
  const json: IPublicKeyJSON = {
    algorithm: key.algorithm,
    value: hex.encode(key.value),
  };

  if (Array.isArray(params)) {
    json.parts = params.map(publicKeyToJSON);
  } else if (params instanceof RSAPublicKey) {
    json.modulusBits = bitLength(params.modulus);
    json.exponent = toNumber(params.publicExponent);
  } else if (params instanceof ECParameters && params.namedCurve) {
    json.namedCurve = params.namedCurve;
  }

  return json;
}
