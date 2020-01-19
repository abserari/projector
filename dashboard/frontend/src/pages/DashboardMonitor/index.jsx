import { Card, Col, Row } from 'antd';
import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import ReactAwesomeClock from 'react-awesome-clock';
import { WaterWave, Gauge } from './components/Charts';
import Thermometer from 'react-thermometer-component';
import { Sub } from '../../services/pub_sub.js'
 
class DashboardMonitor extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    Sub(dispatch);
  }

  render() {
    const { dashboardMonitor } = this.props;
    const { pm, tem, hum } = dashboardMonitor;
    const titleSize = '60px';
    return (
      <GridContent>
        <div style={{background:'#fff8cd'}}>
        <React.Fragment>
          <Row gutter={0} style={{ height: '50vh' }}>
            <Col
              xl={24}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              style={{
                marginBottom: 0,
              }}
            >
              <Card
                bodyStyle={{
                  textAlign: 'center',
                }}
                bordered={true}
                style={{background: '#efe9cc'}}
              >
                <div class="contain" >
                  <p style={{ fontSize: titleSize, background: '#eadea6'}}>北京时间</p>
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
          <Row gutter={0} style={{ height: '50vh' }}>
            <Col
              xl={8}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              style={{
                marginBottom: 0,
              }}
            >
              <Card
                bordered={true}
                bodyStyle={{
                  textAlign: 'center',
                }}
                style={{background: '#eadea6', paddingBottom: '0.9vh'}}
              >
                <div class="contain">
                  <p style={{ fontSize: titleSize, height: '7.4vh' }}>湿度</p>
                </div>
                <WaterWave height={220} percent={hum} />
              </Card>
            </Col>
            <Col
              xl={8}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              style={{
                marginBottom: 0,
              }}
            >
              <Card
                bodyStyle={{
                  textAlign: 'center',
                  alignContent: 'center',
                }}
                bordered={true}
                style={{background: '#eadea6', paddingBottom: '1vh'}}
              >
                <div class="contain" style={{height: '13vh'}}>
                  <p style={{ fontSize: titleSize }}>温度</p>
                </div>
                <div align="center">
                  <Thermometer
                    theme="light"
                    value={tem}
                    max="30"
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
                marginBottom: 0,
              }}
            >
              <Card
                bordered={true}
                bodyStyle={{
                  textAlign: 'center',
                }}
                style={{background: '#eadea6', paddingBottom: '2.9vh'}}
              >
                <div class="contain" style={{height: '11vh'}}>
                  <p style={{ fontSize: titleSize }}>PM2.5</p>
                </div>
                <Gauge title="PM2.5" height={255} percent={pm} style={{marginBottom: '10vh'}} />
              </Card>
            </Col>
          </Row>
          <Row></Row>
        </React.Fragment>
        </div>
      </GridContent>
    );
  }
}

export default connect(({ dashboardMonitor, loading }) => ({
  dashboardMonitor,
  loading: loading.models.dashboardMonitor,
}))(DashboardMonitor);
