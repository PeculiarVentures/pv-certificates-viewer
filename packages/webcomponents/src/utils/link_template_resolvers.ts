/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface ILinkTemplateProps {
  authKeyIdParentLink?: string;
  authKeyIdSiblingsLink?: string;
  subjectKeyIdChildrenLink?: string;
  subjectKeyIdSiblingsLink?: string;
  issuerDnLink?: string;
}

export interface ILinkTemplateResolvers {
  getAuthKeyIdParentLink: (value: string) => string | undefined;
  getAuthKeyIdSiblingsLink: (value: string) => string | undefined;
  getSubjectKeyIdChildrenLink: (value: string) => string | undefined;
  getSubjectKeyIdSiblingsLink: (value: string) => string | undefined;
  getIssuerDnLink: () => string | undefined;
}

export function buildLinkTemplateResolvers(props: ILinkTemplateProps): ILinkTemplateResolvers {
  return {
    getAuthKeyIdParentLink: (v) => props.authKeyIdParentLink?.replace('{{authKeyId}}', v),
    getAuthKeyIdSiblingsLink: (v) => props.authKeyIdSiblingsLink?.replace('{{authKeyId}}', v),
    getSubjectKeyIdChildrenLink: (v) => props.subjectKeyIdChildrenLink?.replace('{{subjectKeyId}}', v),
    getSubjectKeyIdSiblingsLink: (v) => props.subjectKeyIdSiblingsLink?.replace('{{subjectKeyId}}', v),
    getIssuerDnLink: () => props.issuerDnLink,
  };
}
