/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, Host } from '@stencil/core';
import type { IViewerDecodeState } from './decode';
import { Typography } from '../typography';

interface IRenderViewerOptions<TDecoded> {
  viewer: IViewerDecodeState<TDecoded>;
  /** e.g. "certificate", "certificate revocation list". */
  subject: string;
  body: (decoded: TDecoded) => unknown;
}

/** Error and empty states, then the viewer table. Shared by all detail viewers. */
export function renderViewer<TDecoded>({ viewer, subject, body }: IRenderViewerOptions<TDecoded>) {
  if (viewer.certificateDecodeError) {
    return (
      <div class="status_wrapper">
        <Typography>There was an error decoding this {subject}.</Typography>
      </div>
    );
  }

  if (!viewer.certificateDecoded) {
    return (
      <div class="status_wrapper">
        <Typography>There is no {subject} available.</Typography>
      </div>
    );
  }

  return (
    <Host>
      <table>{body(viewer.certificateDecoded)}</table>
    </Host>
  );
}
