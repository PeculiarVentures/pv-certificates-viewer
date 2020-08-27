/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable */
/* tslint:disable */
import { createReactComponent } from './react-component-lib';

import { JSX } from '@peculiar/certificates-viewer';

export const PeculiarCertificateViewer = /*@__PURE__*/createReactComponent<JSX.PeculiarCertificateViewer, HTMLPeculiarCertificateViewerElement>('peculiar-certificate-viewer');
export const PeculiarCertificatesViewer = /*@__PURE__*/createReactComponent<JSX.PeculiarCertificatesViewer, HTMLPeculiarCertificatesViewerElement>('peculiar-certificates-viewer');
export const PeculiarCertificateDecoder = /*@__PURE__*/createReactComponent<JSX.PeculiarCertificateDecoder, HTMLPeculiarCertificateDecoderElement>('peculiar-certificate-decoder');
