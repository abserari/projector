import { Card, Col, Row } from 'antd';
import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import ReactAwesomeClock from 'react-awesome-clock';
import { WaterWave, Gauge } from './components/Charts';
import Thermometer from 'react-thermometer-component';

class DashboardMonitor extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const Sub = () => {
      const client = require('emitter-io').connect({ host: '127.0.0.1', port: '8080' }); // once we're connected, subscribe to the 'chat' channel

      client.subscribe({
        key: 'Ws8wxZjTP9GbEbncf8FYCHr_volK1Bbu',
        channel: 'pine',
      });

      client.on('message', function(msg) {
        const ob = msg.asObject();
        dispatch({
          type: 'dashboardMonitor/changePM25',
          payload: 70,
        });
        console.log(ob.pm);
      });
    };
    Sub();
  }

  render() {
    const { dashboardMonitor, loading } = this.props;
    const { pm, tem, hum } = dashboardMonitor;
    const titleSize = '60px';
    return (
      <GridContent>
        <React.Fragment>
          <Row gutter={6}>
            <Col
              xl={24}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              style={{
                marginBottom: 6,
              }}
            >
              <Card
                bodyStyle={{
                  textAlign: 'center',
                }}
                bordered={true}
              >
                <div class="contain">
                  <p style={{ fontSize: titleSize }}>北京时间</p>
                  <br></br>
                  <br></br>
                </div>
                <ReactAwesomeClock style={{ color: 'black', fontSize: 200 }} clockSeparator=":" />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </Card>
            </Col>
          </Row>
          <Row gutter={6}>
            <Col
              xl={8}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              style={{
                marginBottom: 6,
              }}
            >
              <Card
                bordered={true}
                bodyStyle={{
                  textAlign: 'center',
                }}
              >
                <div class="contain">
                  <p style={{ fontSize: titleSize }}>湿度</p>
                </div>
                <WaterWave height={200} percent={hum} />
              </Card>
            </Col>
            <Col
              xl={8}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              style={{
                marginBottom: 6,
              }}
            >
              <Card
                bodyStyle={{
                  textAlign: 'center',
                  alignContent: 'center',
                }}
                bordered={true}
              >
                <div class="contain">
                  <p style={{ fontSize: titleSize }}>温度</p>
                </div>
                <div align="center">
                  <Thermometer
                    theme="light"
                    value={tem}
                    max="60"
                    steps="3"
                    format="°C"
                    size="large"
                    height="255"
                  />
                </div>
              </Card>
            </Col>
            <Col
              xl={8}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              style={{
                marginBottom: 6,
              }}
            >
              <Card
                bordered={true}
                bodyStyle={{
                  textAlign: 'center',
                }}
              >
                <div class="contain">
                  <p style={{ fontSize: titleSize }}>PM2.5</p>
                </div>
                <Gauge title="PM2.5" height={255} percent={pm} />
              </Card>
            </Col>
          </Row>
          <Row></Row>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default connect(({ dashboardMonitor, loading }) => ({
  dashboardMonitor,
  loading: loading.models.dashboardMonitor,
}))(DashboardMonitor);
