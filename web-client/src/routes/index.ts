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
    {
      component: loadable(
        () => import("@/pages/AllBookmarkPage/AllBookmarkPage")
      ),
      path: "starred",
    },
    {
      component: loadable(
        () => import("@/pages/AllBookmarkPage/AllBookmarkPage")
      ),
      path: "archived",
    },
    {
      component: loadable(
        () => import("@/pages/AllBookmarkPage/AllBookmarkPage")
      ),
      path: "trash",
    },
    {
      component: loadable(
        () => import("@/pages/AllBookmarkPage/AllBookmarkPage")
      ),
      path: "untagged",
    },
    {
      component: loadable(
        () => import("@/pages/CollectionPage/CollectionPage")
      ),
      path: "collection/:id",
    },
  ],
  authLayout: [
    {
      component: loadable(() => import("@/pages/auth/SigninPage/SigninPage")),
      path: "login",
    },
    {
      component: loadable(() => import("@/pages/auth/SignupPage/SignupPage")),
      path: "register",
    },
  ],
};

export default routes;
