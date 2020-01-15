import { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, InputNumber } from 'antd';

class Controller extends Component {
  onChangeScore(value) {
    const { dispatch } = this.props;
    dispatch({
      type: 'face/score',
      payload: value,
    });
  }

  onChangeArea(value) {
    const { dispatch } = this.props;
    dispatch({
      type: 'face/area',
      payload: value,
    });
  }

  onChangeOffsetX(value) {
    const { dispatch } = this.props;
    dispatch({
      type: 'face/offsetX',
      payload: value,
    });
  }

  render() {
    return (
      <Row type="flex" justify="start" gutter={[60, 16]}>
        <Col>
          <span>准确率：</span>
          <InputNumber
            min={0}
            max={10}
            step={0.1}
            defaultValue={this.props.face.score}
            onChange={this.onChangeScore.bind(this)}
          />
          ,
        </Col>
        <Col>
          <span>截取面部最小面积：</span>
          <InputNumber
            min={5000}
            max={100000}
            defaultValue={this.props.face.area}
            onChange={this.onChangeArea.bind(this)}
          />
        </Col>
        <Col>
          <span>选取框水平最小偏移量：</span>
          <InputNumber
            min={0}
            max={100}
            defaultValue={this.props.face.offsetX}
            onChange={this.onChangeArea.bind(this)}
          />
        </Col>
      </Row>
    );
  }
}

export default connect(({ face }) => ({
  face: face,
}))(Controller);
