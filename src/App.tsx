import { FC, useState } from "react"

import router from "./routers"

import "@/assets/styles/App.less"

import { GlobalContext } from "@/context"
import { RouterProvider } from "react-router"

interface GlobalContext {
  theme: string;
  setTheme: (theme?: string) => void;
}

const App: FC = () => {
  const [theme, setTheme] = useState("light")
  const contextVal = { theme, setTheme } as GlobalContext
  return (
    <GlobalContext.Provider value={ contextVal }>
      <RouterProvider router={ router }/>
    </GlobalContext.Provider>
  )
}

export default App
