export interface ServiceDetail {
    id: number;
    icon: string;
    title: string;
    desc: string;
}

export interface Service {
    id: string;
    title: string;
    slug: string;
    grid_desc: string | null;
    basic_desc: string | null;
    details: ServiceDetail[];
    quantity: number;
    sort: number;
    is_active: 'On' | 'Off';
    // pg NUMERIC stulpelius grąžina kaip string
    base_price: string;
    current_price: string;
    discount: number;
    image_s: string | null;
    image_m: string | null;
    category: string;
    status: string | null;
    created_at: string;
    updated_at: string;
}
