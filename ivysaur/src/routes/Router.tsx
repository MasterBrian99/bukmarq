import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import MainLayout from '@/layout/MainLayout/Main.layout';
import AuthLayout from '@/layout/AuthLayout/Auth.layout';
import LoadingPage from '@/pages/LoadingPage/Loading.page';
import routes from './index';

const Router = () => (
  <>
    <Routes>
      {/* <Route path="*" element={<NotFoundPage />} /> */}

      <Route path="/" element={<MainLayout />}>
        {routes.mainLayout.map(({ path, component: Component }, i) => (
          <Route
            key={i}
            path={path}
            element={
              <Suspense fallback={<div>sd</div>}>
                <Component />
              </Suspense>
            }
          />
        ))}
      </Route>
      <Route
        path="auth"
        element={
          <Suspense fallback={<LoadingPage />}>
            <AuthLayout />
          </Suspense>
        }
      >
        {routes.authLayout.map(({ path, component: Component }, i) => (
          <Route key={i} path={path} element={<Component />} />
        ))}
      </Route>
    </Routes>
  </>
);

export default Router;
