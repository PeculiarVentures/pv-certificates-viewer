interface IGeneralNameOptions {
  getDNSNameLink: (value: string) => string;
  getIPAddressLink: (value: string) => string;
}

interface ILeiOptions {
  getLEILink: (value: string) => string;
}
