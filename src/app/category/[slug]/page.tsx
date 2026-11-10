
import CategoryProducts from "@/app/components/CategoryProducts";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
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

        <CategoryProducts products={categoryProducts} />
      </div>
    </main>
  );
}
