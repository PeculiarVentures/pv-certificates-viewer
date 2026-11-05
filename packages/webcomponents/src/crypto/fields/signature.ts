/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { id_alg_mtcProof, id_alg_mtcProof_experimental, MTCProof } from '@peculiar/asn1-mtc';
import { AsnConvert } from '@peculiar/asn1-schema';
import { AlgorithmIdentifier } from '@peculiar/asn1-x509';
import {
  CompositeParams,
  CompositeSignatureValue,
  id_alg_composite,
} from '@peculiar/asn1-x509-post-quantum';
import { toUint8Array } from '@peculiar/utils/bytes';
import { hex } from '@peculiar/utils/encoding';

export interface IMTCProofDetails {
  start: number;
  end: number;
  subtreeSize: number;
  isLandmarkRelative: boolean;
  inclusionProof: string[];
  signatures: {
    cosignerId: string;
    signature: string;
  }[];
}

export interface ISignature {
  algorithm: string;
  value: BufferSource;
  params?: {
    algorithm: string;
    value: BufferSource;
  }[];
  mtcProof?: IMTCProofDetails;
  mtcProofError?: string;
}

export interface ISignatureJSON {
  algorithm: string;
  /** Signature value, hex. Empty string when the value is empty. */
  value: string;
  /** Component signatures of a composite signature. */
  parts?: { algorithm: string; value: string }[];
  mtcProof?: IMTCProofDetails;
  mtcProofError?: string;
}

/** Decodes a signature value, including composite signatures and MTC proofs. */
export function parseSignature(
  signatureAlgorithm: AlgorithmIdentifier,
  signatureValue: ArrayBuffer,
): ISignature {
  const { algorithm, parameters } = signatureAlgorithm;
  let params: ISignature['params'];

  if (algorithm === id_alg_composite && parameters != null) {
    const values = AsnConvert.parse(signatureValue, CompositeSignatureValue);
    const compositeParams = AsnConvert.parse(parameters, CompositeParams);

    params = compositeParams.map((param, index) => ({
      ...param,
      value: values[index],
    }));
  }

  if (algorithm === id_alg_mtcProof || algorithm === id_alg_mtcProof_experimental) {
    try {
      const proof = MTCProof.parse(toUint8Array(signatureValue));
      const json = proof.toJSON();

      return {
        algorithm,
        value: signatureValue,
        mtcProof: {
          start: json.start,
          end: json.end,
          subtreeSize: proof.subtreeSize,
          isLandmarkRelative: proof.isLandmarkRelative,
          inclusionProof: json.inclusionProof,
          signatures: json.signatures,
        },
      };
    } catch (error) {
      // A malformed or unsupported proof must not prevent viewing the certificate.
      return {
        algorithm,
        value: signatureValue,
        mtcProofError: (error instanceof Error && error.message) || 'Unable to decode MTC proof',
      };
    }
  }

  return {
    params,
    value: signatureValue,
    algorithm,
  };
}

export function signatureToJSON(signature: ISignature): ISignatureJSON {
  const json: ISignatureJSON = {
    algorithm: signature.algorithm,
    value: hex.encode(signature.value),
  };

  if (signature.params?.length) {
    json.parts = signature.params.map((part) => ({
      algorithm: part.algorithm,
      value: hex.encode(part.value),
    }));
  }

  if (signature.mtcProof) {
    json.mtcProof = signature.mtcProof;
  }

  if (signature.mtcProofError) {
    json.mtcProofError = signature.mtcProofError;
  }

  return json;
}
