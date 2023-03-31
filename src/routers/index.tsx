import { lazy, Suspense, ReactNode } from "react"
import { createBrowserRouter, RouteObject } from "react-router-dom"
import LoadingComponent from "@/components/Loading"
import LayoutPage from "@/layout"

const Pics = lazy(() => import("@/views/Pics"))
const Uploader = lazy(() => import("@/views/Uploader"))
const Error404 = lazy(() => import("@/views/error/404"))

const load = (children: ReactNode): ReactNode => (
  <Suspense fallback={ <LoadingComponent/> }>{ children }</Suspense>
)

//  定义路由数据
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LayoutPage/>,
    children: [
      {
        index: true,
        path: "picture",
        element: load(<Pics/>),
      },
      {
        path: "uploader",
        element: load(<Uploader/>),
      },
      {
        path: "*",
        element: load(<Error404/>),
      },
    ],
  },
]

export default createBrowserRouter(routes)
