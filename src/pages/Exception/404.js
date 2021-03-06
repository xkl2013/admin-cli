import React from 'react';
import { Link } from 'dva/router';
import Exception from '@/components/Exception';

const Exception404 = () => (
  <Exception type="404" desc="无此页面" linkElement={Link} backText="返回首页" />
);

export default Exception404;
