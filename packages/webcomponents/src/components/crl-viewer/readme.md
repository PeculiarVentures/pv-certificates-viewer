# peculiar-crl-viewer



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                   | Description                                                                                                                                            | Type                | Default                |
| ------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- | ---------------------- |
| `authKeyIdParentLink`    | `auth-key-id-parent-link`   | Authority Key Identifier extension parent link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.                         | `string`            | `undefined`            |
| `authKeyIdSiblingsLink`  | `auth-key-id-siblings-link` | Authority Key Identifier extension siblings link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.                       | `string`            | `undefined`            |
| `certificate`            | `certificate`               | The certificate value for decode and show details. Use PEM or DER.                                                                                     | `X509Crl \| string` | `undefined`            |
| `download`               | `download`                  | If `true` - component will show split-button to download certificate as PEM or DER.                                                                    | `boolean`           | `undefined`            |
| `issuerDnLink`           | `issuer-dn-link`            | Issuer DN link. **NOTE**: HTML component attribute must be `issuer-dn-link`.                                                                           | `string`            | `undefined`            |
| `mobileMediaQueryString` | `mobile-media-query-string` | Mobile media query string to control screen view change. <br /> **NOTE**: Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia. | `string`            | `'(max-width: 900px)'` |


## Dependencies

### Used by

 - [peculiar-certificate-decoder](../certificate-decoder)

### Graph
```mermaid
graph TD;
  peculiar-certificate-decoder --> peculiar-crl-viewer
  style peculiar-crl-viewer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


