export interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
    markets: {
        market: string;
        division: string;
        min: number;
        max: number;
    }[];
}

export const BASE_URL =
    "https://openapi.programming-hero.com/api/bazardor";

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/products`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("পণ্যের তথ্য লোড করা যায়নি");
    }

    return response.json();
}
