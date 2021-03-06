# peculiar-certificate-decoder



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                                | Type     | Default     |
| -------------------- | --------------------- | -------------------------------------------------------------------------- | -------- | ----------- |
| `certificateExample` | `certificate-example` | The example certificate value for decode and show details. Use PEM or DER. | `string` | `undefined` |


## Dependencies

### Depends on

- [peculiar-button](../button)
- [peculiar-certificate-viewer](../certificate-viewer)
- [peculiar-attribute-certificate-viewer](../attribute-certificate-viewer)
- [peculiar-csr-viewer](../csr-viewer)

### Graph
```mermaid
graph TD;
  peculiar-certificate-decoder --> peculiar-button
  peculiar-certificate-decoder --> peculiar-certificate-viewer
  peculiar-certificate-decoder --> peculiar-attribute-certificate-viewer
  peculiar-certificate-decoder --> peculiar-csr-viewer
  peculiar-certificate-viewer --> peculiar-typography
  peculiar-certificate-viewer --> peculiar-text-hider
  peculiar-certificate-viewer --> peculiar-link
  peculiar-certificate-viewer --> peculiar-button-split
  peculiar-text-hider --> peculiar-button
  peculiar-button-split --> peculiar-button
  peculiar-attribute-certificate-viewer --> peculiar-typography
  peculiar-attribute-certificate-viewer --> peculiar-text-hider
  peculiar-attribute-certificate-viewer --> peculiar-link
  peculiar-attribute-certificate-viewer --> peculiar-button-split
  peculiar-csr-viewer --> peculiar-typography
  peculiar-csr-viewer --> peculiar-text-hider
  peculiar-csr-viewer --> peculiar-link
  peculiar-csr-viewer --> peculiar-button-split
  style peculiar-certificate-decoder fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


