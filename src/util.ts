'use strict';
import * as vscode from 'vscode';

export function getLines () {
    // Get the active text editor
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const document = editor.document;

        // Get the document text
        const documentText = document.getText();
        const lines = documentText.split('\n');
        return lines
            .map((line: string, index: number) => ({ line: line.trim(), index }))
            .filter(l => l.line && l.line.match(/\w+/));
    }
    return [];
}

export function gotoLine (lineNumber: number) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const range = editor.document.lineAt(lineNumber-1).range;
        editor.selection =  new vscode.Selection(range.start, range.start);
        editor.revealRange(range);
    }
}

export function updateHistory (context: vscode.ExtensionContext, hist: string) {
    context.globalState.update('history', hist);
}

export function getHistory (context: vscode.ExtensionContext, deflt: string = '') {
    return context.globalState.get('history') || deflt;
}
