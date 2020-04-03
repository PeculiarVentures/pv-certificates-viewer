# pv-certificate-decoder



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                                | Type     | Default     |
| -------------------- | --------------------- | -------------------------------------------------------------------------- | -------- | ----------- |
| `certificateExample` | `certificate-example` | The example certificate value for decode and show details. Use PEM or DER. | `string` | `undefined` |


## Dependencies

### Depends on

- [pv-button](../button)
- [pv-certificate-viewer](../certificate-viewer)

### Graph
```mermaid
graph TD;
  pv-certificate-decoder --> pv-button
  pv-certificate-decoder --> pv-certificate-viewer
  pv-certificate-viewer --> pv-text-hider
  pv-certificate-viewer --> pv-button-split
  pv-certificate-viewer --> pv-certificate-summary
  pv-text-hider --> pv-button
  pv-button-split --> pv-button
  style pv-certificate-decoder fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


