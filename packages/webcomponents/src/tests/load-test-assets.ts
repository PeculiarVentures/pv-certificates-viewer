const pemByPath = import.meta.glob('../e2e/**/test_assets/*', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function normalizePem(text: string): string {
  return text.replace(/-{5}(BEGIN|END) .*-{5}/gm, '').replace(/\s/gm, '');
}

/** Fixtures under `src/e2e/<folder>/test_assets/`, as stored on disk. */
export function loadRawTestAssets(e2eFolder: string): { name: string; value: string }[] {
  const prefix = `../e2e/${e2eFolder}/test_assets/`;

  return Object.entries(pemByPath)
    .filter(([path]) => path.startsWith(prefix))
    .map(([path, content]) => ({
      name: path.slice(prefix.length),
      value: content,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** PEM/DER fixtures under `src/e2e/<folder>/test_assets/`. */
export function loadPemTestAssets(e2eFolder: string): { name: string; value: string }[] {
  return loadRawTestAssets(e2eFolder).map(({ name, value }) => ({
    name,
    value: normalizePem(value),
  }));
}
