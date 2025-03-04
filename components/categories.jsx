import Link from "next/link"
import Image from "next/image"

export default function Categories() {
  const categories = [
    {
      name: "Bras",
      image: "/placeholder.svg?height=600&width=400",
      link: "/products?category=bras",
    },
    {
      name: "Panties",
      image: "/placeholder.svg?height=600&width=400",
      link: "/products?category=panties",
    },
    {
      name: "Sleepwear",
      image: "/placeholder.svg?height=600&width=400",
      link: "/products?category=sleepwear",
    },
    {
      name: "Sets",
      image: "/placeholder.svg?height=600&width=400",
      link: "/products?category=sets",
    },
  ]

  return (
    <section className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">Shop by Category</h2>
          <p className="text-muted-foreground">Find the perfect style for every occasion</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className="group overflow-hidden rounded-lg bg-card shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

