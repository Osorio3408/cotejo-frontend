import { Outlet } from "react-router-dom"
import Navbar from "@/components/common/Navbar"
import Footer from "@/components/common/Footer"
import ScrollToTop from "@/components/common/ScrollToTop"

export default function AppLayout() {
  return (
    <div className="min-h-dvh bg-main-bg text-gray-300">
      <ScrollToTop />
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
