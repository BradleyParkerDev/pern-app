import type { PageContent } from '@shared/types/common/index.js';
import { APIClient } from './APIClient.js';

export const contentHelper = {
	client: APIClient,

	async fetchHomePageContent(): Promise<PageContent> {
		return { page: 'Home Page', working: true };
	},

	async fetchChatPageContent(): Promise<PageContent> {
		return { page: 'Chat Page', working: true };
	},

	async fetchFriendsPageContent(): Promise<PageContent> {
		return { page: 'Friends Page', working: true };
	},

	async fetchImagesPageContent(): Promise<PageContent> {
		return { page: 'Images Page', working: true };
	},

	async fetchNewsPageContent(): Promise<PageContent> {
		return { page: 'News Page', working: true };
	},

	async fetchUserPageContent(): Promise<PageContent> {
		return { page: 'User Page', working: true };
	},

	async fetchStorePageContent(): Promise<PageContent> {
		return { page: 'Store Page', working: true };
	},
};
