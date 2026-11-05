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

/** The decode state every viewer keeps as `@State` fields. */
export interface IViewerDecodeState<TDecoded> {
  certificateDecoded?: TDecoded;
  certificateDecodeError?: Error;
}

/** Decodes into `viewer.certificateDecoded`, or sets `viewer.certificateDecodeError`. */
export function decodeIntoViewer<TDecoded>(
  viewer: IViewerDecodeState<TDecoded>,
  run: IViewerDecodeConfig<TDecoded>['run'],
) {
  return runViewerDecode<TDecoded>(viewer, {
    onStart: () => {
      viewer.certificateDecodeError = undefined;
    },
    run,
    onSuccess: (decoded) => {
      viewer.certificateDecoded = decoded;
    },
    onError: (error) => {
      viewer.certificateDecodeError = error as Error;
      console.error('Error certificate parse:', error);
    },
  });
}

/** An instance is used as is, a string is decoded, anything else means "nothing to show". */
export function toDocument<T>(value: unknown, Type: new (raw: string) => T): T | undefined {
  if (value instanceof Type) {
    return value;
  }

  if (typeof value === 'string') {
    return new Type(value);
  }

  return undefined;
}
