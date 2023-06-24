export const getImage = (image: string) => {
    if (!image) {
        return;
    }
    return new URL(`../images/${image}`, import.meta.url).href;
};