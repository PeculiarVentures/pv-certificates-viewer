# Peculiar Certificates Viewer

[![CircleCI](https://circleci.com/gh/PeculiarVentures/pv-certificates-viewer.svg?style=svg)](https://circleci.com/gh/PeculiarVentures/pv-certificates-viewer)

Peculiar Certificate Viewer makes it easy for you to display certificate related details in your web application.

It includes two components:

**1. Display a table of certificates**

![image](https://user-images.githubusercontent.com/1619279/69567071-6ba44100-0f6d-11ea-9be5-863483bae511.png)

**NOTE**: If you do not provide a "Name" value when invocing the component it will take the first Subject CN value.

**NOTE**: If you do not provide a "Test URLs" this column will be ommited from the rendered page.

**NOTE**: If the supplied certificates are self-signed the issuer column will be ommited.

**2. Display a specific certificate**

![image](https://user-images.githubusercontent.com/1619279/69567112-81b20180-0f6d-11ea-8f50-155ca05fa795.png)

These components are built with [asn1-schema](https://github.com/PeculiarVentures/asn1-schema) so all decoding happens in pure Javascript.  The components have been designed to be responsive, themeable and easy to use.

You may also be interested in our web component for viewing and verifying signed PDFs, you can find it at https://verify.ink.

## Examples

- [Root CAs](https://understandingwebpki.com/examples.html#root-cas)
- [Subordinate CAs](https://understandingwebpki.com/examples.html#subordinate-cas)
- [Certificate details](https://understandingwebpki.com/examples.html#certificate-details)

### Supported Schemas

- Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile ([rfc5280](https://tools.ietf.org/html/rfc5280)).
- PKCS #10: Certification Request Syntax Specification ([rfc2986](https://tools.ietf.org/html/rfc2986)).
- An Internet Attribute Certificate Profile for Authorization ([rfc5755](https://tools.ietf.org/html/rfc5755)).

### Supported Extensions

- Adobe Archive Rev Info (1.2.840.113583.1.1.9.2).
- Adobe Time-stamp (1.2.840.113583.1.1.9.1).
- Authority Key Identifier (2.5.29.35).
- Basic Constraints (2.5.29.19).
- Biometric Info (1.3.6.1.5.5.7.1.2).
- CRL Distribution Points (2.5.29.31).
- CRL Reason (2.5.29.21).
- Certificate Authority Information Access (1.3.6.1.5.5.7.1.1).
- Certificate Issuer (2.5.29.29).
- Certificate Policies (2.5.29.32).
- Certificate Transparency (1.3.6.1.4.1.11129.2.4.2).
- Entrust Version Info (1.2.840.113533.7.65.0).
- Extended Key Usage (2.5.29.37).
- Freshest CRL (2.5.29.46).
- Inhibit Any Policy (2.5.29.54).
- Invalidity Date (2.5.29.24).
- Issuer Alternative Name (2.5.29.18).
- Key Usage (2.5.29.15).
- Legal Entity Identifier (1.3.6.1.4.1.52266.1).
- Microsoft Certificate Template (1.3.6.1.4.1.311.21.7).
- Microsoft Certificate Type (1.3.6.1.4.1.311.20.2).
- Microsoft Certification Authority Renewal (1.3.6.1.4.1.311.21.1).
- Name Constraints (2.5.29.30).
- Netscape Certificate Type (2.16.840.1.113730.1.1).
- Netscape Comment (2.16.840.1.113730.1.13).
- Personal Data Info (2.16.724.1.2.2.4.1).
- Policy Constraints (2.5.29.36).
- Policy Mappings (2.5.29.33).
- Private Key Usage Period (2.5.29.16).
- Qualified Certificate Statements (1.3.6.1.5.5.7.1.3).
- Role (1.3.6.1.4.1.52266.2).
- Subject Alternative Name (2.5.29.17).
- Subject Directory Attributes (2.5.29.9).
- Subject Key Identifier (2.5.29.14).

### Supported Attributes

- Challenge Password (1.2.840.113549.1.9.7).
- DNB Legal representative (0.4.0.9496.2).
- DNB Main Activity Description (0.4.0.9496.6).
- Domain Name Beneficiary (0.4.0.9496.1).
- Domain Name Owner (0.4.0.9496.3).
- Domain Name Technical Operator (0.4.0.9496.4).
- Extension Request (1.2.840.113549.1.9.14).
- GDPR compliance attestation reference (0.4.0.9496.7).
- Insurance coverage attestation (0.4.0.9496.8).
- Type of relationship between DNB/DNO/DNT (0.4.0.9496.5).
- Unstructured Name (1.2.840.113549.1.9.2).
- Valuation ranking (0.4.0.9496.9).

## Packages

| Project | Package | Version | Links |
| ------- | ------- | ------- |:-----:|
| **Web-components** | [`@peculiar/certificates-viewer`](https://www.npmjs.com/package/@peculiar/certificates-viewer) | [![version](https://img.shields.io/npm/v/@peculiar/certificates-viewer/latest.svg)](https://www.npmjs.com/package/@peculiar/certificates-viewer) | [`README.md`](packages/webcomponents/README.md)
| **Web-components React** | [`@peculiar/certificates-viewer-react`](https://www.npmjs.com/package/@peculiar/certificates-viewer-react) | [![version](https://img.shields.io/npm/v/@peculiar/certificates-viewer-react/latest.svg)](https://www.npmjs.com/package/@peculiar/certificates-viewer-react) | [`README.md`](packages/webcomponents-react/README.md)

## Contributing

Looking for places to contribute to the codebase?
First read the [contribution guidelines](CONTRIBUTING.md).