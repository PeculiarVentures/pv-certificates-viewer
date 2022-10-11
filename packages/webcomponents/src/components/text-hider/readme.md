# peculiar-text-hider



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type      | Default |
| -------- | --------- | ----------- | --------- | ------- |
| `opened` | `opened`  |             | `boolean` | `false` |


## Events

| Event        | Description | Type               |
| ------------ | ----------- | ------------------ |
| `textExpand` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [peculiar-attribute-certificate-viewer](../attribute-certificate-viewer)
 - [peculiar-certificate-viewer](../certificate-viewer)
 - [peculiar-crl-viewer](../crl-viewer)
 - [peculiar-csr-viewer](../csr-viewer)

### Depends on

- [peculiar-button](../button)

### Graph
```mermaid
graph TD;
  peculiar-text-hider --> peculiar-button
  peculiar-attribute-certificate-viewer --> peculiar-text-hider
  peculiar-certificate-viewer --> peculiar-text-hider
  peculiar-crl-viewer --> peculiar-text-hider
  peculiar-csr-viewer --> peculiar-text-hider
  style peculiar-text-hider fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


