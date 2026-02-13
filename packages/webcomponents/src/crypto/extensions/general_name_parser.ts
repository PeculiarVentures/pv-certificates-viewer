/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  GeneralName,
  OtherName,
  DisplayText,
  EDIPartyName,
  UserNotice,
} from '@peculiar/asn1-x509';
import { Convert, BufferSourceConverter } from 'pvtsutils';
import { AsnParser, AsnConvert } from '@peculiar/asn1-schema';

const names: Record<keyof GeneralName, string> = {
  otherName: 'Other Name',
  rfc822Name: 'RFC 822 Name',
  dNSName: 'DNS Name',
  x400Address: 'X400 Address',
  directoryName: 'Directory Name',
  ediPartyName: 'Edi Party Name ',
  uniformResourceIdentifier: 'URI',
  iPAddress: 'IP Address',
  registeredID: 'Registered ID',
};

/**
 * Parser for GeneralName to extract structured values
 */
export class GeneralNameParser {
  /**
   * Extracts an object with all GeneralName properties that are present
   * Based on the logic from general_name_part.tsx component
   */
  public static toObject(generalName: GeneralName) {
    const result = {};

    if (!generalName) {
      return result;
    }

    // Check uniformResourceIdentifier (URI)
    if (generalName.uniformResourceIdentifier) {
      result[names.uniformResourceIdentifier] = generalName.uniformResourceIdentifier;
    }

    // Check dNSName
    if (generalName.dNSName) {
      result[names.dNSName] = generalName.dNSName;
    }

    // Check rfc822Name
    if (generalName.rfc822Name) {
      result[names.rfc822Name] = generalName.rfc822Name;
    }

    // Check iPAddress
    if (generalName.iPAddress) {
      const value = BufferSourceConverter.isBufferSource(generalName.iPAddress)
        ? Convert.ToString(generalName.iPAddress)
        : generalName.iPAddress;

      result[names.iPAddress] = value;
    }

    // Check registeredID
    if (generalName.registeredID) {
      result[names.registeredID] = generalName.registeredID;
    }

    // Check directoryName
    if (generalName.directoryName) {
      result[names.directoryName] = generalName.directoryName.map((relativeDistinguishedName) => (
        relativeDistinguishedName.map((attributeTypeAndValue) => ({
          [attributeTypeAndValue.type]: attributeTypeAndValue.value.toString(),
        }))
      )).flat();
    }

    // Check otherName
    if (generalName.otherName) {
      if (generalName.otherName instanceof OtherName) {
        try {
          const text = AsnParser.parse(generalName.otherName.value, DisplayText);

          result[names.otherName] = text.toString();
        } catch {
          try {
            const text = AsnParser.parse(generalName.otherName.value, UserNotice);

            if (text.explicitText) {
              result[names.otherName] = text.explicitText.toString();
            } else {
              result[names.otherName] = Convert.ToHex(generalName.otherName.value);
            }
          } catch {
            result[names.otherName] = Convert.ToHex(generalName.otherName.value);
          }
        }
      } else {
        result[names.otherName] = Convert.ToHex(generalName.otherName.value);
      }
    }

    // Check ediPartyName
    if (generalName.ediPartyName) {
      const value = generalName.ediPartyName instanceof EDIPartyName
        ? generalName.ediPartyName.partyName.toString()
        : generalName.ediPartyName.partyName.toString();

      result[names.ediPartyName] = value;
    }

    // Check x400Address
    if (generalName.x400Address) {
      result[names.x400Address] = Convert.ToHex(AsnConvert.serialize(generalName.x400Address));
    }

    return result;
  }
}
