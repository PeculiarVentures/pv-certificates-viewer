function parseHash(hash: string = window.location.hash): Record<string, any> {
  if (!hash.length) {
    return {};
  }

  const pairs: string[] = hash.replace(/^(#|\?)?\/?/, '').split('&');
  const result: Record<string, string> = {};

  for (let i = 0; i < pairs.length; i += 1) {
    const pair: string[] = pairs[i].split('=');

    try {
      result[pair[0]] = pair[1] && decodeURIComponent(pair[1]);
    } catch (error) {
      console.warn(error);
    }
  }

  return result;
}

export default parseHash;
