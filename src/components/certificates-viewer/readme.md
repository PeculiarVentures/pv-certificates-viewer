# pv-certificates-viewer



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute | Description                                                  | Type             | Default |
| -------------- | --------- | ------------------------------------------------------------ | ---------------- | ------- |
| `certificates` | --        | List of certificates values for decode and show in the list. | `ICertificate[]` | `[]`    |


## Dependencies

### Depends on

- [pv-certificate-summary](../certificate-summary)
- [pv-button](../button)
- [pv-button-split](../button-split)
- [pv-certificate-viewer](../certificate-viewer)

### Graph
```mermaid
graph TD;
  pv-certificates-viewer --> pv-certificate-summary
  pv-certificates-viewer --> pv-button
  pv-certificates-viewer --> pv-button-split
  pv-certificates-viewer --> pv-certificate-viewer
  pv-button-split --> pv-button
  pv-certificate-viewer --> pv-text-hider
  pv-certificate-viewer --> pv-certificate-summary
  pv-text-hider --> pv-button
  style pv-certificates-viewer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


