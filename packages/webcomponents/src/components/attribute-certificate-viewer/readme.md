# peculiar-attribute-certificate-viewer



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                      | Description                                                                                                                                            | Type                                 | Default                |
| -------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ | ---------------------- |
| `authKeyIdParentLink`      | `auth-key-id-parent-link`      | Authority Key Identifier extension parent link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.                         | `string`                             | `undefined`            |
| `authKeyIdSiblingsLink`    | `auth-key-id-siblings-link`    | Authority Key Identifier extension siblings link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.                       | `string`                             | `undefined`            |
| `certificate`              | `certificate`                  | The certificate value for decode and show details. Use PEM or DER.                                                                                     | `X509AttributeCertificate \| string` | `undefined`            |
| `download`                 | `download`                     | If `true` - component will show split-button to download certificate as PEM or DER.                                                                    | `boolean`                            | `undefined`            |
| `mobileMediaQueryString`   | `mobile-media-query-string`    | Mobile media query string to control screen view change. <br /> **NOTE**: Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia. | `string`                             | `'(max-width: 900px)'` |
| `subjectKeyIdChildrenLink` | `subject-key-id-children-link` | Subject Key Identifier extension children link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.                      | `string`                             | `undefined`            |
| `subjectKeyIdSiblingsLink` | `subject-key-id-siblings-link` | Subject Key Identifier extension siblings link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.                      | `string`                             | `undefined`            |


## Dependencies

### Used by

 - [peculiar-certificate-decoder](../certificate-decoder)

### Graph
```mermaid
graph TD;
  peculiar-certificate-decoder --> peculiar-attribute-certificate-viewer
  style peculiar-attribute-certificate-viewer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


