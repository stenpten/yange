import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { TopBar } from "./chrome"
import { MapScreen } from "./MapScreen"
import { ChapterList, ChapterPage } from "./pages"

function RootRedirect() {
  const saved = localStorage.getItem("yange-lang")
  const browser = navigator.language.toLowerCase()
  const lang = saved === "en" || saved === "zh" ? saved : browser.startsWith("en") ? "en" : "zh"
  return <Navigate to={`/${lang}${window.location.search}`} replace />
}

function Shell() {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  )
}

export function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/:lang" element={<Shell />}>
          <Route index element={<MapScreen />} />
          <Route path="chapters" element={<ChapterList />} />
          <Route path="chapters/:slug" element={<ChapterPage />} />
        </Route>
      </Routes>
    </div>
  )
}
