import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import FeaturedProducts from "@/components/featured-products"
import Categories from "@/components/categories"
import Newsletter from "@/components/newsletter"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <Image src="/placeholder.svg?height=1080&width=1920" alt="Hero Image" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Elegant Essentials
          </h1>
          <p className="mb-8 max-w-md text-lg text-white">
            Discover our new collection designed for comfort and confidence
          </p>
          <Link
            href="/products"
            className="group inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:bg-pink-100"
          >
            Shop Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Categories */}
      <Categories />

      {/* Newsletter */}
      <Newsletter />
    </main>
  )
}

