
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto mt-6 grid min-h-[284px] max-w-6xl items-center gap-6 rounded-3xl border border-[#dce7dd] bg-[#fbfdfb] px-5 py-8 md:grid-cols-[1.5fr_0.8fr] md:px-8">
      <div>
        <span className="inline-block rounded-full bg-[#e1f3e7] px-3 py-1 text-sm font-medium text-green-700">
          আজকের বাজারদর
        </span>

        <h1 className="mt-3 text-3xl font-extrabold leading-tight text-[#202b23] md:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-[#68736a] md:text-base">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
          বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং
          দামের পরিবর্তন এক জায়গায়।
        </p>

        <Link
          href="#সব-পণ্য"
          className="mt-7 inline-flex rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-800"
        >
          সব পণ্য দেখুন →
        </Link>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative flex h-48 w-full max-w-xs items-center justify-center">
          <div className="absolute bottom-2 h-6 w-52 rounded-full bg-gray-200/80 blur-sm" />

          <div className="relative text-center">
            <div className="text-8xl">🧺</div>
            <div className="mt-1 text-4xl">🍅 🥕 🥬</div>
          </div>
        </div>
      </div>
    </section>
  );
}
