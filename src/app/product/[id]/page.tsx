import Link from "next/link";
import { getProducts } from "@/lib/api";
import { notFound } from "next/navigation";

interface ProductDetailsProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductDetails({
    params,
}: ProductDetailsProps) {
    const { id } = await params;

    const products = await getProducts();

    const product = products.find(
        (item) => item.id.toString() === id || item.slug === id
    );

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-10">
            <div className="mx-auto max-w-5xl">
                <Link
                    href="/"
                    className="mb-6 inline-block text-green-700 hover:underline"
                >
                    ← হোম পেজে ফিরে যাও
                </Link>

                <div className="grid gap-8 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">
                    <div className="flex min-h-72 items-center justify-center rounded-xl bg-[#f0f5f0] text-8xl">
                        {product.image}
                    </div>

                    <div>
                        <p className="mb-2 text-sm text-green-700">
                            {product.categoryNameBn}
                        </p>

                        <h1 className="mb-4 text-3xl font-bold text-gray-800">
                            {product.nameBn}
                        </h1>

                        <p className="mb-2 text-gray-500">
                            একক: {product.unit}
                        </p>

                        <p className="mb-4 text-3xl font-bold text-green-700">
                            ৳{product.today} / {product.unit}
                        </p>

                        <div className="mb-6 rounded-xl bg-gray-50 p-4">
                            <p className="mb-2 text-gray-600">
                                গতকালের দাম: ৳{product.yesterday}
                            </p>

                            <p className="mb-2 text-gray-600">
                                গত সপ্তাহের দাম: ৳{product.lastWeek}
                            </p>

                            <p className="text-gray-600">
                                গত মাসের দাম: ৳{product.lastMonth}
                            </p>
                        </div>

                        <p
                            className={`font-semibold ${product.change.dir === "up"
                                ? "text-red-600"
                                : product.change.dir === "down"
                                    ? "text-green-600"
                                    : "text-gray-500"
                                }`}
                        >
                            {product.change.dir === "up"
                                ? "▲ দাম বেড়েছে"
                                : product.change.dir === "down"
                                    ? "▼ দাম কমেছে"
                                    : "● দাম অপরিবর্তিত"}{" "}
                            ({product.change.pct}%)
                        </p>
                    </div>
                </div>

                <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
                    <h2 className="mb-5 text-2xl font-bold text-gray-800">
                        বাজারভিত্তিক দাম
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b text-gray-600">
                                    <th className="p-3">বাজার</th>
                                    <th className="p-3">বিভাগ</th>
                                    <th className="p-3">সর্বনিম্ন দাম</th>
                                    <th className="p-3">সর্বোচ্চ দাম</th>
                                </tr>
                            </thead>

                            <tbody>
                                {product.markets.map((market, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-3">{market.market}</td>
                                        <td className="p-3">{market.division}</td>
                                        <td className="p-3">৳{market.min}</td>
                                        <td className="p-3">৳{market.max}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}