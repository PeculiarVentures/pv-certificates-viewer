# peculiar-certificate-decoder



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute             | Description                                                                | Type                                  | Default     |
| --------------------- | --------------------- | -------------------------------------------------------------------------- | ------------------------------------- | ----------- |
| `certificateExamples` | --                    | The example certificate value for decode and show details. Use PEM or DER. | `{ title: string; value: string; }[]` | `undefined` |
| `defaultCertificate`  | `default-certificate` | The default certificate value for decode and show details. Use PEM or DER. | `string`                              | `undefined` |


## Events

| Event              | Description                                                | Type                  |
| ------------------ | ---------------------------------------------------------- | --------------------- |
| `clearCertificate` | Emitted when the certificate has been removed.             | `CustomEvent<void>`   |
| `successParse`     | Emitted when the certificate has been successfully parsed. | `CustomEvent<string>` |


## Dependencies

### Depends on

- [peculiar-certificate-viewer](../certificate-viewer)
- [peculiar-attribute-certificate-viewer](../attribute-certificate-viewer)
- [peculiar-csr-viewer](../csr-viewer)
- [peculiar-crl-viewer](../crl-viewer)

### Graph
```mermaid
graph TD;
  peculiar-certificate-decoder --> peculiar-certificate-viewer
  peculiar-certificate-decoder --> peculiar-attribute-certificate-viewer
  peculiar-certificate-decoder --> peculiar-csr-viewer
  peculiar-certificate-decoder --> peculiar-crl-viewer
  style peculiar-certificate-decoder fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


