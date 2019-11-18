interface ICertificate {
  subject: string;
  issuer: string;
  fingerprint: string;
  issued: string;
  expired: string;
  validity: number;
  version: number;
  serialNumber: string;
}
