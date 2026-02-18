/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  NonStandardKeyDescription,
  IntegerSet,
  RootOfTrust,
  id_ce_keyDescription,
} from '@peculiar/asn1-android';
import { AsnParser } from '@peculiar/asn1-schema';
import { Convert, BufferSourceConverter } from 'pvtsutils';
import {
  row, hexRow, rowGroup, objectToRows,
} from '../rows_format';
import { ExtensionFactory } from './extension_factory';
import { BaseExtension } from './base_extension';

/**
 * Key Description Extension (Android Key Attestation)
 */
export class KeyDescriptionExtension extends BaseExtension {
  public readonly value: NonStandardKeyDescription;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<NonStandardKeyDescription>(
      asnExtnValue,
      NonStandardKeyDescription,
    );
  }

  private convertValueToJSON(
    value: unknown,
  ): string | number | boolean | null | string[] | Record<string, unknown> {
    if (value === null || value === undefined) {
      return null;
    }

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return value;
    }

    if (value instanceof IntegerSet) {
      return value.join(', ');
    }

    if (BufferSourceConverter.isBufferSource(value)) {
      try {
        return Convert.ToString(value);
      } catch {
        return Convert.ToHex(value);
      }
    }

    if (value instanceof RootOfTrust) {
      const rootOfTrust: Record<string, unknown> = {};

      if (value.verifiedBootKey) {
        rootOfTrust.verifiedBootKey = Convert.ToHex(value.verifiedBootKey);
      }

      if (value.deviceLocked !== undefined) {
        rootOfTrust.deviceLocked = value.deviceLocked;
      }

      if (value.verifiedBootState !== undefined) {
        rootOfTrust.verifiedBootState = value.verifiedBootState;
      }

      if (value.verifiedBootHash) {
        rootOfTrust.verifiedBootHash = Convert.ToHex(value.verifiedBootHash);
      }

      return rootOfTrust;
    }

    if (typeof value === 'object') {
      const obj: Record<string, unknown> = {};

      for (const [key, val] of Object.entries(value)) {
        obj[key] = this.convertValueToJSON(val);
      }

      return obj;
    }

    return String(value);
  }

  public override toJSON() {
    const rows = [
      row('Critical', this.critical),
      row('Attestation Version', this.value.attestationVersion),
      row('Attestation Security Level', this.value.attestationSecurityLevel),
      row('Keymaster Version', this.value.keymasterVersion),
      row('Keymaster Security Level', this.value.keymasterSecurityLevel),
    ];

    if (this.value.attestationChallenge) {
      try {
        rows.push(row('Attestation Challenge', Convert.ToString(this.value.attestationChallenge)));
      } catch {
        rows.push(hexRow('Attestation Challenge', Convert.ToHex(this.value.attestationChallenge)));
      }
    }

    if (this.value.uniqueId) {
      try {
        rows.push(row('Unique Id', Convert.ToString(this.value.uniqueId)));
      } catch {
        rows.push(hexRow('Unique Id', Convert.ToHex(this.value.uniqueId)));
      }
    }

    if (this.value.softwareEnforced?.length) {
      rows.push(rowGroup('Software Enforced', [this.convertAuthorizationListToRows(this.value.softwareEnforced).flat()]));
    }

    if (this.value.teeEnforced?.length) {
      rows.push(rowGroup('Tee Enforced', [this.convertAuthorizationListToRows(this.value.teeEnforced).flat()]));
    }

    return rowGroup(this.name, [rows]);
  }

  private convertAuthorizationListToRows(authList: unknown[]) {
    return authList.map((item) => {
      const converted: Record<string, unknown> = {};

      for (const [key, value] of Object.entries(item)) {
        converted[key] = this.convertValueToJSON(value);
      }

      return objectToRows(converted);
    });
  }
}

ExtensionFactory.register(id_ce_keyDescription, KeyDescriptionExtension);
