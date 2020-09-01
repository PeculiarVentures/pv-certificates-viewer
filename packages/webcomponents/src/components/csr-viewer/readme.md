# peculiar-csr-viewer



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                      | Description                                                                                                                       | Type            | Default     |
| -------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | --------------- | ----------- |
| `certificate`              | `certificate`                  | The certificate value for decode and show details. Use PEM or DER.                                                                | `CSR \| string` | `undefined` |
| `download`                 | `download`                     | If `true` - component will show split-button to download certificate as PEM or DER.                                               | `boolean`       | `undefined` |
| `subjectKeyIdChildrenLink` | `subject-key-id-children-link` | Subject Key Identifier extension children link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension. | `string`        | `undefined` |
| `subjectKeyIdSiblingsLink` | `subject-key-id-siblings-link` | Subject Key Identifier extension siblings link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension. | `string`        | `undefined` |
| `view`                     | `view`                         | Choose view type instead @media.                                                                                                  | `"mobile"`      | `undefined` |


## Dependencies

### Used by

 - [peculiar-certificate-decoder](../certificate-decoder)

### Depends on

- [peculiar-typography](../typography)
- [peculiar-text-hider](../text-hider)
- [peculiar-link](../link)
- [peculiar-button-split](../button-split)

### Graph
```mermaid
graph TD;
  peculiar-csr-viewer --> peculiar-typography
  peculiar-csr-viewer --> peculiar-text-hider
  peculiar-csr-viewer --> peculiar-link
  peculiar-csr-viewer --> peculiar-button-split
  peculiar-text-hider --> peculiar-button
  peculiar-button-split --> peculiar-button
  peculiar-certificate-decoder --> peculiar-csr-viewer
  style peculiar-csr-viewer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


