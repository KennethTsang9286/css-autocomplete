import * as fs from 'fs';
import { join } from 'path';
import { Uri, workspace } from 'vscode';
import { logger } from './logger';

export const getIsEligibleAndStyleDict = async () => {
	const attributeRegex = /--([\w-]+): ([^;]+);/g;
	const targetCssRelativePath =
		'node_modules/@ofx-com/fox.design-tokens/design-tokens.css';
	const rootUri = workspace.workspaceFolders![0].uri;
	const targetCssUri = Uri.parse(join(rootUri.fsPath, targetCssRelativePath));
	if (!fs.existsSync(targetCssUri.fsPath)) {
		return false;
	}

	const targetCssText = (await workspace.fs.readFile(targetCssUri)).toString();
	const dict: { [key: string]: string } = {};
	let match;
	while ((match = attributeRegex.exec(targetCssText))) {
		dict[match[1]] = match[2];
	}

	logger.info(`length of attributes = ${Object.keys(dict).length}`);

	return dict;
};
