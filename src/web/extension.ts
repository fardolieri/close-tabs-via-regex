// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "close-tabs-via-regex" is now active in the web extension host!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('close-tabs-via-regex.close', async (regexString) => {
		// The code you place here will be executed every time your command is executed

		regexString ??= await vscode.window.showInputBox({
			placeHolder: 'RegExp e.g. spec\\.ts$',
			validateInput(value) {
				try {
					new RegExp(value);
				} catch (err) {
					return `${err}`;
				}
			},
		});

		if (!regexString) { return; }

		const regex = new RegExp(regexString);

		const allTabs = vscode.window.tabGroups.all.flatMap(tabGroup => tabGroup.tabs);
		const tabsToClose = allTabs.filter(tab => regex.test(tab.label));
		await vscode.window.tabGroups.close(tabsToClose);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
