import { Component } from 'react';
import axios from 'axios'
import styles from  './index.css'

const faceapi = require('face-api.js');
const emitter = require('emitter-io')
// ssd_mobilenetv1 options
let minConfidence = 0.5
const messageEmitterKey = "DdYjd8w_zH4UTj3OLWOqM8kSmbk9c68H";
const messageChannel = "personinfo";

// const timeoutEmitterKey = "DhfPNWDeeBkLI1ym0VN8NP7GufF58rUE";
// const timeoutChannel = "timeout";

const getFaceDetectorOptions = () => {
  return new faceapi.SsdMobilenetv1Options({ minConfidence })
}

let detections = []

class Face extends Component{
  state = {
    stream: '',
  }

  async componentDidMount() {
    await faceapi.loadSsdMobilenetv1Model('http://192.168.0.107:9090')
    await this.openWebcam()

    const video = document.getElementById('inputVideo')
    video.srcObject = this.state.stream;

    const client = emitter.connect({host:"192.168.0.121", port:"8080"})
    client.subscribe({
      key: messageEmitterKey,
      channel: messageChannel
    })

    // client.subscribe({
    //   key: timeoutEmitterKey,
    //   channel: timeoutChannel
    // })

    client.on('message', function(msg){
      console.log(JSON.parse(msg.asString()))
    });
  }

  openWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 }
      });

      if (stream === false) {
        return;
      }
  
      this.setState({
        stream
      })
    } catch (err) {
      return false;
    }
  }

  onPlay = async () => {
    const videoEl = document.getElementById('inputVideo')
    const options = getFaceDetectorOptions()
    const result = await faceapi.detectAllFaces(videoEl, options)
 
    if (result.length === 0) {
      return setTimeout(() => this.onPlay(), 1000)
    }

    result.filter((detection) => {
      return detection.score > 0.6
    })

    if (detections === 0) {
      let imagesList = []
      const faceImages = await faceapi.extractFaces(videoEl, result)   
      faceImages.forEach(canvas => {
        imagesList.push(canvas.toDataURL())
      })
      await this.recognize(imagesList)
      detections = [...result]
    } else {
      result.filter((detection) => {
        for (let i = 0; i < detections.length; i++) {
          if (Math.abs(detections[i].box.x - detection.box.x) > 30) {
            continue
          } else {
            return false
          }
        }
        return true
      })

      let imagesList = []
      const faceImages = await faceapi.extractFaces(videoEl, result)   
      faceImages.forEach(canvas => {
        imagesList.push(canvas.toDataURL())
      })
      await this.recognize(imagesList)

      detections = [...result]
    }

    setTimeout(() => this.onPlay(), 1000)
  }

  recognize = async (list) => {
    let prama = []
    list.forEach((image) => {
      prama.push(image.slice(22))
    })
    await axios.post('http://192.168.0.121:7001/image', {
      imageurl: [...prama]
    }).then((resp) => {
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <div id="camera"></div>
        <div className={styles.box}>
          <video onLoadedMetadata={this.onPlay} id="inputVideo" autoPlay muted playsInline></video>
          <canvas className={styles.overlay} id="overlay" />
        </div>
        <div>
        </div>
      </div>
    );
  }
} 

export default Face