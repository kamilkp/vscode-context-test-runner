const vscode = require('vscode');

let _terminal = null;
module.exports.getTerminal = () => {
  if (_terminal) {
    return _terminal;
  }

  _terminal = vscode.window.createTerminal();
  vscode.window.onDidCloseTerminal((t) => {
    if (_terminal === t) {
      _terminal = null;
    }
  });

  return _terminal;
};
