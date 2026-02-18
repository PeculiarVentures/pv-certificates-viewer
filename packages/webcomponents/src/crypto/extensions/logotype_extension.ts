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
import {
  row, hexRow, rowGroup,
} from '../rows_format';
import type { RenderRow } from '../rows_format';
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
    const rows = [row('Critical', this.critical)];

    const subjectLogo = this.renderLogo('Subject', this.value.subjectLogo);

    if (subjectLogo) {
      rows.push(rowGroup('Subject Logo', [this.logoDataToRows(subjectLogo)]));
    }

    const issuerLogo = this.renderLogo('Issuer', this.value.issuerLogo);

    if (issuerLogo) {
      rows.push(rowGroup('Issuer Logo', [this.logoDataToRows(issuerLogo)]));
    }

    if (this.value.communityLogos?.length) {
      const communityRows = this.value.communityLogos.flatMap((logo) => {
        const logoData = this.renderLogo('Community', logo);

        return logoData ? [rowGroup('Community Logo', [this.logoDataToRows(logoData)])] : [];
      });

      rows.push(...communityRows);
    }

    return rowGroup(this.name, [rows]);
  }

  private logoDataToRows(logoData: Record<string, Record<string, string>[]>): RenderRow[] {
    const rows: RenderRow[] = [];

    for (const [key, items] of Object.entries(logoData)) {
      rows.push(rowGroup(key, items.map((item, i) => [
        rowGroup(`Item ${i + 1}`, [
          Object.entries(item).map(([k, v]) => (v && /^[0-9a-fA-F]+$/.test(v) && v.length > 20 ? hexRow(k, v) : row(k, v))),
        ]),
      ])));
    }

    return rows;
  }
}

ExtensionFactory.register(id_pe_logotype, LogotypeExtension);
