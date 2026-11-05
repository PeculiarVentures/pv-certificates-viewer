export interface IViewerDecodeConfig<TDecoded> {
  run: () => Promise<TDecoded | undefined> | TDecoded | undefined;
  onSuccess: (decoded: TDecoded) => void;
  onError: (error: unknown) => void;
  onStart?: () => void;
}

const latestDecodeId = new WeakMap<object, number>();

/**
 * Runs a decode for `owner` (the component instance). Only the latest call per owner may report its
 * result, so a slow earlier decode can't overwrite a newer one.
 */
export async function runViewerDecode<TDecoded>(
  owner: object,
  config: IViewerDecodeConfig<TDecoded>,
) {
  const id = (latestDecodeId.get(owner) ?? 0) + 1;
  const isLatest = () => latestDecodeId.get(owner) === id;

  latestDecodeId.set(owner, id);
  config.onStart?.();

  try {
    const decoded = await config.run();

    if (isLatest() && typeof decoded !== 'undefined') {
      config.onSuccess(decoded);
    }
  } catch (error) {
    if (isLatest()) {
      config.onError(error);
    }
  }
}
