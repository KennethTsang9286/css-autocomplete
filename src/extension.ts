import { ExtensionContext, Hover, languages } from 'vscode';
import { GoCompletionItemProvider } from './complete';

export function activate(context: ExtensionContext) {
	const completion = languages.registerCompletionItemProvider(
		{ language: 'css' },
		new GoCompletionItemProvider(),
		'(',
	);

	context.subscriptions.push(completion);
}

export function deactivate() {}
