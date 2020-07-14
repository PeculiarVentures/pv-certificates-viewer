import {
  KeyUsage,
  BasicConstraints,
  ExtendedKeyUsage,
  SubjectKeyIdentifier,
  AuthorityKeyIdentifier,
  CRLDistributionPoints,
  AuthorityInfoAccessSyntax,
  SubjectAlternativeName,
} from '@peculiar/asn1-x509';

import { rowTitle } from '../row_title';
import { Extension } from '../../../crypto/extension';

import { basic } from './basic';
import { keyUsage } from './key_usage';
import { basicConstraints } from './basic_constraints';
import { extendedKeyUsage } from './extended_key_usage';
import { subjectKeyIdentifier } from './subject_key_identifier';
import { authorityKeyIdentifier } from './authority_key_identifier';
import { crlDistributionPoints } from './crl_distribution_points';
import { authorityInfoAccessSyntax } from './authority_info_access_syntax';
import { subjectAlternativeName } from './subject_alternative_name';

export function extensions(extensions: Extension[]) {
  if (!extensions || !extensions.length) {
    return null;
  }

  return ([
    rowTitle('Extensions'),
    extensions.map((extension) => {
      if (extension.value instanceof KeyUsage) {
        return keyUsage(extension, extension.value);
      }

      if (extension.value instanceof BasicConstraints) {
        return basicConstraints(extension, extension.value);
      }

      if (extension.value instanceof ExtendedKeyUsage) {
        return extendedKeyUsage(extension, extension.value);
      }

      if (extension.value instanceof SubjectKeyIdentifier) {
        return subjectKeyIdentifier(extension, extension.value);
      }

      if (extension.value instanceof AuthorityKeyIdentifier) {
        return authorityKeyIdentifier(extension, extension.value);
      }

      if (extension.value instanceof CRLDistributionPoints) {
        return crlDistributionPoints(extension, extension.value);
      }

      if (extension.value instanceof AuthorityInfoAccessSyntax) {
        return authorityInfoAccessSyntax(extension, extension.value);
      }

      if (extension.value instanceof SubjectAlternativeName) {
        return subjectAlternativeName(extension, extension.value);
      }

      return basic(extension);
    }),
  ]);
}
