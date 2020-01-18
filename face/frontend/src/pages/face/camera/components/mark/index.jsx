import { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Card } from 'antd';

import styles from './index.less';
import config from '../../../../../../config/defaultSettings';

class PersonInfo extends Component {
  modifyCurrentPerson(data) {
    const { dispatch } = this.props.that.props;
    dispatch({
      type: 'personInfo/modifyCurrentPerson',
      payload: data,
    });
  }

  render() {
    return (
      <Card hoverable={true} style={{ marginBottom: '1vh', height: '20vh', width: '40%' }}>
        <Row justify="space-around" className={styles.row}>
          <Col span={3}>
            <img
              className={styles.img}
              src={`http://${config.remoteIp}:8081/${this.props.data.imagepath}`}
            />
          </Col>
          <Col style={{ paddingLeft: '3vw' }} span={14}>
            <p>姓名：{this.props.data.name}</p>
            <p>职位：{'国网保定供电公司办公室'}</p>
            <p>相似度：{this.props.data.score}</p>
          </Col>
          <Col span={6}>
            <Button
              className={styles.button}
              type="primary"
              onClick={() => this.modifyCurrentPerson(this.props.data)}
            >
              替换当前
            </Button>
          </Col>
        </Row>
      </Card>
    );
  }
}

class Mark extends Component {
  generatePersonInfo() {
    const { personInfo } = this.props;
    let list = [];
    personInfo.outstandPerson.forEach(element => {
      list.push(<PersonInfo key={element.name} data={element} that={this}></PersonInfo>);
    });
    return list;
  }

  render() {
    return <div className={styles.personInfoList}>{this.generatePersonInfo()}</div>;
  }
}

export default connect(({ personInfo }) => ({
  personInfo: personInfo,
}))(Mark);
