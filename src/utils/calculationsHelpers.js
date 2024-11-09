export const bar = (macro, grams) => {
    return macro * grams / 100;
};

export const kcal = (b, a, r) => {
    return (b*4) + (a*4) + (r*9);
};

export const set_grams = (old_prod, new_prod) => {
    const old_kcal = kcal(bar(old_prod.b_100, old_prod.grams), bar(old_prod.a_100, old_prod.grams), bar(old_prod.r_100, old_prod.grams));
    const new_kcal = kcal(new_prod.proteins, new_prod.carbs, new_prod.fat);
    const new_grams = old_kcal / new_kcal * 100;
    return new_grams;
};

export const set_grams_keitykle = (old_prod, new_prod) => {
    const old_kcal = kcal(bar(old_prod.proteins, old_prod.grams), bar(old_prod.carbs, old_prod.grams), bar(old_prod.fat, old_prod.grams));
    const new_kcal = kcal(new_prod.proteins, new_prod.carbs, new_prod.fat);
    const new_grams = old_kcal / new_kcal * 100;
    return new_kcal > 0 ? new_grams : 0;
};

export const mealProdBarSum = (products, key) => products.map(prod => bar(prod[key], prod.grams)).reduce((acc, val) => acc + val, 0);
        