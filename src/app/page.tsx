
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PriceTicker from "./components/PriceTicker";
import { getProducts, type Product } from "@/lib/api";
import Link from "next/link";

function getUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };

  return units[unit] || unit;
}

function ProductCard({
  product,
}: {
  product: Product;
}) {
  const price = new Intl.NumberFormat("bn-BD").format(product.today);
  const change = new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(Math.abs(product.change.pct));

  const isFalling = product.change.dir === "down";

  return (
  <Link href={`/product/${product.id}`} className="block">
    <article className="rounded-2xl border border-[#dce6dd] bg-[#fbfdfb] p-4 transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eff5ef] text-2xl">
          {product.image}
        </div>

        <div>
          <h3 className="font-bold text-[#27332a]">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500">
            {getUnit(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="mt-1 text-lg font-extrabold text-[#263329]">
            {price} টাকা
          </p>
        </div>

        {product.change.dir !== "flat" && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isFalling
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {isFalling ? "▼" : "▲"} {change}%
          </span>
        )}

        {product.change.dir === "flat" && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
            অপরিবর্তিত
          </span>
        )}
      </div>
    </article>
  </Link>
);
}

export default async function Home() {
  const products = await getProducts();

  const risingProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <Navbar />
      <PriceTicker products={products} />

      <main className="min-h-screen bg-[#f0f5f0] pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <Hero />

          <section className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-[#263329]">
              <span className="text-red-600">▲</span>
              আজ দাম বেড়েছে
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {risingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-extrabold text-[#263329]">
              <span className="text-green-600">▼</span>
              আজ দাম কমেছে
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {fallingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          <section id="সব-পণ্য" className="mt-12 scroll-mt-32">
            <h2 className="text-2xl font-extrabold text-[#263329]">
              সব পণ্য
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              সব নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক জায়গায়।
            </p>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
