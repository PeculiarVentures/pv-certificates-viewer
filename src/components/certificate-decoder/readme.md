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

### Graph
```mermaid
graph TD;
  peculiar-certificate-decoder --> peculiar-button
  peculiar-certificate-decoder --> peculiar-certificate-viewer
  peculiar-certificate-viewer --> peculiar-typography
  peculiar-certificate-viewer --> peculiar-text-hider
  peculiar-certificate-viewer --> peculiar-button-split
  peculiar-certificate-viewer --> peculiar-certificate-summary
  peculiar-text-hider --> peculiar-button
  peculiar-button-split --> peculiar-button
  peculiar-certificate-summary --> peculiar-typography
  style peculiar-certificate-decoder fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


