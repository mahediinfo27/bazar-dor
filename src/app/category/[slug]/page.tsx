import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, type Product } from "@/lib/api";

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

function ProductCard({ product }: { product: Product }) {
    return (
        <Link
            href={`/product/${product.id}`}
            className="block rounded-2xl border border-[#dce6dd] bg-white p-4 transition hover:-translate-y-1 hover:shadow-md"
        >
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eff5ef] text-2xl">
                    {product.image}
                </div>

                <div>
                    <h3 className="font-bold text-[#27332a]">
                        {product.nameBn}
                    </h3>
                    <p className="text-xs text-gray-500">
                        {product.unit}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-extrabold text-[#263329]">
                    ৳{product.today}
                </p>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${product.change.dir === "up"
                        ? "bg-red-50 text-red-600"
                        : product.change.dir === "down"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {product.change.dir === "up"
                        ? "▲ দাম বেড়েছে"
                        : product.change.dir === "down"
                            ? "▼ দাম কমেছে"
                            : "অপরিবর্তিত"}
                </span>
            </div>
        </Link>
    );
}

export default async function CategoryPage({
    params,
}: CategoryPageProps) {
    const { slug } = await params;

    const products = await getProducts();

    const categoryProducts = products.filter(
        (product) => product.category === slug
    );

    if (categoryProducts.length === 0) {
        notFound();
    }

    const categoryName = categoryProducts[0].categoryNameBn;
    const categoryIcon = categoryProducts[0].categoryIcon;

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-10">
            <div className="mx-auto max-w-7xl">
                <Link
                    href="/"
                    className="mb-6 inline-block text-green-700 hover:underline"
                >
                    ← হোম পেজে ফিরে যাও
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-[#263329]">
                        {categoryIcon} {categoryName}
                    </h1>

                    <p className="mt-2 text-gray-600">
                        এই ক্যাটাগরির মোট {categoryProducts.length}টি পণ্য পাওয়া গেছে।
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categoryProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
}