import AppLayout from '@/app/layout/layout'
import HomePage from '@/app/pages/home-page/home-page'
import RootLayout from '@/layout/layout'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
