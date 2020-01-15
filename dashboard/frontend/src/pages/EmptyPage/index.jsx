import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import InputBasic from './InputBasic';
import Temperature from './Temperature';
import Pmtwopfive from './Pmtwopfive';

export default () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const emitterKey = "MMfLon7iAZaQH-_6sFtauuzikqGQaQXO";
    const channel = "personinfo";

    const pub = (value) => {
      const client = require('emitter-io').connect({host:"127.0.0.1", port:"8080"}); 
  
      client.publish({
        key: emitterKey,
        channel: channel,
        message: value
      })
    }

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageHeaderWrapper className={styles.main}>
      <Temperature />
      <br />
      <InputBasic />
      <br />
      <Pmtwopfive />
      <div
        style={{
          paddingTop: 200,
          textAlign: 'center',
        }}
      >
        <Spin spinning={loading} size="large"></Spin>
      </div>
    </PageHeaderWrapper>
  );
};
