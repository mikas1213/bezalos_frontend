export const getImageURL = (img_url) => {
    const url = new URL(`../assets/images/${img_url}`, import.meta.url).href;
    return url;
};

export const getImageFromBlob = (img, type) => {
    const blob = new Blob([new Uint8Array(img?.data)], { type });
    return URL.createObjectURL(blob);
};
