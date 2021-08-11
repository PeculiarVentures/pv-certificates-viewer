/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import {
  LogotypeExtn,
  LogotypeInfo,
  LogotypeImage,
  LogotypeAudio,
} from '@peculiar/asn1-x509-logotype';
import { Convert } from 'pvtsutils';

import { RowValue } from '../row';
import { Extension } from '../../../crypto/extension';
import { getStringByOID } from '../get_string_by_oid';

import { BasicExtension } from './basic_extension';

interface ILogotypeExtensionProps {
  extension: Extension<LogotypeExtn>;
}

export const LogotypeExtension: FunctionalComponent<ILogotypeExtensionProps> = (props) => {
  const { extension } = props;

  const renderImage = (image?: LogotypeImage[]) => {
    if (!image) {
      return null;
    }

    return image.map((img) => {
      const { imageDetails } = img;

      return [
        <RowValue
          name="Image Type"
          value={imageDetails.mediaType}
        />,
        <RowValue
          name="Image Hash"
          value={Convert.ToHex(imageDetails.logotypeHash[0].hashValue)}
          monospace
        />,
        <RowValue
          name="Image URL"
          value={imageDetails.logotypeURI[0]}
          monospace
          collapse
        />,
        <RowValue
          name="Image Hash Algorithm"
          value={getStringByOID(imageDetails.logotypeHash[0].hashAlg.algorithm)}
        />,
      ];
    });
  };

  const renderAudio = (audio?: LogotypeAudio[]) => {
    if (!audio) {
      return null;
    }

    return audio.map((aud) => {
      const { audioDetails } = aud;

      return [
        <RowValue
          name="Audio Type"
          value={audioDetails.mediaType}
        />,
        <RowValue
          name="Audio Hash"
          value={Convert.ToHex(audioDetails.logotypeHash[0].hashValue)}
          monospace
        />,
        <RowValue
          name="Audio URL"
          value={audioDetails.logotypeURI[0]}
          monospace
          collapse
        />,
        <RowValue
          name="Audio Hash Algorithm"
          value={getStringByOID(audioDetails.logotypeHash[0].hashAlg.algorithm)}
        />,
      ];
    });
  };

  const renderLogo = (title: string, info?: LogotypeInfo) => {
    if (!info || !info.direct) {
      return null;
    }

    const { image, audio } = info.direct;

    return [
      <RowValue
        name="Type"
        value={title}
      />,
      renderImage(image),
      renderAudio(audio),
      <tr>
        <td />
        <td />
      </tr>,
    ];
  };

  return (
    <BasicExtension
      extension={extension}
    >
      {renderLogo('Subject', extension.value.subjectLogo)}
      {renderLogo('Issuer', extension.value.issuerLogo)}
    </BasicExtension>
  );
};
