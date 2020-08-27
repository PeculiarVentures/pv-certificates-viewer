/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Download from buffer
 *
 * @example
 * ```js
 *    import { downloadFromBuffer } from 'ui-utils';
 *
 *    downloadFromBuffer(arrayBufferValue, 'applciation/pdf', 'myFile', 'pdf');
 * ```
 */

export default function downloadFromBuffer(
  value: ArrayBuffer,
  mime: string = 'application/octet-stream',
  name: string,
  extension: string,
) {
  const blob = new Blob([value], { type: mime });

  if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
    navigator.msSaveBlob(blob, `${name}.${extension}`);

    return new Promise((res) => setTimeout(res, 100));
  }

  const blobURL = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  const frame = document.createElement('iframe');

  link.style.display = 'none';
  frame.style.display = 'none';

  frame.name = blobURL;
  document.body.appendChild(frame);

  link.href = blobURL;
  link.target = blobURL;
  link.download = `${name}.${extension}`;
  document.body.appendChild(link);
  link.dispatchEvent(new MouseEvent('click'));
  document.body.removeChild(link);

  return new Promise((res) => setTimeout(
    () => {
      document.body.removeChild(frame);
      res();
    },
    100,
  ));
}
