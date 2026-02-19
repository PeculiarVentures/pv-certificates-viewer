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
import { ArrayFlat } from '../../components/certificate-details-parts/json_to_html_parser';
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
    const content: Record<string, unknown> = {
      Critical: this.critical,
      'Attestation Version': this.value.attestationVersion,
      'Attestation Security Level': this.value.attestationSecurityLevel,
      'Keymaster Version': this.value.keymasterVersion,
      'Keymaster Security Level': this.value.keymasterSecurityLevel,
    };

    if (this.value.attestationChallenge) {
      try {
        content['Attestation Challenge'] = Convert.ToString(this.value.attestationChallenge);
      } catch {
        content['Attestation Challenge'] = Convert.ToHex(this.value.attestationChallenge);
      }
    }

    if (this.value.uniqueId) {
      try {
        content['Unique Id'] = Convert.ToString(this.value.uniqueId);
      } catch {
        content['Unique Id'] = Convert.ToHex(this.value.uniqueId);
      }
    }

    if (this.value.softwareEnforced?.length) {
      content['Software Enforced'] = ArrayFlat.from(this.convertAuthorizationListToObject(this.value.softwareEnforced));
    }

    if (this.value.teeEnforced?.length) {
      content['Tee Enforced'] = ArrayFlat.from(this.convertAuthorizationListToObject(this.value.teeEnforced));
    }

    return this.extJson(content);
  }

  private convertAuthorizationListToObject(authList: unknown[]) {
    return authList.map((item) => {
      const converted: Record<string, unknown> = {};

      for (const [key, value] of Object.entries(item)) {
        const convertedValue = this.convertValueToJSON(value);

        if (convertedValue !== null) {
          converted[key] = convertedValue;
        }
      }

      return converted;
    });
  }
}

ExtensionFactory.register(id_ce_keyDescription, KeyDescriptionExtension);
