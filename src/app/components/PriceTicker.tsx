
import type { Product } from "@/lib/api";

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  return (
    <div className="overflow-hidden border-b border-[#dfe7df] bg-white py-3 text-gray-800">
      <div className="flex w-max animate-ticker">
        {[...products, ...products].map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex items-center gap-2 border-r border-gray-200 px-6 text-sm"
          >
            <span>{item.categoryIcon}</span>

            <span className="font-semibold whitespace-nowrap">
              {item.nameBn}
            </span>

            <span className="whitespace-nowrap font-medium text-gray-700">
              {item.today.toLocaleString("bn-BD")} টাকা/{item.unit}
            </span>

            <span
              className={`whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold ${
                item.change.dir === "up"
                  ? "bg-red-50 text-red-600"
                  : item.change.dir === "down"
                    ? "bg-green-50 text-green-600"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              {item.change.dir === "up"
                ? "▲"
                : item.change.dir === "down"
                  ? "▼"
                  : "−"}{" "}
              {Math.abs(item.change.pct).toLocaleString("bn-BD")}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
