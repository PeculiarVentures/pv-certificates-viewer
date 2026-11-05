/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  id_ce_keyDescription,
  NonStandardKeyDescription,
  NonStandardAuthorizationList,
  SecurityLevel,
  IntegerSet,
  RootOfTrust,
  VerifiedBootState,
  AttestationApplicationId,
} from '@peculiar/asn1-android';
import { AsnParser } from '@peculiar/asn1-schema';
import { Extension } from '@peculiar/asn1-x509';
import { isBufferSource } from '@peculiar/utils/bytes';
import { hex } from '@peculiar/utils/encoding';
import type { IExtensionNode, IExtensionParser, IParsedExtension } from '../types';
import { camelCaseToWords } from '../../../utils/camel_case_to_words';
import { decodeUtf8 } from '../../../utils/decode_utf8';
import { node, section } from '../builders';

function formatAuthValue(key: string, value: unknown): IExtensionNode | null {
  if (value === undefined) return null;

  if (value === null) {
    return node(camelCaseToWords(key), true);
  }

  if (typeof value === 'number') {
    return node(camelCaseToWords(key), value);
  }

  if (value instanceof IntegerSet) {
    return node(camelCaseToWords(key), Array.from(value).join(', '));
  }

  if (value instanceof RootOfTrust) {
    return section(camelCaseToWords(key), [
      node('Verified Boot Key', hex.encode(value.verifiedBootKey)),
      node('Device Locked', value.deviceLocked),
      node(
        'Boot State',
        VerifiedBootState[value.verifiedBootState] ?? String(value.verifiedBootState),
      ),
      ...(value.verifiedBootHash != null
        ? [node('Boot Hash', hex.encode(value.verifiedBootHash))]
        : []),
    ]);
  }

  if (key === 'attestationApplicationId' && isBufferSource(value)) {
    try {
      const appId = AsnParser.parse(value as BufferSource, AttestationApplicationId);
      const items: IExtensionNode[] = [];

      if (appId.packageInfos.length > 0) {
        items.push(
          section(
            'Package Infos',
            appId.packageInfos.map((pkg) =>
              section('', [
                node('Package Name', decodeUtf8(pkg.packageName)),
                node('Version', pkg.version),
              ]),
            ),
          ),
        );
      }

      if (appId.signatureDigests.length > 0) {
        items.push(
          section(
            'Signature Digests',
            appId.signatureDigests.map((digest) => node('Digest', hex.encode(digest))),
          ),
        );
      }

      return section(camelCaseToWords(key), items);
    } catch {
      // fall through to generic buffer handling
    }
  }

  if (isBufferSource(value)) {
    try {
      return node(camelCaseToWords(key), decodeUtf8(value));
    } catch {
      return node(camelCaseToWords(key), hex.encode(value));
    }
  }

  if (typeof value === 'string') {
    return node(camelCaseToWords(key), value);
  }

  return null;
}

function parseAuthList(list: NonStandardAuthorizationList): IExtensionNode[] {
  const combined: Record<string, unknown> = {};

  for (const auth of list) {
    for (const key of Object.keys(auth)) {
      const val = (auth as Record<string, unknown>)[key];

      if (val !== undefined && !(key in combined)) {
        combined[key] = val;
      }
    }
  }

  return Object.entries(combined)
    .map(([key, value]) => formatAuthValue(key, value))
    .filter((n): n is IExtensionNode => n != null);
}

export class KeyDescriptionParser implements IExtensionParser {
  readonly oids = [id_ce_keyDescription];

  parse(extension: Extension): IParsedExtension {
    const kd = AsnParser.parse(extension.extnValue.buffer, NonStandardKeyDescription);
    const children: IExtensionNode[] = [];
    const attestVer = kd.attestationVersion;

    children.push(
      node('Attestation Version', typeof attestVer === 'number' ? attestVer : Number(attestVer)),
    );
    children.push(
      node(
        'Attestation Security Level',
        SecurityLevel[kd.attestationSecurityLevel] ?? String(kd.attestationSecurityLevel),
      ),
    );
    children.push(node('Keymaster Version', kd.keymasterVersion));
    children.push(
      node(
        'Keymaster Security Level',
        SecurityLevel[kd.keymasterSecurityLevel] ?? String(kd.keymasterSecurityLevel),
      ),
    );
    children.push(node('Attestation Challenge', decodeUtf8(kd.attestationChallenge)));

    const uniqueIdHex = hex.encode(kd.uniqueId);

    if (uniqueIdHex) {
      children.push(node('Unique ID', uniqueIdHex));
    }

    const swNodes = parseAuthList(kd.softwareEnforced);

    if (swNodes.length > 0) {
      children.push(section('Software Enforced', swNodes));
    }

    const teeNodes = parseAuthList(kd.teeEnforced);

    if (teeNodes.length > 0) {
      children.push(section('TEE Enforced', teeNodes));
    }

    return {
      oid: extension.extnID,
      critical: extension.critical ?? false,
      children,
    };
  }
}
