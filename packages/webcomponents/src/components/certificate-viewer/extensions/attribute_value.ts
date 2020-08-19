import { Convert } from 'pvtsutils';
import { Attribute } from '@peculiar/asn1-x509';

export function getAttributeValue(attribute: Attribute) {
  return Convert.ToString(attribute.values[0]);
}
