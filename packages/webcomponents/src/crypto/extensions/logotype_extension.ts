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
  id_pe_logotype,
} from '@peculiar/asn1-x509-logotype';
import { AsnParser } from '@peculiar/asn1-schema';
import { Convert } from 'pvtsutils';
import { OIDs } from '../../constants/oids';
import { BaseExtension } from './base_extension';
import { ExtensionFactory } from './extension_factory';

/**
 * Logotype Extension
 */
export class LogotypeExtension extends BaseExtension {
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
      const imageData: Record<string, string> = { 'Image Type': imageDetails.mediaType };

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
      const audioData: Record<string, string> = { 'Audio Type': audioDetails.mediaType };

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

  public override toJSON() {
    const content: Record<string, unknown> = { Critical: this.critical };

    const subjectLogo = this.renderLogo('Subject', this.value.subjectLogo);

    if (subjectLogo) {
      content['Subject Logo'] = this.logoDataToObject(subjectLogo);
    }

    const issuerLogo = this.renderLogo('Issuer', this.value.issuerLogo);

    if (issuerLogo) {
      content['Issuer Logo'] = this.logoDataToObject(issuerLogo);
    }

    if (this.value.communityLogos?.length) {
      content['Community Logos'] = this.value.communityLogos
        .map((logo) => this.renderLogo('Community', logo))
        .filter((logoData): logoData is Record<string, Record<string, string>[]> => !!logoData)
        .map((logoData) => this.logoDataToObject(logoData));
    }

    return this.extJson(content);
  }

  private logoDataToObject(logoData: Record<string, Record<string, string>[]>): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const [key, items] of Object.entries(logoData)) {
      result[key] = items.map((item) => {
        const itemObj: Record<string, string> = {};

        for (const [k, v] of Object.entries(item)) {
          itemObj[k] = v ?? '';
        }

        return itemObj;
      });
    }

    return result;
  }
}

ExtensionFactory.register(id_pe_logotype, LogotypeExtension);
