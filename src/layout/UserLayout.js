import React from 'react';
import RouteDistribute from '@/components/RouteDistribute';

export default class UserLayout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <RouteDistribute {...this.props} rootPath="/user" />
      </React.Fragment>
    );
  }
}
