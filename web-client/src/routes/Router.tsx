import MainLayout from "@/layout/MainLayout/MainLayout";
import routes from "./index";
import { Route, Routes } from "react-router-dom";
const Router = () => (
  <>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {routes.mainLayout.map(({ path, component: Component }, i) => (
          <Route key={i} path={path} element={<Component />} />
        ))}
      </Route>
    </Routes>
  </>
);

export default Router;
