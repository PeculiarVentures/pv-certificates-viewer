export default function queryStringify(options: Record<string, any>): string {
  const parameters: string[] = [];

  Object.keys(options).forEach((o) => {
    if (
      typeof options[o] === 'string'
      || typeof options[o] === 'boolean'
      || typeof options[o] === 'number'
    ) {
      parameters.push(`${o}=${encodeURIComponent(options[o])}`);
    }
  });

  return parameters.join('&');
}
