export type Feature = 'virtuve' | 'receptai';
export interface TagsRequestDto {
	feature: Feature;
}
export interface TagsResponseDto {
	categories: string[];
	tags: string[];
}
