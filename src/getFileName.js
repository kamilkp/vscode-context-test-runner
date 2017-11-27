const vscode = require('vscode');

module.exports = function getFileName() {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const fileName = editor.document.fileName;
    if (fileName && !editor.document.isUntitled) {
      return fileName;
    } else {
      vscode.window.showWarningMessage('This file needs to be saved to disk');
    }
  } else {
    vscode.window.showWarningMessage('No file opened');
  }

  return null;
};
