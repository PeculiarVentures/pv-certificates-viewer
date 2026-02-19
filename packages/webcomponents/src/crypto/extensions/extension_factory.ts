/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Extension as AsnExtension } from '@peculiar/asn1-x509';
import { AsnConvert } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import { getStringByOID } from '../../utils';
import type { IJsonRenderObject } from '../../components/certificate-details-parts/json_to_html_parser';
import { BaseExtension } from './base_extension';

type ExtensionClass = new (raw: BufferSource) => BaseExtension;

/**
 * Factory for creating extension instances based on OID
 */
export class ExtensionFactory {
  private static extensionClasses: Record<string, ExtensionClass> = {};

  /**
   * Register an extension class for a given OID
   * @param oid - The OID string (e.g., id_ce_basicConstraints)
   * @param extensionClass - The extension class constructor
   */
  public static register(oid: string, extensionClass: ExtensionClass): void {
    ExtensionFactory.extensionClasses[oid] = extensionClass;
  }

  /**
   * Parse an extension from raw ASN.1 data
   * @param raw - Raw extension data (ASN.1 Extension structure)
   * @returns An instance of the appropriate extension class, or null if not registered
   */
  public static parse(raw: BufferSource): BaseExtension | null {
    try {
      const asnExtension = AsnConvert.parse(raw, AsnExtension);
      const ExtensionClass = ExtensionFactory.extensionClasses[asnExtension.extnID];

      if (ExtensionClass) {
        return new ExtensionClass(raw);
      }

      console.warn('Extension not registered:', asnExtension.extnID);

      return null;
    } catch (error) {
      console.error('Error parsing extension:', error);

      return null;
    }
  }

  /**
   * Get extension as JSON for rendering. Uses registered parser if available,
   * otherwise returns fallback with Critical and hex Value.
   */
  public static toJSON(raw: BufferSource): IJsonRenderObject {
    const ext = ExtensionFactory.parse(raw);

    if (ext) {
      return ext.toJSON();
    }

    const asnExt = AsnConvert.parse(raw, AsnExtension);

    return {
      [getStringByOID(asnExt.extnID)]: {
        Critical: asnExt.critical ? 'YES' : 'NO',
        Value: Convert.ToHex(asnExt.extnValue.buffer),
      },
    };
  }
}
