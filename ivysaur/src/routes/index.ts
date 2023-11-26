import loadable from '@loadable/component';

const routes = {
  mainLayout: [
    {
      component: loadable(() => import('@/pages/Home.page')),
      path: '',
    },
  ],
  authLayout: [
    {
      component: loadable(() => import('@/pages/auth/Login.page')),
      path: 'login',
    },
  ],
};

export default routes;
