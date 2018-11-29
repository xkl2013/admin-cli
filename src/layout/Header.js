import { PureComponent } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
// import className from 'classnames';
import GlobalHeader from '@/components/GlobalHeader';
import styles from './styles/header.less';

const { Header } = Layout;

class SelfHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getHeadWidth = () => {
    const { isMobile, collapsed, setting } = this.props;
    const { fixedHeader, layout } = setting;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
  };

  render() {
    const { setting } = this.props;
    const { fixedHeader } = setting;
    const width = this.getHeadWidth();
    return (
      <Header style={{ padding: 0, width }} className={fixedHeader ? styles.fixedHeader : ''}>
        <GlobalHeader {...setting} {...this.props} />
      </Header>
    );
  }
}
export default connect(({ loading, setting, global }) => ({
  loading,
  setting,
  collapsed: global.collapsed,
}))(SelfHeader);
