"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  })

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 8000 ? 0 : 800
  const total = subtotal + shipping

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would process the order here
    alert("Order placed successfully! (This is a demo)")
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto flex h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Your Cart is Empty</h2>
          <p className="mb-6 text-muted-foreground">Add some products to your cart to continue shopping.</p>
          <Link href="/products" className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card shadow-sm">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex border-b p-4 last:border-0">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">Size: {item.size.toUpperCase()}</p>
                    </div>
                    <p className="text-sm font-medium">₹{item.price.toFixed(2)}</p>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex h-8 w-24 items-center rounded-md border">
                      <button
                        onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                        className="flex h-full w-8 items-center justify-center border-r text-muted-foreground"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <div className="flex h-full flex-1 items-center justify-center text-xs">{item.quantity}</div>
                      <button
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                        className="flex h-full w-8 items-center justify-center border-l text-muted-foreground"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item)}
                      className="text-sm text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-medium">Order Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p className="font-medium">₹{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Shipping</p>
                <p className="font-medium">{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</p>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <p className="font-medium">Total</p>
                  <p className="font-bold">₹{total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-1 block text-sm">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-1 block text-sm">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label htmlFor="address" className="mb-1 block text-sm">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="city" className="mb-1 block text-sm">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="mb-1 block text-sm">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="country" className="mb-1 block text-sm">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select Country</option>
                  <option value="IN">India</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

