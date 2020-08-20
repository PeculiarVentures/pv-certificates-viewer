import { defineCustomElements } from '@peculiar/certificates-viewer/loader';

export * from './components';

// TODO: defineCustomElements() is asyncronous
// We need to use the promise
if (typeof window !== 'undefined') {
  defineCustomElements(window);
}
