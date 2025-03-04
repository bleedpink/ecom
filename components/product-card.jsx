import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"

export default function ProductCard({ product }) {
  return (
    <div className="product-card group relative overflow-hidden rounded-lg bg-card shadow-sm transition-all">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.isNew && (
            <div className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
              New
            </div>
          )}
          <button className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-muted-foreground backdrop-blur-sm transition-colors hover:text-primary">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-medium">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
          <p className="mt-2 font-semibold">₹{product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  )
}

