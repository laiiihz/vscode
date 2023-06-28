/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module 'vscode' {
	// https://github.com/microsoft/vscode/issues/185269

	export interface SourceControlHistoryProvider {
		onDidChange: Event<SourceControlHistoryChangeEvent>;
		provideHistoryItems(historyItemGroupId: string, options: SourceControlHistoryOptions, token: CancellationToken): ProviderResult<SourceControlHistoryItem[]>;
		resolveHistoryItem(historyItemId: string, token: CancellationToken): ProviderResult<SourceControlHistoryItemChange[]>;
		resolveHistoryItemGroup(historyItemGroupId: string, token: CancellationToken): ProviderResult<SourceControlHistoryItemGroup>;
		resolveHistoryItemGroupCommonAncestor(historyItemGroupId1: string, historyItemGroupId2: string, token: CancellationToken): ProviderResult<SourceControlHistoryItem>;
	}

	export interface SourceControlHistoryOptions {
		readonly cursor?: string;
		readonly limit?: number | { id?: string };
	}

	export interface SourceControlHistoryChangeEvent {
		added: Iterable<SourceControlHistoryItemGroup>;
		deleted: Iterable<SourceControlHistoryItemGroup>;
		modified: Iterable<SourceControlHistoryItemGroup>;
	}

	export interface SourceControlHistoryItemGroup {
		readonly id: string;
		readonly label: string;
		readonly remote?: Partial<Omit<SourceControlHistoryItemGroup, 'remote'>>;
	}

	export interface SourceControlHistoryItem {
		readonly id: string;
		readonly icon?: ThemeIcon;
		readonly label: string;
		readonly description?: string;
		readonly timestamp?: number;
	}

	export interface SourceControlHistoryItemChange {
		readonly uri: Uri;
		readonly originalUri: Uri;
		readonly renameUri: Uri | undefined;
	}

	export interface SourceControl {
		historyProvider?: SourceControlHistoryProvider;
		historyItemGroup?: SourceControlHistoryItemGroup;
	}
}
