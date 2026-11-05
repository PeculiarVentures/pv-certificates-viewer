import { describe, expect, it, vi } from 'vitest';
import { runViewerDecode } from './decode';

const deferred = <T>() => {
  let resolve!: (value: T) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
};

describe('runViewerDecode', () => {
  it('reports the result', async () => {
    const onSuccess = vi.fn();

    await runViewerDecode({}, { run: () => 'a', onSuccess, onError: vi.fn() });

    expect(onSuccess).toHaveBeenCalledWith('a');
  });

  it('skips onSuccess when run returns undefined', async () => {
    const onSuccess = vi.fn();
    const onStart = vi.fn();

    await runViewerDecode({}, { run: () => undefined, onSuccess, onError: vi.fn(), onStart });

    expect(onStart).toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('ignores an older decode that finishes after a newer one', async () => {
    const owner = {};
    const slow = deferred<string>();
    const onSuccess = vi.fn();
    const onError = vi.fn();

    const first = runViewerDecode(owner, { run: () => slow.promise, onSuccess, onError });
    const second = runViewerDecode(owner, { run: () => 'new', onSuccess, onError });

    await second;
    slow.resolve('old');
    await first;

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledWith('new');
  });

  it('ignores an error from an outdated decode', async () => {
    const owner = {};
    const slow = deferred<string>();
    const onError = vi.fn();

    const first = runViewerDecode(owner, { run: () => slow.promise, onSuccess: vi.fn(), onError });

    await runViewerDecode(owner, { run: () => 'new', onSuccess: vi.fn(), onError });
    slow.reject(new Error('old'));
    await first;

    expect(onError).not.toHaveBeenCalled();
  });

  it('keeps owners independent', async () => {
    const slow = deferred<string>();
    const onSuccess = vi.fn();

    const first = runViewerDecode({}, { run: () => slow.promise, onSuccess, onError: vi.fn() });

    await runViewerDecode({}, { run: () => 'other', onSuccess, onError: vi.fn() });
    slow.resolve('mine');
    await first;

    expect(onSuccess).toHaveBeenCalledTimes(2);
  });
});
