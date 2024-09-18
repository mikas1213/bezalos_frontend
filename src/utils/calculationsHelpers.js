export const bar = (macro, grams) => {
    return macro * grams / 100;
};

export const kcal = (b, a, r) => {
    return (b*4) + (a*4) + (r*9);
};