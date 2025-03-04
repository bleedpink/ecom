import Link from "next/link"
import ProductCard from "./product-card"
import { products } from "@/lib/data"

export default function FeaturedProducts() {
  // Get 4 featured products
  const featuredProducts = products.filter((product) => product.featured).slice(0, 4)

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">Featured Products</h2>
          <p className="text-muted-foreground">Our most popular designs, loved by customers</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex rounded-md border border-primary bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}

