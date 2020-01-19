import { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import styles from './index.less';
import config from '../../../../config/defaultSettings';
import Seats from './components/seatsList';

let pageTimer = {};

class Info extends Component {
  state = {
    visiable: 'block',
    info: {},
  };

  componentDidMount() {
    const person = JSON.parse(window.localStorage.getItem('person'));
    if (person) {
      this.setState({
        info: person,
      });

      this.changeVisiable();
    }
    this.getLocalStorage(this);
  }

  getLocalStorage(that) {
    window.addEventListener('storage', e => {
      const info = JSON.parse(window.localStorage.getItem('person'));
      if (!that.state.info) {
        that.setState({
          info: info,
        });
        that.changeVisiable();
      }

      if (that.state.info.id == info.id) {
        return that.getLocalStorage(that);
      } else {
        that.setState({
          info: info,
        });

        that.changeVisiable();
      }
    });
  }

  changeVisiable() {
    console.log(this.state.info);
    if (this.state.info.seat == '主席台') {
      console.log('here');
      return;
    }

    pageTimer['time1'] = setTimeout(() => {
      this.setState({
        visiable: 'none',
      });
    }, 5000);
    pageTimer['time2'] = setTimeout(() => {
      this.setState({
        visiable: 'block',
      });
    }, 8500);

    if (this.state.info.type == 'force') {
      for (let each in pageTimer) {
        clearInterval(pageTimer[each]);
      }
    }
  }

  render() {
    return (
      <div className={styles.background}>
        <Row className={styles.head}>
          <p className={styles.head_content}>
            国网保定供电公司九届三次职工（会员）代表大会暨 2020 年工作会议
          </p>
        </Row>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.state.visiable == 'block' ? (
            <div key={1}>
              <Row>
                <Col span={12}>
                  <div className={styles.img_container}>
                    <img
                      className={styles.img}
                      src={
                        this.state.info.id
                          ? `http://${config.remoteIp}:8081/${this.state.info.id}.jpg`
                          : '../../../assets/default.png'
                      }
                    />
                  </div>
                </Col>
                <Col span={12} className={styles.padding_top}>
                  <Row className={styles.detail}>
                    <Col span={10}>
                      <p className={styles.detail_content}>
                        <span>姓名：</span>
                        <span>{this.state.info.name ? this.state.info.name : 'XXX'}</span>
                      </p>
                    </Col>
                    <Col span={10}>
                      <p className={styles.detail_content}>
                        <span>民族：</span>
                        <span>{this.state.info.nation ? this.state.info.nation : 'XX'}</span>
                      </p>
                    </Col>
                  </Row>
                  <Row className={styles.detail}>
                    <p className={styles.detail_content}>
                      <span>职务：</span>
                      <span>{this.state.info.duty ? this.state.info.duty : 'XXXX'}</span>
                    </p>
                  </Row>
                  <Row className={styles.detail}>
                    <p className={styles.detail_content}>
                      <span>座位：</span>
                      <span>{this.state.info.seat ? this.state.info.seat : ''}</span>
                    </p>
                  </Row>
                  <Row className={styles.detail}>
                    <p className={styles.detail_content}>
                      <span>部门绩效：</span>
                      <span>{this.state.info.performance ? this.state.info.performance : ''}</span>
                    </p>
                  </Row>
                  <Row className={styles.detail}>
                    <p className={styles.detail_content}>
                      <span>荣誉：</span>
                      <span>{this.state.info.glory ? this.state.info.glory : ''}</span>
                    </p>
                  </Row>
                </Col>
              </Row>
            </div>
          ) : (
            <div key={2}>
              <Seats person={this.state.info}></Seats>
            </div>
          )}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default connect(({ personInfo }) => ({
  personInfo: personInfo,
}))(Info);
