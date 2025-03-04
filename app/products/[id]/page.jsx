"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { products } from "@/lib/data"
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function ProductPage({ params }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState("m")

  const product = products.find((p) => p.id === Number.parseInt(params.id))

  if (!product) {
    return (
      <div className="container mx-auto flex h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Product Not Found</h2>
          <p className="mb-6 text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/products" className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      size,
    })
    router.push("/cart")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
          <p className="mb-4 text-2xl font-semibold">₹{product.price.toFixed(2)}</p>

          <div className="mb-6">
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium">Size</h3>
            <div className="flex gap-2">
              {["xs", "s", "m", "l", "xl"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-10 w-10 rounded-md border text-center uppercase ${
                    size === s ? "border-primary bg-primary/10 font-medium text-primary" : "border-input bg-background"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium">Quantity</h3>
            <div className="flex h-10 w-32 items-center rounded-md border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-full w-10 items-center justify-center border-r text-muted-foreground"
              >
                <Minus className="h-3 w-3" />
              </button>
              <div className="flex h-full flex-1 items-center justify-center">{quantity}</div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-full w-10 items-center justify-center border-l text-muted-foreground"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-auto flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </button>
            <button className="flex items-center justify-center rounded-md border border-input bg-background p-3 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

