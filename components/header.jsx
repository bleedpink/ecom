"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingBag, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function Header() {
  const pathname = usePathname()
  const { cart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Elegant<span className="text-primary">Essentials</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/"
                className={`text-sm ${pathname === "/" ? "font-medium text-primary" : "text-foreground hover:text-primary"}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={`text-sm ${pathname.startsWith("/products") ? "font-medium text-primary" : "text-foreground hover:text-primary"}`}
              >
                Products
              </Link>
            </li>
          </ul>
        </nav>

        {/* Cart Icon */}
        <Link href="/cart" className="relative rounded-full p-2 hover:bg-accent">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Mobile Menu Button */}
        <button className="ml-2 rounded-md p-2 md:hidden" onClick={() => setIsMenuOpen(true)}>
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold" onClick={() => setIsMenuOpen(false)}>
                Elegant<span className="text-primary">Essentials</span>
              </Link>
              <button className="rounded-md p-2" onClick={() => setIsMenuOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-8">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className={`block text-lg ${pathname === "/" ? "font-medium text-primary" : "text-foreground"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className={`block text-lg ${pathname.startsWith("/products") ? "font-medium text-primary" : "text-foreground"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    className={`block text-lg ${pathname === "/cart" ? "font-medium text-primary" : "text-foreground"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cart {totalItems > 0 && `(${totalItems})`}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

