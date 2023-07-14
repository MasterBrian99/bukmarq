import loadable from "@loadable/component";
const routes = {
  mainLayout: [
    {
      component: loadable(() => import("@/pages/DashboardPage/DashboardPage")),
      path: "",
    },
    {
      component: loadable(
        () => import("@/pages/AllBookmarkPage/AllBookmarkPage")
      ),
      path: "all",
    },
  ],
};

export default routes;
