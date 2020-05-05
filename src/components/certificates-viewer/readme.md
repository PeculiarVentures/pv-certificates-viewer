# peculiar-certificates-viewer



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                                                                                                                                                                                                                                                                                                                                                                   | Type             | Default |
| --------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- |
| `certificates`        | --                      | List of certificates values for decode and show in the list. <br /> **NOTE**: If you do not provide a `name` value when invocing the component it will take the first Subject CN value. <br /> **NOTE**: If you do not provide a `tests` this column will be ommited from the rendered page. <br /> **NOTE**: If the supplied certificates are self-signed the issuer column will be ommited. | `ICertificate[]` | `[]`    |
| `filterWithSearch`    | `filter-with-search`    | Use filter in the list when search is changed.                                                                                                                                                                                                                                                                                                                                                | `boolean`        | `true`  |
| `highlightWithSearch` | `highlight-with-search` | Use highlight chapters in the list when search is changed.                                                                                                                                                                                                                                                                                                                                    | `boolean`        | `true`  |


## Dependencies

### Depends on

- [peculiar-certificate-summary](../certificate-summary)
- [peculiar-button](../button)
- [peculiar-highlight-words](../highlight-words)
- [peculiar-button-split](../button-split)
- [peculiar-certificate-viewer](../certificate-viewer)
- [peculiar-circular-progress](../circular-progress)

### Graph
```mermaid
graph TD;
  peculiar-certificates-viewer --> peculiar-certificate-summary
  peculiar-certificates-viewer --> peculiar-button
  peculiar-certificates-viewer --> peculiar-highlight-words
  peculiar-certificates-viewer --> peculiar-button-split
  peculiar-certificates-viewer --> peculiar-certificate-viewer
  peculiar-certificates-viewer --> peculiar-circular-progress
  peculiar-button-split --> peculiar-button
  peculiar-certificate-viewer --> peculiar-text-hider
  peculiar-certificate-viewer --> peculiar-button-split
  peculiar-certificate-viewer --> peculiar-certificate-summary
  peculiar-text-hider --> peculiar-button
  style peculiar-certificates-viewer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


