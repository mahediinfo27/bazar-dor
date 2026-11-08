import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PriceTicker from "./components/PriceTicker";

const risingProducts = [
  { name: "পেঁয়াজ", icon: "🧅", price: 54, unit: "প্রতি কেজি", change: "২.৫%" },
  { name: "আদা", icon: "🫚", price: 85, unit: "প্রতি কেজি", change: "৩.০%" },
  { name: "বেগুন", icon: "🍆", price: 44, unit: "প্রতি কেজি", change: "৪.৮%" },
  { name: "কই মাছ", icon: "🐟", price: 43, unit: "প্রতি কেজি", change: "৪.৫%" },
  { name: "ডিম", icon: "🥚", price: 158, unit: "প্রতি ডজন", change: "৩.৯%" },
  { name: "মাখন (১০০ গ্রাম)", icon: "🧈", price: 145, unit: "প্রতি পিস", change: "৩.৬%" },
];

const fallingProducts = [
  { name: "আলু", icon: "🥔", price: 35, unit: "প্রতি কেজি", change: "২.১%" },
  { name: "টমেটো", icon: "🍅", price: 45, unit: "প্রতি কেজি", change: "৩.২%" },
  { name: "শসা", icon: "🥒", price: 30, unit: "প্রতি কেজি", change: "১.৮%" },
];

function ProductCard({
  product,
  falling = false,
}: {
  product: {
    name: string;
    icon: string;
    price: number;
    unit: string;
    change: string;
  };
  falling?: boolean;
}) {
  const price = new Intl.NumberFormat("bn-BD").format(product.price);

  return (
    <article className="rounded-2xl border border-[#dce6dd] bg-[#fbfdfb] p-4 transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eff5ef] text-2xl">
          {product.icon}
        </div>

        <div>
          <h3 className="font-bold text-[#27332a]">{product.name}</h3>
          <p className="text-xs text-gray-500">{product.unit}</p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="mt-1 text-lg font-extrabold text-[#263329]">
            {price} টাকা
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            falling
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {falling ? "▼" : "▲"} {product.change}
        </span>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <PriceTicker />

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
                <ProductCard key={product.name} product={product} />
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
                <ProductCard
                  key={product.name}
                  product={product}
                  falling
                />
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

            <div className="mt-5 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
              API যুক্ত হলে এখানে সব পণ্য দেখানো হবে।
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
