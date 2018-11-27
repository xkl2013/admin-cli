import React from 'react';
import Spin from '@/components/Spin';
import styles from './styles/basicLayout.css';

export default class BaseIcLayout extends React.Component {
  render() {
    console.log(styles.globalSpin);
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  }
}
