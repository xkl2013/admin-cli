import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './IndexPage.css';

function IndexPage() {
  console.log(process.env.API_TYPE);
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <Button type="primary">点击</Button>
      欢迎大家一起来做一款牛逼的产品
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
