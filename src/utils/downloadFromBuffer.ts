/**
 * Download from buffer
 *
 * @example
 * ```js
 *    import { downloadFromBuffer } from 'ui-utils';
 *
 *    downloadFromBuffer(arrayBufferValue, 'applciation/pdf', 'myFile', 'pdf', 100);
 * ```
 */

function downloadFromBuffer(
  value: string | ArrayBuffer,
  mime: string,
  name: string,
  extension: string,
  delay?: number,
  ) {
  const fileName = `${name}.${extension}`;
  let key = '';

  if (typeof value !== 'string') {
    const blob = new Blob([value], { type: mime });

    if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
      navigator.msSaveBlob(blob, fileName);

      return new Promise(res => setTimeout(res, delay || 0));
    }

    key = window.URL.createObjectURL(blob);
  } else {
    key = `data:${mime};charset=utf-8,${encodeURIComponent(value)}`;
  }

  const link = document.createElement('a');

  link.style.display = 'none';
  link.href = key;
  link.download = fileName;
  document.body.appendChild(link);
  link.dispatchEvent(new MouseEvent('click'));
  document.body.removeChild(link);

  const revokeObjectURL = (resolve: () => void) => {
    if (/^blob:/.test(key)) {
      window.URL.revokeObjectURL(key);
    }

    resolve();
  };

  return new Promise(resolve => setTimeout(() => revokeObjectURL(resolve), delay || 0));
}

export default downloadFromBuffer;
