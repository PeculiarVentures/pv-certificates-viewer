Object.defineProperty(global, 'window', {
  value: {
    navigator: { language: 'en-US' },
    location: { href: 'http://localhost' },
  },
  writable: true,
  configurable: true,
});

export {};
