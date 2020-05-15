# peculiar-certificate-viewer



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                      | Description                                                                                                                       | Type                    | Default     |
| -------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ----------- |
| `authKeyIdParentLink`      | `auth-key-id-parent-link`      | Authority Key Identifier extension parent link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.    | `string`                | `undefined` |
| `authKeyIdSiblingsLink`    | `auth-key-id-siblings-link`    | Authority Key Identifier extension siblings link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.  | `string`                | `undefined` |
| `certificate`              | `certificate`                  | The certificate value for decode and show details. Use PEM or DER.                                                                | `Certificate \| string` | `undefined` |
| `download`                 | `download`                     | If `true` - component will show split-button to download certificate as PEM or DER.                                               | `boolean`               | `undefined` |
| `issuerDnLink`             | `issuer-dn-link`               | Issuer DN link.                                                                                                                   | `string`                | `undefined` |
| `subjectKeyIdChildrenLink` | `subject-key-id-children-link` | Subject Key Identifier extension children link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension. | `string`                | `undefined` |
| `subjectKeyIdSiblingsLink` | `subject-key-id-siblings-link` | Subject Key Identifier extension siblings link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension. | `string`                | `undefined` |
| `view`                     | `view`                         | Choose view type instead @media.                                                                                                  | `"mobile"`              | `undefined` |


## Dependencies

### Used by

 - [peculiar-certificate-decoder](../certificate-decoder)
 - [peculiar-certificates-viewer](../certificates-viewer)

### Depends on

- [peculiar-typography](../typography)
- [peculiar-text-hider](../text-hider)
- [peculiar-button-split](../button-split)
- [peculiar-certificate-summary](../certificate-summary)

### Graph
```mermaid
graph TD;
  peculiar-certificate-viewer --> peculiar-typography
  peculiar-certificate-viewer --> peculiar-text-hider
  peculiar-certificate-viewer --> peculiar-button-split
  peculiar-certificate-viewer --> peculiar-certificate-summary
  peculiar-text-hider --> peculiar-button
  peculiar-button-split --> peculiar-button
  peculiar-certificate-summary --> peculiar-typography
  peculiar-certificate-decoder --> peculiar-certificate-viewer
  peculiar-certificates-viewer --> peculiar-certificate-viewer
  style peculiar-certificate-viewer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


