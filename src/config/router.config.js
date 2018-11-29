import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import AuthorizedRoute from '../components/Authorized/AuthorizedRoute';
import Spin from '@/components/Spin';
import { getRouterData } from './router.map';
// import IndexPage from '../pages/IndexPage';

import UserLayout from '../layout/UserLayout';

dynamic.setDefaultLoadingComponent(() => {
  // 切换模块loading
  return <Spin size="large" />;
});
function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const BasicLayout = routerData['/'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <routerRedux.ConnectedRouter history={history}>
        <Switch>
          <Route path="/userLayout" exact component={UserLayout} />
          <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} />}
            // authority={checkoutLogin}
            redirectPath="/userLayout/login"
          />
        </Switch>
      </routerRedux.ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
