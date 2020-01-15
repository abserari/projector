import React from 'react';
import { Input,Button } from 'antd';
import styles from './index.less';

let state = {
  pm: 0,
  tmp: 0,
  hum:0
}

export default () => {
  const changePm = (value) => {
    state.pm = value
  }
  const changeTmp = (value) => {
    state.tmp = value
  }
  const changeHum = (value) => {
    state.hum = value
  }

  const publish = value => {
    const client = require('emitter-io').connect({ host: '127.0.0.1', port: '8080' });

    client.publish({
      key: 'Ws8wxZjTP9GbEbncf8FYCHr_volK1Bbu',
      channel: 'pine',
      message: JSON.stringify(value),
    });
  };

  return (
    <div className={styles.container}>
      <div id="components-input-demo-basic">
      <Input.Group>
          <Input
            addonBefore="PM2.5"
            onChange={e => changePm(e.target.value)}
          />
          <p></p>
          <Input
            addonBefore="温度"
            onChange={e => changeTmp(e.target.value)}
          />
          <p></p>
          <Input
            addonBefore="湿度"
            onChange={e => changeHum(e.target.value)}
          />
          <p></p>
          <Button type="primary" onClick={() => publish(state)}>
           提交
          </Button>
      </Input.Group>
      </div>
    </div>
  );
};
