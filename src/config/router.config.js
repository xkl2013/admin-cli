import React from 'react';
import { Route, Switch, Router } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import AuthorizedRoute from '../components/Authorized/AuthorizedRoute';
import Spin from '@/components/Spin';
import { getRouterData } from './menu.config';

dynamic.setDefaultLoadingComponent(() => {
  // 切换模块loading
  return <Spin size="large" />;
});
function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route path="/user" render={props => <UserLayout {...props} />} />
          <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} />}
            // authority={checkoutLogin}
            redirectPath="/user/login"
          />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
