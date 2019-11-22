# pv-certificate-viewer



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type     | Default     |
| ------------- | ------------- | ----------- | -------- | ----------- |
| `certificate` | `certificate` |             | `string` | `undefined` |


## Dependencies

### Used by

 - [pv-certificates-viewer](../certificates-viewer)

### Depends on

- [pv-text-hider](../text-hider)
- [pv-certificate-summary](../certificate-summary)

### Graph
```mermaid
graph TD;
  pv-certificate-viewer --> pv-text-hider
  pv-certificate-viewer --> pv-certificate-summary
  pv-text-hider --> pv-button
  pv-certificates-viewer --> pv-certificate-viewer
  style pv-certificate-viewer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
