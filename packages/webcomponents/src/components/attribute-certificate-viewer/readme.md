# peculiar-attribute-certificate-viewer



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                      | Description                                                                                                                       | Type                                 | Default     |
| -------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ----------- |
| `authKeyIdParentLink`      | `auth-key-id-parent-link`      | Authority Key Identifier extension parent link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.    | `string`                             | `undefined` |
| `authKeyIdSiblingsLink`    | `auth-key-id-siblings-link`    | Authority Key Identifier extension siblings link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.  | `string`                             | `undefined` |
| `certificate`              | `certificate`                  | The certificate value for decode and show details. Use PEM or DER.                                                                | `X509AttributeCertificate \| string` | `undefined` |
| `download`                 | `download`                     | If `true` - component will show split-button to download certificate as PEM or DER.                                               | `boolean`                            | `undefined` |
| `subjectKeyIdChildrenLink` | `subject-key-id-children-link` | Subject Key Identifier extension children link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension. | `string`                             | `undefined` |
| `subjectKeyIdSiblingsLink` | `subject-key-id-siblings-link` | Subject Key Identifier extension siblings link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension. | `string`                             | `undefined` |


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
  peculiar-attribute-certificate-viewer --> peculiar-typography
  peculiar-attribute-certificate-viewer --> peculiar-text-hider
  peculiar-attribute-certificate-viewer --> peculiar-link
  peculiar-attribute-certificate-viewer --> peculiar-button-split
  peculiar-text-hider --> peculiar-button
  peculiar-button-split --> peculiar-button
  peculiar-certificate-decoder --> peculiar-attribute-certificate-viewer
  style peculiar-attribute-certificate-viewer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


