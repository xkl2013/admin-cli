import { dynamicWrapper, getFlatMenuData } from '../utils/router.utils';

export const getRouterData = app => {
  const menuData = [
    // user
    {
      path: '/user',
      component: dynamicWrapper(app, [], () => import('../layout/UserLayout')),
      children: [
        { path: '/user', redirect: '/user/login' },
        { path: '/user/login', component: '../pages/User/Login' },
      ],
    },
    // menu data区域
    {
      icon: 'dashboard',
      path: '/',
      name: 'hao',
      component: dynamicWrapper(app, ['setting', 'global', 'menu'], () =>
        import('../layout/BasicLayout')
      ),
      redirect: '/home/page',
      authority: ['admin', 'user'],
      children: [
        {
          name: '自己',
          path: '/home',
          children: [
            {
              icon: 'dashboard',
              path: '/home/page',
              name: '第一页',
              component: dynamicWrapper(app, [], () => import('../pages/IndexPage.js')),
            },
          ],
        },
        {
          name: '工作台',
          path: '/workplace',
          // hideInBreadcrumb: true,
          // hideInMenu: true,
        },
      ],
    },
  ];
  const routeData = getFlatMenuData(menuData, app);
  return routeData;
};
