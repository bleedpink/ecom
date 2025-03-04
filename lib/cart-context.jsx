"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if product with same ID and size already exists in cart
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id && item.size === product.size)

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += product.quantity
        return updatedCart
      } else {
        // Add new item to cart
        return [...prevCart, product]
      }
    })
  }

  const updateQuantity = (product, quantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === product.id && item.size === product.size) {
          return { ...item, quantity }
        }
        return item
      })
    })
  }

  const removeFromCart = (product) => {
    setCart((prevCart) => {
      return prevCart.filter((item) => !(item.id === product.id && item.size === product.size))
    })
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

