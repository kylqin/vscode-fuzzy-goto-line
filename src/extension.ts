"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { getLines, gotoLine, getHistory, updateHistory } from "./util";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  let disposable_inputstring = vscode.commands.registerCommand(
    "extension.fuzzyGotoLine",
    async (path) => {
      const filteredLines = getLines();
      const choices: (vscode.QuickPickItem & { index: number })[] = filteredLines.map((l) => ({
        label: l.line,
        index: l.index,
      }));
      const quickPick = vscode.window.createQuickPick<vscode.QuickPickItem & { index: number }>();

      quickPick.value = getHistory(context, 'd') as string;
      quickPick.items = choices;
      quickPick.onDidChangeValue((value: string) => {
        updateHistory(context, value)
      });
      quickPick.onDidChangeSelection((selection) => {
        // console.log('selection ->', selection);
        gotoLine((selection[0] as any).index + 1);
        quickPick.hide();
      });
      quickPick.onDidHide(() => quickPick.dispose());
      quickPick.show();
      // let choice: string | vscode.QuickPickItem | undefined = await vscode.window.showQuickPick(
      //     choices,
      //     {
      //         matchOnDescription: true,
      //         matchOnDetail: true
      //     }
      // );
      // if (choice === undefined) {
      //     return;
      // }
      // console.log('selected line: ', choice);
      // // await vscode.commands.executeCommand('workbench.action.gotoLine', choice.index as number);
      // filter.gotoLine(choice.index! + 1);
      // context.subscriptions.push(filter);
    }
  );

  context.subscriptions.push(disposable_inputstring);
}

// this method is called when your extension is deactivated
export function deactivate() {}
