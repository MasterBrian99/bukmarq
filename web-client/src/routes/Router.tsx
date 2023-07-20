import MainLayout from "@/layout/MainLayout/MainLayout";
import routes from "./index";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout/AuthLayout";
import { useIsAuthenticated } from "react-auth-kit";
import React, { Suspense } from "react";

type PrivateRouteProps = {
  Component: () => JSX.Element; // Use React.ComponentType to accept any component type
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ Component }) => {
  const isAuthenticated = useIsAuthenticated();

  const auth = isAuthenticated();
  return auth ? <Component /> : <Navigate to="/auth/login" />;
};
const Router = () => (
  <>
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <PrivateRoute Component={MainLayout} />
          </Suspense>
        }
      >
        {routes.mainLayout.map(({ path, component: Component }, i) => (
          <Route key={i} path={path} element={<Component />} />
        ))}
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        {routes.authLayout.map(({ path, component: Component }, i) => (
          <Route key={i} path={path} element={<Component />} />
        ))}
      </Route>
    </Routes>
  </>
);

export default Router;
