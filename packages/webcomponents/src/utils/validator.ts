/* eslint-disable no-useless-escape */
export default {
  isHex: (value: string) => /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/
    .test(value),
  isPem: (value: string) => /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/
    .test(value),
  isBase64: (value: string) => {
    try {
      window.atob(value);
      return true;
    } catch (error) {
      return false;
    }
  },
};
