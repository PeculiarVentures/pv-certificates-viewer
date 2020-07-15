export default function isLink(value: string): boolean {
  return value.indexOf('http') === 0;
}
