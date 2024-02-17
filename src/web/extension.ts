// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('close-tabs-via-regex.close', async (arg) => {
		if (arg !== undefined && arg !== null && typeof arg !== 'string') {
			throw new Error('Expected `args` of `close-tabs-via-regex.close` to be a string.');
		}

		const regexString = arg ?? await vscode.window.showInputBox({
			placeHolder: 'RegExp e.g. spec\\.ts$',
			validateInput(value) {
				try {
					new RegExp(value);
				} catch (err) {
					return `${err}`;
				}
			},
		});

		if (!regexString) {
			return;
		}

		const regex = new RegExp(regexString);

		const allTabs = vscode.window.tabGroups.all.flatMap(tabGroup => tabGroup.tabs);
		const tabsToClose = allTabs.filter(tab => regex.test(tab.label));
		await vscode.window.tabGroups.close(tabsToClose);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
