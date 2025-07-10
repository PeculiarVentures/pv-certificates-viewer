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
 *    import { downloadFromBuffer } from './utils';
 *
 *    downloadFromBuffer(arrayBufferValue, 'myFile', 'pdf', 'applciation/pdf');
 * ```
 */

export function downloadFromBuffer(
  value: ArrayBuffer,
  name: string,
  extension: string,
  mime = 'application/octet-stream',
) {
  const blob = new Blob([value], { type: mime });

  // @ts-expect-error - IE10+ : (has Blob, but not a[download] or URL)
  if (navigator.msSaveBlob) {
    // @ts-expect-error - IE10+ : (has Blob, but not a[download] or URL)
    navigator.msSaveBlob(blob, `${name}.${extension}`);

    return new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
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

  return new Promise<void>((resolve) => {
    setTimeout(
      () => {
        document.body.removeChild(frame);
        resolve();
      },
      100,
    );
  });
}
