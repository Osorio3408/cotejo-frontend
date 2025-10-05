import { Outlet } from "react-router-dom"
import Navbar from "@/components/common/Navbar"
import Footer from "@/components/common/Footer"

export default function AppLayout() {
  return (
    <div className="min-h-dvh bg-main-bg text-gray-300">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
