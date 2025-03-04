import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Providers from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Elegant Essentials | Boutique Lingerie",
  description: "Discover our collection of elegant and comfortable lingerie",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'