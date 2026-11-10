"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/api";

export default function CategoryProducts({
    products,
}: {
    products: Product[];
}) {
    const [sortOrder, setSortOrder] = useState("default");

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "low") return a.today - b.today;
        if (sortOrder === "high") return b.today - a.today;
        return 0;
    });
    return (
        <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-gray-600">
                    মোট {products.length}টি পণ্য
                </p>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="rounded-lg border border-[#dce6dd] bg-white px-4 py-2 text-sm outline-none focus:border-green-600"
                >
                    <option value="default">ডিফল্ট সাজানো</option>
                    <option value="low">দাম: কম থেকে বেশি</option>
                    <option value="high">দাম: বেশি থেকে কম</option>
                </select>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedProducts.map((product) => (
                    <Link
                        key={product.id}
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
                ))}
            </div>
        </>
    );
}