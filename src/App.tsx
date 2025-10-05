import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"

const HomePage = lazy(() => import("@/pages/home/HomePage"))
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"))
const NotFoundPage = lazy(() => import("@/pages/not-found/NotFoundPage"))
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"))
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"))

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])


export default function App() {
  return (
    <Suspense fallback={<div className="">Cargando...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
