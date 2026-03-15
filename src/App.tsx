import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"

const HomePage = lazy(() => import("@/pages/home/HomePage"))
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"))
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"))
const FieldsPage = lazy(() => import("@/pages/fields/FieldsPage"))
const NotFoundPage = lazy(() => import("@/pages/not-found/NotFoundPage"))
const FieldDetailPage = lazy(() => import("@/pages/fields/FieldDetailPage"))

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/fields", element: <FieldsPage /> },
      { path: "/fields/:id", element: <FieldDetailPage /> }, // 👈 detalle
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return (
    <Suspense fallback={<div className="p-6">Cargando…</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
