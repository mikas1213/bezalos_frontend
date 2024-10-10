export const bar = (macro, grams) => {
    return macro * grams / 100;
};

export const kcal = (b, a, r) => {
    return (b*4) + (a*4) + (r*9);
};

export const mealProdBarSum = (products, key) => products.map(prod => bar(prod[key], prod.grams)).reduce((acc, val) => acc + val, 0);
        