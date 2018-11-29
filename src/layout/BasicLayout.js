import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import Media from 'react-media'; // 根据query匹配render相应的组件;https://www.npmjs.com/package/react-media
import DocumentTitle from 'react-document-title'; // https://www.npmjs.com/package/react-document-title
import { ContainerQuery } from 'react-container-query'; // https://github.com/d6u/react-container-query
import classNames from 'classnames';
import Context from '@/utils/context';
import SiderMenu from '@/components/SiderMenu';
import Header from './Header';
import logo from '@/assets/logo.svg';
// import styles from './styles/basicLayout.css';

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
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'setting/getSetting',
    });
  }

  getTitle = () => {
    return 'dva-admin';
  };

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
            <div>neirong</div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  };

  render() {
    const layout = this.renderLayout();
    return (
      <React.Fragment>
        <DocumentTitle title={this.getTitle()} />
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
export default connect(({ loading, setting, global }) => ({
  loading,
  collapsed: global.collapsed,
  layout: setting.layout,
  ...setting,
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BaseIcLayout {...props} isMobile={isMobile} />}
  </Media>
));
