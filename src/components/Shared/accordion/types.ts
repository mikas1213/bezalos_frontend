type SubItem = { text: string };
export type Color = {
    bgColor: string,
    textColor: string,
    activeColor: string
}
export type Properties = {
    colors: Color,
    bulletPoint: string,
    subBulletPoint: string,
};

export type Item = { text: string, subItems?: SubItem[] };
export type Row = { title: string, items: Item[] };
export type AccordionData = {
    properties: Properties,
    rows: Row[]
};
