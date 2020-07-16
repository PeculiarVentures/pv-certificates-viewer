interface IGeneralNameOptions {
  getDNSNameLink: (value: string) => string;
  getIPAddressLink: (value: string) => string;
}

interface ILeiOptions {
  getLEILink: (value: string) => string;
}

interface IAuthorityKeyIdentifierOptions {
  getAuthKeyIdParentLink?: (value: string) => string;
  getAuthKeyIdSiblingsLink?: (value: string) => string;
}

interface ISubjectKeyIdentifierOptions {
  getSubjectKeyIdChildrenLink?: (value: string) => string;
  getSubjectKeyIdSiblingsLink?: (value: string) => string;
}
