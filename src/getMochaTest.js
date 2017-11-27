const vscode = require('vscode');

module.exports = function getMochaTest() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showWarningMessage('No editor opened');
    return null;
  }

  const currentLine = editor.selection.start.line;

  for (let line = currentLine; line >= 0; line--) {
    const { text } = editor.document.lineAt(line);
    const match = text.trim().match(/^(it|test|specify)\((['"`])((?:(?!\2).)+)/);
    if (match) {
      return match[3];
    }
  }

  vscode.window.showWarningMessage('No mocha test found');
  return null;
}