# peculiar-crl-viewer



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                   | Description                                                                                                                      | Type            | Default     |
| ----------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------- | ----------- |
| `authKeyIdParentLink`   | `auth-key-id-parent-link`   | Authority Key Identifier extension parent link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.   | `string`        | `undefined` |
| `authKeyIdSiblingsLink` | `auth-key-id-siblings-link` | Authority Key Identifier extension siblings link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension. | `string`        | `undefined` |
| `certificate`           | `certificate`               | The certificate value for decode and show details. Use PEM or DER.                                                               | `CRL \| string` | `undefined` |
| `download`              | `download`                  | If `true` - component will show split-button to download certificate as PEM or DER.                                              | `boolean`       | `undefined` |
| `issuerDnLink`          | `issuer-dn-link`            | Issuer DN link. **NOTE**: HTML component attribute must be `issuer-dn-link`.                                                     | `string`        | `undefined` |
| `view`                  | `view`                      | Choose view type instead @media.                                                                                                 | `"mobile"`      | `undefined` |


## Dependencies

### Used by

 - [peculiar-certificate-decoder](../certificate-decoder)

### Depends on

- [peculiar-typography](../typography)

### Graph
```mermaid
graph TD;
  peculiar-crl-viewer --> peculiar-typography
  peculiar-certificate-decoder --> peculiar-crl-viewer
  style peculiar-crl-viewer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


