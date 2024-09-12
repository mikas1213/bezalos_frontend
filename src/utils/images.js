export const getImageURL = name => new URL(`../assets/images/${name}`, import.meta.url).href;
