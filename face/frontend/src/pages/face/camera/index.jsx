import { Component } from 'react';
import { Row, Col, Card, Button } from 'antd';
import { connect } from 'dva';

import axios from 'axios';
import styles from './index.less';
import Gauge from './components/gauge';
import PersonList from './components/personInfo';
import Controller from './components/control';
import Mark from './components/mark';

import config from '../../../../config/defaultSettings';

const faceapi = require('face-api.js');
const emitter = require('emitter-io');

const getFaceDetectorOptions = () => {
  let minConfidence = config.minConfidence;
  return new faceapi.SsdMobilenetv1Options({ minConfidence });
};
let detections = [];

class Face extends Component {
  state = {
    stream: '',
    bottom: 0,
    detectionsList: [],
  };

  async componentDidMount() {
    await faceapi.loadSsdMobilenetv1Model(`http://${config.localIp}:9090`);
    await this.openWebcam();
    const video = document.getElementById('inputVideo');
    video.srcObject = this.state.stream;
    this.getMessage(this);
  }

  getMessage = that => {
    const client = emitter.connect({ host: `${config.remoteIp}`, port: '8080' });
    client.subscribe({
      key: config.messageEmitterKey,
      channel: config.messageChannel,
    });

    client.on('message', function(msg) {
      const { personInfo, dispatch } = that.props;
      const person = JSON.parse(msg.asString());
      if (person == 'timeout') {
        return;
      }
      dispatch({
        type: 'personInfo/modifyTimeSpend',
        payload: person.timespend,
      });

      for (let i = 0; i < personInfo.persons.length; i++) {
        if (personInfo.persons[i].id === person.id) {
          dispatch({
            type: 'personInfo/modifyPerson',
            payload: i,
          });
          return;
        }
      }
      dispatch({
        type: 'personInfo/addPerson',
        payload: { ...person },
      });
    });
  };

  openWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (stream === false) {
        return;
      }

      this.setState({
        stream: stream,
      });
    } catch (err) {
      return false;
    }
  };

  onPlay = async () => {
    const videoEl = document.getElementById('inputVideo');
    const options = getFaceDetectorOptions();
    let result = await faceapi.detectAllFaces(videoEl, options);

    let resultAfterFilter = result.filter(detection => {
      return detection.box.area > this.props.face.area && detection.score > this.props.face.score;
    });
    if (resultAfterFilter.length === 0) {
      return setTimeout(() => this.onPlay(), 500);
    }

    if (detections === 0) {
      let imagesList = [];
      const faceImages = await faceapi.extractFaces(videoEl, resultAfterFilter);
      faceImages.forEach(canvas => {
        imagesList.push(canvas.toDataURL());
      });
      detections = [...resultAfterFilter];
      this.setState({
        detectionsList: imagesList,
      });
      await this.recognize(imagesList);
    } else {
      let lastImages = resultAfterFilter.filter(detection => {
        for (let i = 0; i < detections.length; i++) {
          if (Math.abs(detections[i].box.x - detection.box.x) > this.props.face.offsetX) {
            continue;
          } else {
            return false;
          }
        }
        return true;
      });

      if (lastImages.length === 0) {
        return setTimeout(() => this.onPlay(), 500);
      }

      let imagesList = [];
      const faceImages = await faceapi.extractFaces(videoEl, lastImages);

      faceImages.forEach(canvas => {
        imagesList.push(canvas.toDataURL());
      });
      await this.recognize(imagesList);
      this.setState({
        detectionsList: imagesList,
      });
      detections = [...lastImages];
    }

    setTimeout(() => this.onPlay(), 500);
  };

  recognize = async list => {
    let prama = [];
    list.forEach(image => {
      prama.push(image.slice(22));
    });
    await axios
      .post(`http://${config.remoteIp}:7001/image`, {
        imageurl: [...prama],
      })
      .then(resp => {})
      .catch(err => {
        console.log(err);
      });
  };

  getImages() {
    let imagesList = [];
    for (let i = 0; i < this.state.detectionsList.length; i++) {
      imagesList.push(<img className={styles.img} src={this.state.detectionsList[i]}></img>);
    }
    return imagesList;
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={8}>
            <Card className={styles.card} title="原数据">
              <div>
                <video
                  className={styles.video}
                  onLoadedMetadata={this.onPlay}
                  id="inputVideo"
                  autoPlay
                  muted
                  playsInline
                ></video>
              </div>
            </Card>
            <Card className={styles.card} title="当前延时">
              <Gauge className={styles.gauge}></Gauge>
            </Card>
          </Col>
          <Col span={16}>
            <Card style={{ marginTop: '2vh', width: '95%' }} title="控制台">
              <Controller></Controller>
            </Card>
            <Row>
              <Col span={12}>
                <Card style={{ marginTop: '2vh', width: '95%' }} title="返回信息">
                  <PersonList></PersonList>
                </Card>
              </Col>
              <Col span={12}></Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Card
            style={{ marginTop: '2vh', width: '90%', marginLeft: '3%', marginBottom: '2vh' }}
            title="标注"
          >
            <Mark></Mark>
          </Card>
        </Row>
      </div>
    );
  }
}

export default connect(({ personInfo, face }) => ({
  personInfo: personInfo,
  face: face,
}))(Face);
