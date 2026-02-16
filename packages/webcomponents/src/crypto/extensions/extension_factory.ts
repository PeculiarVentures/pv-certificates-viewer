/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Extension as AsnExtension } from '@peculiar/asn1-x509';
import { AsnConvert } from '@peculiar/asn1-schema';
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

      return null;
    } catch (error) {
      console.error('Error parsing extension:', error);
      return null;
    }
  }

  /**
   * Get the registered extension class for a given OID
   * @param oid - The OID string
   * @returns The extension class constructor, or null if not registered
   */
  public static get(oid: string): ExtensionClass | null {
    return ExtensionFactory.extensionClasses[oid] || null;
  }

  /**
   * Check if an OID is registered
   * @param oid - The OID string
   * @returns True if the OID is registered, false otherwise
   */
  public static has(oid: string): boolean {
    return oid in ExtensionFactory.extensionClasses;
  }
}
