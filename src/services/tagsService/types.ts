export type Feature = 'all' | 'virtuve' | 'receptai';
export interface TagsRequestDto {
	feature: Feature;
}
export interface TagsResponseDto {
	categories: string[];
	tags: string[];
}
