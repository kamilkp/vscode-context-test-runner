const vscode                    = require('vscode');
const path                      = require('path');
const { getTerminal }           = require('./src/terminal');
const getFileName               = require('./src/getFileName');
const getMochaTest              = require('./src/getMochaTest');
const getTopLevelPythonFunction = require('./src/getTopLevelPythonFunction');

function getFileDetails(filename) {
  const absolute = filename;
  let relative = null;

  if (vscode.workspace.workspaceFolders[0]) {
    relative = path.relative(vscode.workspace.workspaceFolders[0].uri.path, filename);
  }

  return { absolute, relative };
}

function formatCommand(template, params) {
  return template.replace(/\{filename\.absolute\}/g, params.absolute)
                 .replace(/\{filename\.relative\}/g, params.relative)
                 .replace(/\{testname}/g, params.testname)
}

function executeInIntegratedTerminal(commandTemplateName, testname) {
  const config = vscode.workspace.getConfiguration('context-test-runner');
  const { absolute, relative } = getFileDetails(getFileName());

  const terminal = getTerminal();
  terminal.show();
  terminal.sendText(formatCommand(config[commandTemplateName], { absolute, relative, testname }), true);
}

function runCurrentTest() {
  const { activeTextEditor } = vscode.window;
  if (activeTextEditor) {
    const { languageId } = activeTextEditor.document;
    let testname;
    if (languageId === 'javascript') {
      testname = getMochaTest();
    } else if (languageId === 'python') {
      testname = getTopLevelPythonFunction();
    } else {
      vscode.window.showWarningMessage('context-test-runner supports only Javascript and Python');
    }

    if (testname) {
      executeInIntegratedTerminal('testCurrentCommand', testname);
    } else {
      vscode.window.showWarningMessage('No test found');
    }
  } else {
    vscode.window.showWarningMessage('No editor opened');
  }
}

function runTestsFromFile() {
  executeInIntegratedTerminal('testFromFileCommand');
}

function runAllTests() {
  executeInIntegratedTerminal('testAllCommand');
}

function activate(context) {
  console.log('context-test-runner extension active');

  context.subscriptions.push(
    vscode.commands.registerCommand("context-test-runner.cmd.runCurrentTest",   runCurrentTest),
    vscode.commands.registerCommand("context-test-runner.tbr.runCurrentTest",   runCurrentTest),
    vscode.commands.registerCommand("context-test-runner.cmd.runTestsFromFile", runTestsFromFile),
    vscode.commands.registerCommand("context-test-runner.tbr.runTestsFromFile", runTestsFromFile),
    vscode.commands.registerCommand("context-test-runner.cmd.runAllTests",      runAllTests),
    vscode.commands.registerCommand("context-test-runner.tbr.runAllTests",      runAllTests)
  );
}

exports.activate = activate;

function deactivate() {
  console.log('context-test-runner extension deactivated');
}

exports.deactivate = deactivate;
