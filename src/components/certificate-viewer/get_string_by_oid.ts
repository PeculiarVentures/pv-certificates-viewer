import OIDs from '../../constants/oids';

export function getStringByOID(value: string) {
  const oid = OIDs[value];

  if (oid) {
    return `${oid} (${value})`;
  }

  return value;
}
