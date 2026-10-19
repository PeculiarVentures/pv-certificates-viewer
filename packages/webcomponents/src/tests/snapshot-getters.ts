import { BufferSourceConverter, Convert } from 'pvtsutils';

const EXCLUDED_GETTERS = new Set(['asn', 'raw']);

function toSnapshotValue(value: unknown): unknown {
  if (BufferSourceConverter.isBufferSource(value)) {
    return Convert.ToHex(value);
  }

  if (Array.isArray(value)) {
    return value.map(toSnapshotValue);
  }

  if (value && typeof value === 'object' && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, toSnapshotValue(item)]),
    );
  }

  return value;
}

/**
 * Evaluate every prototype getter (except the raw ASN.1 accessors) so snapshots cover data
 * the viewers render but `toMatchSnapshot` skips, such as `signature` and `publicKey`.
 */
export function snapshotGetters(instance: object): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (
    let proto = Object.getPrototypeOf(instance);
    proto && proto !== Object.prototype;
    proto = Object.getPrototypeOf(proto)
  ) {
    for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(proto))) {
      if (descriptor.get && !EXCLUDED_GETTERS.has(key) && !(key in result)) {
        result[key] = toSnapshotValue(descriptor.get.call(instance));
      }
    }
  }

  return result;
}
