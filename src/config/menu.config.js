import { dynamicWrapper, getFlatMenuData } from '../utils/router.utils';

export const getRouterData = app => {
  const menuData = [
    // user
    {
      path: '/user',
      component: dynamicWrapper(app, [], () => import('../layout/UserLayout')),
      children: [
        { path: '/user', redirect: '/user/login' },
        { path: '/user/login', component: '../pages/Login/Login' },
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
          // hideInMenu: true,
        },
        // 异常页面
        {
          name: 'exception',
          icon: 'warning',
          path: '/exception',
          hideInMenu: true,
          children: [
            // exception
            {
              path: '/exception/403',
              name: 'not-permission',
              component: dynamicWrapper(app, [], () => import('../pages/Exception/403')),
            },
            {
              path: '/exception/404',
              name: 'not-find',
              component: dynamicWrapper(app, [], () => import('../pages/Exception/404')),
            },
            {
              path: '/exception/500',
              name: 'server-error',
              component: dynamicWrapper(app, [], () => import('../pages/Exception/500')),
            },
          ],
        },
      ],
    },
  ];
  const routeData = getFlatMenuData(menuData, app);
  return routeData;
};
