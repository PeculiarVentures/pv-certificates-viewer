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

## Packages

| Project | Package | Version | Links |
| ------- | ------- | ------- |:-----:|
| **Web-components** | [`@peculiar/certificates-viewer`](https://www.npmjs.com/package/@peculiar/certificates-viewer) | [![version](https://img.shields.io/npm/v/@peculiar/certificates-viewer/latest.svg)](https://www.npmjs.com/package/@peculiar/certificates-viewer) | [`README.md`](packages/webcomponents/README.md)

## Contributing

Looking for places to contribute to the codebase?
First read the [contribution guidelines](CONTRIBUTING.md).