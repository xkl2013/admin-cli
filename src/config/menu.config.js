import { dynamicWrapper } from '../utils/router.utils';

function getFlatMenuData(menus, app) {
  let keys = {};
  menus.forEach(item => {
    if (item.path && item.children && item.children.length > 0 && !item.component) {
      //  如果有path值且有children长度大于0,且没有component,默认绑定一个组件
      keys[item.path] = {
        ...item,
        component: dynamicWrapper(app, [], () =>
          import('../components/RouteDistribute/RenderRoute')
        ),
      };
    }
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

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
    {
      icon: 'dashboard',
      path: '/',
      name: 'hao',
      component: dynamicWrapper(app, ['setting', 'global', 'menu'], () =>
        import('../layout/BasicLayout')
      ),
      // redirect: '/home/index' ,
      authority: ['admin', 'user'],
      children: [
        {
          name: '首页',
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
