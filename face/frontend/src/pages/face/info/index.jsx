import { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';

import styles from './index.less';

class Info extends Component {
  state = {
    info: {},
  };
  componentDidMount() {
    const person = JSON.parse(window.localStorage.getItem('person'));
    if (person) {
      this.setState({
        info: person,
      });
    }
    this.getLocalStorage(this);
    // this.routeTo()
  }

  getLocalStorage(that) {
    window.addEventListener('storage', e => {
      const info = JSON.parse(window.localStorage.getItem('person'));
      if (!that.state.info) {
        that.setState({
          info: info,
        });
      }

      if (that.state.info.id == info.id) {
        return that.getLocalStorage();
      } else {
        that.setState({
          info: info,
        });
      }
    });
  }

  routeTo() {
    const { personInfo } = this.props;
    const person = personInfo.persons[0].info;
    setTimeout(() => {
      router.push({
        pathname: '/face/seats',
        query: {
          person,
        },
      });
    }, 3000);
  }

  render() {
    return (
      <div className={styles.background}>
        <Row className={styles.head}>
          <p className={styles.head_content}>
            国网保定供电公司九届三次职工（会员）代表大会暨 2020 年工作会议
          </p>
        </Row>
        <Row>
          <Col span={12}>
            <div className={styles.img_container}>
              <img
                className={styles.img}
                src={
                  this.state.info ? `http://192.168.0.121:8081/${this.state.info.imagepath}` : null
                }
              />
            </div>
          </Col>
          <Col span={12} className={styles.padding_top}>
            <Row className={styles.detail}>
              <Col span={10}>
                <p className={styles.detail_content}>
                  <span>姓名：</span>
                  <span>{this.state.info.name}</span>
                </p>
              </Col>
              <Col span={10}>
                <p className={styles.detail_content}>
                  <span>民族：</span>
                  <span>{this.state.info.nation}</span>
                </p>
              </Col>
            </Row>
            <Row className={styles.detail}>
              <p className={styles.detail_content}>
                <span>职务：</span>
                <span>{this.state.info.position}</span>
              </p>
            </Row>
            <Row className={styles.detail}>
              <p className={styles.detail_content}>
                <span>座位：</span>
                <span>{this.state.info.seat ? info.seat : '2 排 13 座'}</span>
              </p>
            </Row>
            <Row className={styles.detail}>
              <p className={styles.detail_content}>
                <span>部门绩效：</span>
                <span>{this.state.info.performance}</span>
              </p>
            </Row>
            <Row className={styles.detail}>
              <p className={styles.detail_content}>
                <span>荣誉：</span>
                <span>{this.state.info.honor}</span>
              </p>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(({ personInfo }) => ({
  personInfo: personInfo,
}))(Info);
