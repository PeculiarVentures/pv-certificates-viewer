/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  LogotypeExtn,
  LogotypeInfo,
  LogotypeImage,
  LogotypeAudio,
} from '@peculiar/asn1-x509-logotype';
import { AsnParser } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import { OIDs } from '../../constants/oids';
import { BaseExtension } from './base_extension';

/**
 * Logotype Extension
 */
export class LogotypeExtension extends BaseExtension {
  public static override readonly NAME = 'Logotype';

  public readonly value: LogotypeExtn;

  constructor(raw: BufferSource) {
    super(raw);

    const asnExtnValue = this.asn.extnValue.buffer;

    this.value = AsnParser.parse<LogotypeExtn>(asnExtnValue, LogotypeExtn);
  }

  private renderImage(
    image?: LogotypeImage[],
  ): Record<string, string>[] | undefined {
    if (!image || image.length === 0) {
      return undefined;
    }

    return image.map((img) => {
      const { imageDetails } = img;
      const imageData: Record<string, string> = {
        'Image Type': imageDetails.mediaType,
      };

      if (imageDetails.logotypeHash && imageDetails.logotypeHash.length > 0) {
        const hashAlgOid = imageDetails.logotypeHash[0].hashAlg.algorithm;
        const hashAlgName = OIDs[hashAlgOid] || hashAlgOid;

        imageData['Image Hash Algorithm'] = hashAlgName;
        imageData['Image Hash'] = Convert.ToHex(
          imageDetails.logotypeHash[0].hashValue,
        );
      }

      if (imageDetails.logotypeURI && imageDetails.logotypeURI.length > 0) {
        imageData['Image URL'] = imageDetails.logotypeURI[0];
      }

      return imageData;
    });
  }

  private renderAudio(
    audio?: LogotypeAudio[],
  ): Record<string, string>[] | undefined {
    if (!audio || audio.length === 0) {
      return undefined;
    }

    return audio.map((aud) => {
      const { audioDetails } = aud;
      const audioData: Record<string, string> = {
        'Audio Type': audioDetails.mediaType,
      };

      if (audioDetails.logotypeHash && audioDetails.logotypeHash.length > 0) {
        const hashAlgOid = audioDetails.logotypeHash[0].hashAlg.algorithm;
        const hashAlgName = OIDs[hashAlgOid] || hashAlgOid;

        audioData['Audio Hash Algorithm'] = hashAlgName;
        audioData['Audio Hash'] = Convert.ToHex(
          audioDetails.logotypeHash[0].hashValue,
        );
      }

      if (audioDetails.logotypeURI && audioDetails.logotypeURI.length > 0) {
        audioData['Audio URL'] = audioDetails.logotypeURI[0];
      }

      return audioData;
    });
  }

  private renderLogo(
    _title: string,
    info?: LogotypeInfo,
  ): Record<string, Record<string, string>[]> | undefined {
    if (!info || !info.direct) {
      return undefined;
    }

    const logoData: Record<string, Record<string, string>[]> = {};

    const images = this.renderImage(info.direct.image);

    if (images) {
      logoData.Images = images;
    }

    const audios = this.renderAudio(info.direct.audio);

    if (audios) {
      logoData.Audio = audios;
    }

    return Object.keys(logoData).length > 0 ? logoData : undefined;
  }

  public override toJSON(): Record<
    string,
    string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]
  > {
    const result: Record<string, unknown> = {
      Name: LogotypeExtension.NAME,
      Critical: this.critical ? 'Yes' : 'No',
    };

    const subjectLogo = this.renderLogo('Subject', this.value.subjectLogo);

    if (subjectLogo) {
      result['Subject Logo'] = subjectLogo;
    }

    const issuerLogo = this.renderLogo('Issuer', this.value.issuerLogo);

    if (issuerLogo) {
      result['Issuer Logo'] = issuerLogo;
    }

    if (this.value.communityLogos && this.value.communityLogos.length > 0) {
      const communityLogosData: Record<string, Record<string, string>[]>[] = [];

      this.value.communityLogos.forEach((logo) => {
        const logoData = this.renderLogo('Community', logo);

        if (logoData) {
          communityLogosData.push(logoData as Record<string, Record<string, string>[]>);
        }
      });

      if (communityLogosData.length > 0) {
        result['Community Logos'] = communityLogosData;
      }
    }

    return result as Record<
      string,
      string | number | boolean | Record<string, string | number | boolean | Record<string, string>[]>[]
    >;
  }
}
