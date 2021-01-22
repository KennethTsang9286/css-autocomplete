import {
	CompletionItem,
	CompletionItemKind,
	CompletionItemProvider,
	Position,
	Range,
	TextDocument,
} from 'vscode';
interface StyleDict {
	[key: string]: string;
}

export class GoCompletionItemProvider implements CompletionItemProvider {
	itemList: CompletionItem[] = [];
	constructor(styleDict: StyleDict) {
		const itemList: CompletionItem[] = [];
		Object.keys(styleDict).forEach((key, index) => {
			const item = new CompletionItem(key, CompletionItemKind.Enum);
			item.detail = styleDict[key];
			item.sortText = index.toString();
			itemList.push(item);
		});
		this.itemList = itemList;
	}
	public provideCompletionItems(
		document: TextDocument,
		position: Position,
	): Thenable<CompletionItem[]> {
		const { line, character } = position;

		// cant prepend "var("
		if (character < 4) {
			return Promise.resolve([]);
		}

		const endPosition = position;
		const startPosition = new Position(line, character - 4);
		const range = new Range(startPosition, endPosition);
		const word = document.getText(range);
		if (word !== 'var(') {
			return Promise.resolve([]);
		}

		return Promise.resolve(this.itemList);
	}
}
