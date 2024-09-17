export const getImageURL = (img_url) => {
    const url = new URL(`../assets/images/${img_url}`, import.meta.url).href;
    console.log('cia', url)
    return url;
};
