import React from 'react';
import { Input } from 'antd';
import styles from './index.less';

export default () => {
  var getvalue = (value) => {
    console.log(value)
  }

  return (
  <div className={styles.container}>
    <div id="components-input-demo-basic">
      <Input.Search 
      placeholder="input" 
      addonBefore="PM2.5"
      enterButton="提交"
      onSearch={value => getvalue(value)}
      />
    </div>
  </div>
);
}