# pv-certificate-viewer



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                      | Description                                                                                                                       | Type      | Default     |
| -------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `authKeyIdParentLink`      | `auth-key-id-parent-link`      | Authority Key Identifier extension parent link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.    | `string`  | `undefined` |
| `authKeyIdSiblingsLink`    | `auth-key-id-siblings-link`    | Authority Key Identifier extension siblings link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.  | `string`  | `undefined` |
| `certificate`              | `certificate`                  | The certificate value for decode and show details. Use PEM or DER.                                                                | `string`  | `undefined` |
| `download`                 | `download`                     | If `true` - component will show split-button to download certificate as PEM or DER.                                               | `boolean` | `undefined` |
| `issuerDnLink`             | `issuer-dn-link`               | Issuer DN link.                                                                                                                   | `string`  | `undefined` |
| `subjectKeyIdChildrenLink` | `subject-key-id-children-link` | Subject Key Identifier extension children link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension. | `string`  | `undefined` |
| `subjectKeyIdSiblingsLink` | `subject-key-id-siblings-link` | Subject Key Identifier extension siblings link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension. | `string`  | `undefined` |


## Dependencies

### Used by

 - [pv-certificates-viewer](../certificates-viewer)

### Depends on

- [pv-text-hider](../text-hider)
- [pv-button-split](../button-split)
- [pv-certificate-summary](../certificate-summary)

### Graph
```mermaid
graph TD;
  pv-certificate-viewer --> pv-text-hider
  pv-certificate-viewer --> pv-button-split
  pv-certificate-viewer --> pv-certificate-summary
  pv-text-hider --> pv-button
  pv-button-split --> pv-button
  pv-certificates-viewer --> pv-certificate-viewer
  style pv-certificate-viewer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


