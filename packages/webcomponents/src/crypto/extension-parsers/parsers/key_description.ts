/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AsnParser } from '@peculiar/asn1-schema';
import { Extension } from '@peculiar/asn1-x509';
import {
  id_ce_keyDescription,
  NonStandardKeyDescription,
  NonStandardAuthorizationList,
  SecurityLevel,
  IntegerSet,
  RootOfTrust,
  VerifiedBootState,
} from '@peculiar/asn1-android';
import { Convert, BufferSourceConverter } from 'pvtsutils';
import { camelCaseToWords } from '../../../utils/camel_case_to_words';
import type {
  ExtensionNode,
  ExtensionParser,
  ParsedExtension,
} from '../types';
import { node, section } from '../builders';

function formatAuthValue(key: string, value: unknown): ExtensionNode | null {
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
      node('Verified Boot Key', Convert.ToHex(value.verifiedBootKey)),
      node('Device Locked', value.deviceLocked),
      node('Boot State', VerifiedBootState[value.verifiedBootState] ?? String(value.verifiedBootState)),
      ...(value.verifiedBootHash != null
        ? [node('Boot Hash', Convert.ToHex(value.verifiedBootHash))]
        : []),
    ]);
  }

  if (BufferSourceConverter.isBufferSource(value)) {
    try {
      return node(camelCaseToWords(key), Convert.ToString(value));
    } catch {
      return node(camelCaseToWords(key), Convert.ToHex(value));
    }
  }

  if (typeof value === 'string') {
    return node(camelCaseToWords(key), value);
  }

  return null;
}

function parseAuthList(list: NonStandardAuthorizationList): ExtensionNode[] {
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
    .filter((n): n is ExtensionNode => n != null);
}

export class KeyDescriptionParser implements ExtensionParser {
  readonly oids = [id_ce_keyDescription];

  parse(extension: Extension): ParsedExtension {
    const kd = AsnParser.parse(extension.extnValue.buffer, NonStandardKeyDescription);
    const children: ExtensionNode[] = [];
    const attestVer = kd.attestationVersion;

    children.push(node('Attestation Version', typeof attestVer === 'number' ? attestVer : Number(attestVer)));
    children.push(node('Attestation Security Level', SecurityLevel[kd.attestationSecurityLevel] ?? String(kd.attestationSecurityLevel)));
    children.push(node('Keymaster Version', kd.keymasterVersion));
    children.push(node('Keymaster Security Level', SecurityLevel[kd.keymasterSecurityLevel] ?? String(kd.keymasterSecurityLevel)));
    children.push(node('Attestation Challenge', Convert.ToString(kd.attestationChallenge)));

    const uniqueIdHex = Convert.ToHex(kd.uniqueId);

    if (uniqueIdHex) {
      children.push(node('Unique ID', uniqueIdHex));
    }

    const swNodes = parseAuthList(kd.softwareEnforced);

    if (swNodes.length > 0) {
      // TODO: add AttestationApplicationId support
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
