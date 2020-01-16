import React from 'react';
import { Input,Button } from 'antd';
import styles from './index.less';
import Publish from './pub.js'

let state = {
  pm: 0,
  tem: 0,
  hum:0
}

export default () => {
  const changePm = (value) => {
    state.pm = value
  }
  const changeTem= (value) => {
    state.tem = value
  }
  const changeHum = (value) => {
    state.hum = value
  }

 

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
            onChange={e => changeTem(e.target.value)}
          />
          <p></p>
          <Input
            addonBefore="湿度"
            onChange={e => changeHum(e.target.value)}
          />
          <p></p>
          <Button type="primary" onClick={() => Publish(state)}>
           提交
          </Button>
      </Input.Group>
      </div>
    </div>
  );
};
