import React, { useState } from 'react';
import { Input } from 'antd';
import styles from './index.less';

export default () => {
  

  const getvalue = (value) => {
    const emitterKey = 'MMfLon7iAZaQH-_6sFtauuzikqGQaQXO';
    const channel = 'personinfo';
  
    const client = require('emitter-io').connect({
      host: '127.0.0.1',
      port: '8080',
    });
  
    client.publish({
      key: emitterKey,
      channel: channel,
      message: value
    })
  }

  return ( 
    <div className={styles.container}>
      <div id="components-input-demo-basic" >
        <Input.Search
        placeholder="input" 
        // onPressEnter={e => pub(e.target.value)}
        enterButton="提交"
        onSearch={value => getvalue(value)}
        addonBefore="湿度"
        />
      </div>
    </div>
    );
};
