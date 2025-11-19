# Contributing

### Installation

First, ensure you have Node v22+ and the latest [npm](https://www.npmjs.com/) installed on your machine.

As an external contributor, you will have to fork Peculiar Fortify Web-components to contribute code.
Clone your fork onto your machine and then run the following commands to install dependencies:

```sh
git clone git@github.com:<username>/pv-certificates-viewer.git
cd pv-certificates-viewer
npm install
npm run build
```

## Developing

A typical contributor workflow looks like this:

1. Create a new feature branch.
1. Run `npm run dev` in the root to watch all the code and run the dev app at http://localhost:3000.
1. Write some code.
1. Ensure your code is **tested** and **linted**.
    - Add unit tests as necessary when fixing bugs or adding features; run them with `npm run test` in the relevant `packages/` directory.
    - Linting is best handled by your editor for real-time feedback. Run `npm run lint` to be 100% safe.
1. Submit a Pull Request on GitHub and fill out the template.
1. Team members will review your code and merge it after approvals.
    - You may be asked to make modifications to code style or to fix bugs you may have not noticed.
    - Please respond to comments in a timely fashion (even if to tell us you need more time).
1. Cheers, you contributed!