import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GlobalStyle } from './styles'

import HomePage from './pages/Home'
import GalleryPage from './pages/Gallery'

const rotas = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/gallery',
    element: <GalleryPage />
  }
])

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={rotas} />
    </>
  )
}

export default App
