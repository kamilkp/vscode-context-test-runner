const vscode = require('vscode');

module.exports = function getTopLevelPythonFunction() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showWarningMessage('No editor opened');
    return null;
  }

  const currentLine = editor.selection.start.line;

  for (let line = currentLine; line >= 0; line--) {
    const { text } = editor.document.lineAt(line);
    const match = text.match(/^def\s+(\S+?)\(/);
    if (match) {
      return match[1];
    }
  }

  vscode.window.showWarningMessage('No top level function found');
  return null;
}