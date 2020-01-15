import { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Button } from 'antd';

import styles from './index.less';

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
      <Card hoverable={true} style={{ marginBottom: '1vh', height: '20vh', width: '100%' }}>
        <Row justify="space-around" className={styles.row}>
          <Col span={3}>
            <img
              className={styles.img}
              src={`http://192.168.0.121:8081/${this.props.data.imagepath}`}
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
            <Button className={styles.button}>标记</Button>
          </Col>
        </Row>
      </Card>
    );
  }
}

class PersonList extends Component {
  state = {};
  generatePersonInfo() {
    const { personInfo } = this.props;
    let list = [];
    personInfo.persons.forEach(element => {
      list.push(<PersonInfo data={element} that={this}></PersonInfo>);
    });
    return list;
  }

  render() {
    return <div className={styles.personInfoList}>{this.generatePersonInfo()}</div>;
  }
}

connect(({ personInfo }) => ({
  personInfo: personInfo,
}))(PersonInfo);

export default connect(({ personInfo }) => ({
  personInfo: personInfo,
}))(PersonList);
