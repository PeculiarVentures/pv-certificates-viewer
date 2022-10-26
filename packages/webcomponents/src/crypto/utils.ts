import { Convert } from 'pvtsutils';
import { validator } from '../utils';

import { cryptoProvider } from './provider';

const base64Re = /-----BEGIN [^-]+-----([A-Za-z0-9+/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+/=\s]+)====/;

export const base64Clarify = (base64: string): string => {
  const execArray = base64Re.exec(base64);

  return execArray ? (execArray[1] || execArray[2]) : base64;
};

export const hexFormat = (hex: string): string => (
  hex
    .replace(/(.{32})/g, '$1\n')
    .replace(/(.{4})/g, '$1 ')
    .trim()
);

export const base64Format = (base64: string): string => (
  base64
    .replace(/(.{64})/g, '$1\n')
);

export const certificateRawToBuffer = (raw: string): ArrayBuffer => {
  const rawClarified = base64Clarify(raw);
  let buffer: ArrayBuffer;

  if (validator.isHex(rawClarified)) {
    buffer = Convert.FromHex(rawClarified);
  } else if (validator.isBase64(rawClarified) || validator.isPem(rawClarified)) {
    buffer = Convert.FromBase64(rawClarified);
  } else {
    buffer = Convert.FromBinary(raw);
  }

  return buffer;
};

export const getCertificateThumbprint = async (
  algorithm: globalThis.AlgorithmIdentifier,
  data: ArrayBuffer,
): Promise<ArrayBuffer | undefined> => {
  const crypto = cryptoProvider.get();
  if (crypto.subtle) {
    return crypto.subtle.digest(algorithm, data);
  }
  return undefined;
};
