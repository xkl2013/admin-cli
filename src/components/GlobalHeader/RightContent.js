import { PureComponent } from 'react';
import classNames from 'classnames';
import { Dropdown, Avatar, Spin } from 'antd';
import styles from './index.less';

class RightContent extends PureComponent {
  render() {
    const { currentUser = {}, navTheme } = this.props;
    const className = navTheme === 'dark' ? classNames(styles.right, styles.dark) : styles.right;
    return (
      <div className={className}>
        {currentUser.name ? (
          <Dropdown>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.avatar}
                alt="avatar"
              />
              <span className={styles.name}>{currentUser.name}</span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
      </div>
    );
  }
}
export default RightContent;
