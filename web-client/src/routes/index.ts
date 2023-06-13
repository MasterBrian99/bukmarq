import { lazy } from "@loadable/component";
const routes = {
  mainLayout: [
    {
      component: lazy(
        () => import("@/screens/DashboardScreen/DashboardScreen")
      ),
      path: "",
    },
  ],
};

export default routes;
