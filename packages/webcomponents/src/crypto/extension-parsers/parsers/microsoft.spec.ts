/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  id_certificateTemplate,
  id_enrollCertType,
  id_caVersion,
} from '@peculiar/asn1-x509-microsoft';
import { id_msCRLNextPublish } from '../../extensions/microsoft_crl_next_publish';
import { makeExtRaw } from '../../../tests/test_utils';
import { dateShort } from '../../../utils';
import {
  CertificateTemplateParser,
  EnrollCertTypeParser,
  CaVersionParser,
  CRLNextPublishParser,
} from './microsoft';

describe('CertificateTemplateParser', () => {
  const parser = new CertificateTemplateParser();

  it('registers correct OID', () => {
    expect(parser.oids).toEqual([id_certificateTemplate]);
  });

  it('parses CertificateTemplate with versions', () => {
    // templateID=1.3.6.1.4.1.311.21.8.1.2, majorVersion=2, minorVersion=0
    expect(parser.parse(makeExtRaw(
      id_certificateTemplate,
      '3013060b2b06010401823715080102020102020100',
    ))).toEqual({
      oid: id_certificateTemplate,
      critical: false,
      children: [
        {
          title: 'Template ID', value: '1.3.6.1.4.1.311.21.8.1.2',
        },
        {
          title: 'Major Version', value: 2,
        },
        {
          title: 'Minor Version', value: 0,
        },
      ],
    });
  });
});

describe('EnrollCertTypeParser', () => {
  const parser = new EnrollCertTypeParser();

  it('registers correct OID', () => {
    expect(parser.oids).toEqual([id_enrollCertType]);
  });

  it('parses EnrollCertType BMPString', () => {
    // BMPString 'WebServer' = 1e12 005700650062005300650072007600650072
    expect(parser.parse(makeExtRaw(
      id_enrollCertType,
      '1e12005700650062005300650072007600650072',
    ))).toEqual({
      oid: id_enrollCertType,
      critical: false,
      children: [{
        title: 'Template Name', value: 'WebServer',
      }],
    });
  });
});

describe('CaVersionParser', () => {
  const parser = new CaVersionParser();

  it('registers correct OID', () => {
    expect(parser.oids).toEqual([id_caVersion]);
  });

  it('parses CaVersion integer into readable version', () => {
    // INTEGER 0x00010000 => V0.1
    expect(parser.parse(makeExtRaw(id_caVersion, '020400010000'))).toEqual({
      oid: id_caVersion,
      critical: false,
      children: [
        {
          title: 'Version', value: 'V0.1',
        },
      ],
    });
  });
});

describe('CRLNextPublishParser', () => {
  const parser = new CRLNextPublishParser();

  it('registers correct OID', () => {
    expect(parser.oids).toEqual([id_msCRLNextPublish]);
  });

  it('parses CRL Next Publish date', () => {
    // GeneralizedTime 20260707100000Z
    expect(parser.parse(makeExtRaw(
      id_msCRLNextPublish,
      '180F32303236303730373130303030305A',
    ))).toEqual({
      oid: id_msCRLNextPublish,
      critical: false,
      children: [{
        title: 'Next Publish', value: dateShort('2026-07-07T10:00:00.000Z'),
      }],
    });
  });
});
