export function loadPemTestAssets(modules: Record<string, string>): { name: string; value: string }[] {
  return Object.entries(modules)
    .filter(([filePath]) => !filePath.endsWith('.DS_Store'))
    .map(([filePath, raw]) => ({
      name: filePath.split('/').pop() ?? filePath,
      value: raw.replace(/-{5}(BEGIN|END) .*-{5}/gm, '').replace(/\s/gm, ''),
    }));
}
