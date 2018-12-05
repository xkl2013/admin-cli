import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import Media from 'react-media'; // 根据query匹配render相应的组件;https://www.npmjs.com/package/react-media
import DocumentTitle from 'react-document-title'; // https://www.npmjs.com/package/react-document-title
import { ContainerQuery } from 'react-container-query'; // https://github.com/d6u/react-container-query
import classNames from 'classnames';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import Context from '@/utils/context';
import SiderMenu from '@/components/SiderMenu';
import RouteDistribute from '@/components/RouteDistribute';
import Header from './Header';
import logo from '@/assets/logo.svg';

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BaseIcLayout extends React.Component {
  constructor(props) {
    super(props);
    this.getPageTitle = memoizeOne(this.getPageTitle);
    this.getBreadcrumbNameMap = memoizeOne(this.getBreadcrumbNameMap, isEqual);
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
  }

  componentDidMount() {
    const { dispatch, routerData } = this.props;
    const menuData = routerData['/'];
    dispatch({
      type: 'setting/getSetting',
    });
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes: [menuData] },
    });
  }

  getPageTitle = () => {
    return 'dva-admin';
  };

  /**
   * 获取面包屑映射
   * @param {Object} menuData 菜单配置
   */
  getBreadcrumbNameMap() {
    const routerMap = {};
    const { menuData = [] } = this.props;
    const flattenMenuData = data => {
      data.forEach(menuItem => {
        if (menuItem.children) {
          flattenMenuData(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    flattenMenuData(menuData);
    return routerMap;
  }

  getContext = () => {
    return {
      name: 2222,
    };
  };

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed } = this.props;
    if (fixSiderbar && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  getContentStyle = () => {
    const { fixedHeader } = this.props;
    return {
      margin: '24px 24px 0',
      paddingTop: fixedHeader ? 64 : 0,
    };
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  renderLayout = () => {
    const { navTheme, isMobile, menuData = [] } = this.props;
    return (
      <Layout>
        <SiderMenu
          logo={logo}
          theme={navTheme}
          onCollapse={this.handleMenuCollapse}
          menuData={menuData}
          isMobile={isMobile}
          {...this.props}
        />
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            isMobile={isMobile}
            logo={logo}
            handleMenuCollapse={this.handleMenuCollapse}
            {...this.props}
          />
          <Layout.Content style={this.getContentStyle()}>
            <RouteDistribute {...this.props} />
          </Layout.Content>
        </Layout>
      </Layout>
    );
  };

  render() {
    const layout = this.renderLayout();
    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle()} />
        <ContainerQuery query={query}>
          {params => (
            <Context.Provider value={this.getContext()}>
              <div className={classNames(params)}>{layout}</div>
            </Context.Provider>
          )}
        </ContainerQuery>
        {/* <React.Suspense fallback></React.Suspense> */}
      </React.Fragment>
    );
  }
}
export default connect(({ loading, setting, global, menu }) => ({
  loading,
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menu.menuData,
  ...setting,
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BaseIcLayout {...props} isMobile={isMobile} />}
  </Media>
));
