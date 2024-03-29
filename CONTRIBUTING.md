# Contributing to React Native Segmented Control

## Development Process

All work on React Native SegmentedControl happens directly on GitHub. Contributors send pull requests which go through a review process.

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

1. Fork the repo and create your branch from `master` (a guide on [how to fork a repository](https://help.github.com/articles/fork-a-repo/)).
2. Run `pnpm install` to install all required dependencies.
3. Now you are ready to make your changes!

## Tests & Verifications

Currently we use `flow` for typechecking, `eslint` with `prettier` for linting and formatting the code, and `jest` for unit testing. We also use `detox` for end-to-end testing. All of these are run on Github Actions for all opened pull requests, but you should use them locally when making changes.

- `pnpm test`: Run all tests and validations.
- `pnpm lint`: Run `eslint`.
- `pnpm lint --fix`: Run `eslint` and automatically fix issues. This is useful for correcting code formatting.
- `pnpm flow`: Run `flow` typechecking.
  <!-- * `pnpm test:jest`: Run unit tests with `jest`. -->
  <!-- * `pnpm test:detox:<android|ios>:build:<debug|release>`: Build the `debug` or `release` app for end-to-end tests with `detox` on either `android` or `ios`. You need to run this before running the test command and whenever you make changes to the native code. -->
  <!-- * `pnpm test:detox:<android|ios>:test:<debug|release>`: Run the `debug` or `release` end-to-end tests with `detox` on either `android` or `ios`. -->

## Sending a pull request

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that all tests and validations are passing.
- Follow the pull request template when opening a pull request.

## Commit message convention

We prefix our commit messages with one of the following to signify the kind of change:

- **build**: Changes that affect the build system or external dependencies.
- **ci**, **chore**: Changes to our CI configuration files and scripts.
- **docs**: Documentation only changes.
- **feat**: A new feature.
- **fix**: A bug fix.
- **perf**: A code change that improves performance.
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **style**: Changes that do not affect the meaning of the code.
- **test**: Adding missing tests or correcting existing tests.

## Release process

We use [Semantic Release](http://semantic-release.org) to automatically release new versions of the library when changes are merged into master. Using the commit message convention described above, it will detect if we need to release a patch, minor, or major version of the library.

## Reporting issues

You can report issues on our [bug tracker](https://github.com/react-native-segmented-control/segmented-control/issues). Please search for existing issues and follow the issue template when opening an issue.

## License

By contributing to React Native Segmented Control, you agree that your contributions will be licensed under the **MIT** license.
