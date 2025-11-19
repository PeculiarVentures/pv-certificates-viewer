# peculiar-certificates-viewer



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                   | Description                                                                                                                                                                                                                                                                                                                                                                                   | Type             | Default                |
| ------------------------ | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ---------------------- |
| `certificates`           | --                          | List of certificates values for decode and show in the list. <br /> **NOTE**: If you do not provide a `name` value when invocing the component it will take the first Subject CN value. <br /> **NOTE**: If you do not provide a `tests` this column will be ommited from the rendered page. <br /> **NOTE**: If the supplied certificates are self-signed the issuer column will be ommited. | `ICertificate[]` | `[]`                   |
| `filterWithSearch`       | `filter-with-search`        | Use filter in the list when search is changed.                                                                                                                                                                                                                                                                                                                                                | `boolean`        | `true`                 |
| `highlightWithSearch`    | `highlight-with-search`     | Use highlight chapters in the list when search is changed.                                                                                                                                                                                                                                                                                                                                    | `boolean`        | `true`                 |
| `mobileMediaQueryString` | `mobile-media-query-string` | Mobile media query string to control screen view change. <br /> **NOTE**: Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia.                                                                                                                                                                                                                                        | `string`         | `'(max-width: 900px)'` |


## Events

| Event          | Description                                            | Type                           |
| -------------- | ------------------------------------------------------ | ------------------------------ |
| `detailsClose` | Emitted when the user close certificate details modal. | `CustomEvent<void>`            |
| `detailsOpen`  | Emitted when the user open certificate details modal.  | `CustomEvent<X509Certificate>` |


## Shadow Parts

| Part                       | Description |
| -------------------------- | ----------- |
| `"presentation"`           |             |
| `"presentation_container"` |             |


## Dependencies

### Depends on

- [peculiar-button-menu](../button-menu)
- [peculiar-highlight-words](../highlight-words)
- [peculiar-certificate-viewer](../certificate-viewer)
- [peculiar-circular-progress](../circular-progress)

### Graph
```mermaid
graph TD;
  peculiar-certificates-viewer --> peculiar-button-menu
  peculiar-certificates-viewer --> peculiar-highlight-words
  peculiar-certificates-viewer --> peculiar-certificate-viewer
  peculiar-certificates-viewer --> peculiar-circular-progress
  style peculiar-certificates-viewer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


