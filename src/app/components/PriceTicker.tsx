
const items = [
  { icon: "🍚", name: "স্বর্ণচিনি চাল" },
  { icon: "🍚", name: "মিনিকেট চাল" },
  { icon: "🍚", name: "বাটাম সাইজ চাল" },
  { icon: "🫘", name: "মসুর ডাল" },
  { icon: "🛢️", name: "সয়াবিন তেল" },
  { icon: "🥔", name: "আলু" },
  { icon: "🧅", name: "পেঁয়াজ" },
];

export default function PriceTicker() {
  return (
    <div className="overflow-hidden border-b border-[#dfe7df] bg-[#07351f] py-3 text-white">
      <div className="flex w-max animate-ticker">
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 border-r border-white/15 px-6 text-sm"
          >
            <span>{item.icon}</span>
            <span className="font-semibold">{item.name}</span>
            <span className="text-green-300">দাম লোড হচ্ছে</span>
          </div>
        ))}
      </div>
    </div>
  );
}
