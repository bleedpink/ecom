"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/data"
import { Filter, SlidersHorizontal } from "lucide-react"

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let result = [...products]

    if (filters.category !== "all") {
      result = result.filter((product) => product.category === filters.category)
    }

    if (filters.priceRange !== "all") {
      if (filters.priceRange === "under50") {
        result = result.filter((product) => product.price < 3000)
      } else if (filters.priceRange === "50to100") {
        result = result.filter((product) => product.price >= 3000 && product.price <= 6000)
      } else if (filters.priceRange === "over100") {
        result = result.filter((product) => product.price > 6000)
      }
    }

    setFilteredProducts(result)
  }, [filters])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Products</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm md:hidden"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Filters Sidebar */}
        <div className={`${showFilters ? "block" : "hidden"} md:block`}>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Filters</h2>
              <SlidersHorizontal className="h-4 w-4" />
            </div>

            <div className="mb-6">
              <h3 className="mb-2 text-sm font-medium">Category</h3>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="all">All Categories</option>
                <option value="bras">Bras</option>
                <option value="panties">Panties</option>
                <option value="sleepwear">Sleepwear</option>
                <option value="sets">Sets</option>
              </select>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Price Range</h3>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              >
                <option value="all">All Prices</option>
                <option value="under50">Under ₹3000</option>
                <option value="50to100">₹3000 - ₹6000</option>
                <option value="over100">Over ₹6000</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg border bg-card">
              <p className="text-muted-foreground">No products match your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

