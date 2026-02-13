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
} from '@peculiar/asn1-android';
import { AsnParser } from '@peculiar/asn1-schema';
import { Convert, BufferSourceConverter } from 'pvtsutils';
import { BaseExtension } from './base_extension';

type KeyDescriptionJSON = Record<
  string,
  | string
  | number
  | boolean
  | Record<string, string | number | boolean | Record<string, string>[]>[]
>;

/**
 * Key Description Extension (Android Key Attestation)
 */
export class KeyDescriptionExtension extends BaseExtension {
  public static override readonly NAME = 'Key Description';

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

  private convertAuthorizationList(
    authList: unknown[],
  ): Record<string, unknown>[] {
    return authList.map((item) => {
      const result: Record<string, unknown> = {};

      for (const [key, value] of Object.entries(item)) {
        result[key] = this.convertValueToJSON(value);
      }

      return result;
    });
  }

  public override toJSON(): KeyDescriptionJSON {
    const result: Record<string, unknown> = {
      Name: KeyDescriptionExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
      AttestationVersion: this.value.attestationVersion,
      AttestationSecurityLevel: this.value.attestationSecurityLevel,
      KeymasterVersion: this.value.keymasterVersion,
      KeymasterSecurityLevel: this.value.keymasterSecurityLevel,
    };

    if (this.value.attestationChallenge) {
      try {
        result.AttestationChallenge = Convert.ToString(this.value.attestationChallenge);
      } catch {
        result.AttestationChallenge = Convert.ToHex(this.value.attestationChallenge);
      }
    }

    if (this.value.uniqueId) {
      try {
        result.UniqueId = Convert.ToString(this.value.uniqueId);
      } catch {
        result.UniqueId = Convert.ToHex(this.value.uniqueId);
      }
    }

    if (
      this.value.softwareEnforced
      && this.value.softwareEnforced.length > 0
    ) {
      result.SoftwareEnforced = this.convertAuthorizationList(
        this.value.softwareEnforced,
      );
    }

    if (this.value.teeEnforced && this.value.teeEnforced.length > 0) {
      result.TeeEnforced = this.convertAuthorizationList(
        this.value.teeEnforced,
      );
    }

    return result as KeyDescriptionJSON;
  }
}
