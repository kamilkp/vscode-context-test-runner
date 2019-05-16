<img src="https://img.shields.io/badge/license-MIT%20License-blue.svg">

# vscode-context-test-runner 🚀

## TL;DR
<img width="1085" alt="touch bar shot 2017-11-28 at 15 34 48" src="https://user-images.githubusercontent.com/5748846/33464564-2ef40304-d643-11e7-870d-bbdc62a0a2e6.png">
Execute currently developed unit test or unit tests from current file only with a single tap on the MacBook's TouchBar. This extension is aware of the test file you have currently opened and the test spec you are currently writing.

---

While terminal and CLI is developer's favorite UI it might get annoying to have to write the same commands over and over again - especially if they are long. If you are a seasoned programmer you probably you've probably tried to make your live easier by coming up with certain aliases or funcions that they you into your `~/.bash_profile` - but this solution is also pretty limited.

If you write unit tests you are probably interested in not wasting your time by running ALL suites every time you change/add something to your test. Most of the cases you are interested in running only `THIS` test - the one you are currently working on.

This is exactly what this extension is for. **It formats your test command with any combination of filename (absolute or relative) and test name (for the latter only Python and Javascript are currently supported) and runs it in Visual Studio Code Integrated Terminal.**


## Features

There are three commands available: `test current`, `test file` and `test all`. You can configure how the test command for each of the three cases is formatted. Note that you can use workspace settings to have different commands for a project written in Python and different for a project written in Javascript.

Command pallette
--

<img width="586" alt="screen shot 2017-12-01 at 02 53 44" src="https://user-images.githubusercontent.com/5748846/33464563-2ecf9b7c-d643-11e7-9758-c3b2e12100e6.png">

TouchBar
--

<img width="1085" alt="touch bar shot 2017-11-28 at 15 34 48" src="https://user-images.githubusercontent.com/5748846/33464564-2ef40304-d643-11e7-870d-bbdc62a0a2e6.png">

Those commands open up an Integrated Terminal window (or focus it when one was already opened) and run a propely formatted test command.

## Extension Settings

Here is the list of this extension's settings with their default values:

```javascript
  // Show 'Run current test' option on touch bar
  "context-test-runner.showTouchBarRunTestsFromFile": true,

  // Show 'Run tests from current file' option on touch bar
  "context-test-runner.showTouchBarRunCurrentTest": true,

  // Show 'Run all tests' option on touch bar
  "context-test-runner.showTouchBarRunAllTests": true,

  // Test command. e.g.: 'npm test -- --fgrep {testname};
  "context-test-runner.testCurrentCommand": "echo 'You need to set up your test command for context-test-runner'",

  // Test command. e.g.: 'TEST_FILE={filename.absolute} npm test'
  "context-test-runner.testFromFileCommand": "echo 'You need to set up your test command for context-test-runner'",

  // Test command. e.g.: 'npm test'
  "context-test-runner.testAllCommand": "echo 'You need to set up your test command for context-test-runner'",
```

## Example configurations

Javascript
--

```json
"context-test-runner.testAllCommand": "npm test",
"context-test-runner.testCurrentCommand": "TEST_PATH=\"{filename.absolute}\" TEST_NAME=\"{testname}\" npm test",
"context-test-runner.testFromFileCommand": "TEST_PATH=\"{filename.absolute}\" npm test"
```

Note that in case of this example you have to handle `TEST_PATH` and `TEST_NAME` environmental variables on your own in your test runner script.

Python
--

```json
"context-test-runner.testAllCommand": "pytest",
"context-test-runner.testCurrentCommand": "pytest {filename.relative}::{testname}",
"context-test-runner.testFromFileCommand": "pytest {filename.relative}"
```

## Installation

Either install this extension from the Marketplace or clone this repo in `~/.vscode/extensions` directory and run `npm install` there.

## Contributions

Feel free to contribute to this extension by submitting a PR to this repository. All PRs are welcome.
