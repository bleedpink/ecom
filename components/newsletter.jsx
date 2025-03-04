"use client"

import { useState } from "react"
import { Send } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this to your backend
    setSubmitted(true)
  }

  return (
    <section className="bg-primary/5 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-2 text-3xl font-bold">Join Our Newsletter</h2>
          <p className="mb-6 text-muted-foreground">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>

          {submitted ? (
            <div className="rounded-lg bg-primary/10 p-4 text-primary">
              <p className="font-medium">Thank you for subscribing!</p>
              <p className="text-sm">We've sent a confirmation email to your inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 rounded-l-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="inline-flex items-center rounded-r-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Subscribe
                <Send className="ml-2 h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

