import { ExtensionContext, languages } from 'vscode';
import { GoCompletionItemProvider } from './complete';
import { getIsEligibleAndStyleDict } from './getIsEligibleAndStyleDict';

export async function activate(context: ExtensionContext) {
	const isEligibleAndStyleDict = await getIsEligibleAndStyleDict();

	if (!isEligibleAndStyleDict) {
		return;
	}

	const styleDict = isEligibleAndStyleDict;

	const completion = languages.registerCompletionItemProvider(
		{ language: 'css', scheme: 'file' },
		new GoCompletionItemProvider(styleDict),
		'(',
	);

	context.subscriptions.push(completion);
}

export function deactivate() {}
