import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { ConfigProvider } from './lib/ConfigProvider'
import EditorPanel from './components/EditorPanel'
import Layout from './components/Layout'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Journey from './pages/Journey'
import About from './pages/About'
import Contact from './pages/Contact'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/collection', element: <Collection /> },
      { path: '/journey/:slug', element: <Journey /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '*', element: <Home /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider>
      <RouterProvider router={router} />
      <EditorPanel />
    </ConfigProvider>
  </StrictMode>,
)
