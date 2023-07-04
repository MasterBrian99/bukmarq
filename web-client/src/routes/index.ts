import loadable from "@loadable/component";
const routes = {
  mainLayout: [
    {
      component: loadable(() => import("@/pages/DashboardPage/DashboardPage")),
      path: "",
    },
  ],
};

export default routes;
