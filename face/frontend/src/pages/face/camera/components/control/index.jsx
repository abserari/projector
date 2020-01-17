import { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, InputNumber, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';

import config from '../../../../../../config/defaultSettings';

const AddFaceForm = Form.create({ name: 'add_face_form' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCommit, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal visible={visible} title="上传图片" okText="上传" onCancel={onCancel} onOk={onCommit}>
          <Form layout="vertical">
            <Form.Item label="Group">
              {getFieldDecorator('Group', {
                rules: [{ required: true }],
                initialValue: 'workers',
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Person">
              {getFieldDecorator('Person', { rules: [{ required: true }] })(
                <Input type="textarea" />,
              )}
            </Form.Item>
            <Form.Item label="Image">
              {getFieldDecorator('Image')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="ImageBase64">
              {getFieldDecorator('Content')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="ImageUrl">
              {getFieldDecorator('ImageUrl')(<Input type="textarea" />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

const DeleteFaceForm = Form.create({ name: 'delete_face_form' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCommit, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal visible={visible} title="删除图片" okText="确认" onCancel={onCancel} onOk={onCommit}>
          <Form layout="vertical">
            <Form.Item label="Group">
              {getFieldDecorator('Group', {
                rules: [{ required: true }],
                initialValue: 'workers',
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Person">
              {getFieldDecorator('Person', { rules: [{ required: true }] })(
                <Input type="textarea" />,
              )}
            </Form.Item>
            <Form.Item label="Image">
              {getFieldDecorator('Image')(<Input type="textarea" />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class Controller extends Component {
  state = {
    addFaceVisible: false,
    deleteFaceVisible: false,
  };

  showAddFaceModal() {
    this.setState({
      addFaceVisible: true,
    });
  }

  addFaceHandOk() {
    const { form } = this.addFormRef.props;
    form.validateFields(async (err, value) => {
      if (err) {
        return;
      }
      if (value.ImageUrl && !value.Content) {
        await axios
          .post(`http://${config.remoteIp}:7001/image/add`, {
            ...value,
          })
          .then(resp => {
            console.log(resp);
          })
          .catch(err => {
            console.log(err);
          });
      }

      if (value.Content && !value.ImageUrl) {
        await axios
          .post(`http://${config.remoteIp}:7001/image/addBase`, {
            ...value,
          })
          .then(resp => {
            console.log(resp);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
    this.setState({
      addFaceVisible: false,
    });
  }

  addFaceHandCancel() {
    this.setState({
      addFaceVisible: false,
    });
  }

  saveAddFormRef = formRef => {
    this.addFormRef = formRef;
  };

  showDeleteFaceModal() {
    this.setState({
      deleteFaceVisible: true,
    });
  }

  deleteFaceHandOk() {
    const { form } = this.deleteFormRef.props;
    form.validateFields(async (err, value) => {
      if (err) {
        return;
      }
      await axios
        .post(`http://${config.remoteIp}:7001/image/destroy`, {
          Person: value.Person,
          Image: value.Image,
        })
        .then(resp => {
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
        });
    });
    this.setState({
      deleteFaceVisible: false,
    });
  }

  deleteFaceHandCancel() {
    this.setState({
      deleteFaceVisible: false,
    });
  }

  saveDeleteFormRef = formRef => {
    this.deleteFormRef = formRef;
  };

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
        <Col>
          <Button onClick={this.showAddFaceModal.bind(this)}>上传图片</Button>
        </Col>
        <Col>
          <Button onClick={this.showDeleteFaceModal.bind(this)}>删除图片</Button>
        </Col>
        <AddFaceForm
          wrappedComponentRef={this.saveAddFormRef}
          visible={this.state.addFaceVisible}
          onCancel={this.addFaceHandCancel.bind(this)}
          onCommit={this.addFaceHandOk.bind(this)}
        ></AddFaceForm>
        <DeleteFaceForm
          wrappedComponentRef={this.saveDeleteFormRef}
          visible={this.state.deleteFaceVisible}
          onCancel={this.deleteFaceHandCancel.bind(this)}
          onCommit={this.deleteFaceHandOk.bind(this)}
        ></DeleteFaceForm>
      </Row>
    );
  }
}

export default connect(({ face }) => ({
  face: face,
}))(Controller);
