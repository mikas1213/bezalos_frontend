export interface HeaderProps {
	selectedCategory: string | null;
	selectedTag: string | null;
	searchQuery: string;
	videosTotal: number;
	videosDisplayed: number;
	onCategoryChange: (category: string | null) => void;
	onTagChange: (tag: string | null) => void;
	onSearchChange: (query: string) => void;
}
