import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

// Mock window.navigator and location for Node.js test environment BEFORE any imports
Object.defineProperty(global, 'window', {
  value: {
    navigator: { language: 'en-US' },
    location: { href: 'http://localhost' },
  },
  writable: true,
  configurable: true,
});
