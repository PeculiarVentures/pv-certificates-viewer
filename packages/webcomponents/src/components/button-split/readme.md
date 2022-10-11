# peculiar-button-split



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                          | Default     |
| --------- | --------- | ----------- | ----------------------------- | ----------- |
| `actions` | --        |             | `IAction[]`                   | `[]`        |
| `fill`    | `fill`    |             | `"fill" \| "stroke"`          | `'stroke'`  |
| `onClick` | --        |             | `(event: MouseEvent) => void` | `undefined` |


## Dependencies

### Used by

 - [peculiar-attribute-certificate-viewer](../attribute-certificate-viewer)
 - [peculiar-certificate-viewer](../certificate-viewer)
 - [peculiar-certificates-viewer](../certificates-viewer)
 - [peculiar-crl-viewer](../crl-viewer)
 - [peculiar-csr-viewer](../csr-viewer)

### Depends on

- [peculiar-button](../button)

### Graph
```mermaid
graph TD;
  peculiar-button-split --> peculiar-button
  peculiar-attribute-certificate-viewer --> peculiar-button-split
  peculiar-certificate-viewer --> peculiar-button-split
  peculiar-certificates-viewer --> peculiar-button-split
  peculiar-crl-viewer --> peculiar-button-split
  peculiar-csr-viewer --> peculiar-button-split
  style peculiar-button-split fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


