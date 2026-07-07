export interface IViewerDecodeConfig<TDecoded> {
  run: () => Promise<TDecoded | undefined> | TDecoded | undefined;
  onSuccess: (decoded: TDecoded) => Promise<void> | void;
  onError: (error: unknown) => void;
  setLoading: (isLoading: boolean) => void;
  onStart?: () => void;
}

export async function runViewerDecode<TDecoded>(config: IViewerDecodeConfig<TDecoded>) {
  config.setLoading(true);
  config.onStart?.();

  try {
    const decoded = await config.run();

    if (typeof decoded === 'undefined') {
      return;
    }

    await config.onSuccess(decoded);
  } catch (error) {
    config.onError(error);
  } finally {
    config.setLoading(false);
  }
}
