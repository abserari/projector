import defaultSettings from'../../config/defaultSettings.js';
const { hostIP,port,secretKey,channel } = defaultSettings; 

function Sub(dispatch) {
    const client = require('emitter-io').connect({ host: hostIP, port:port });

    client.subscribe({
      key: secretKey,
      channel: channel,
    });

    client.on('message', function(msg) {
      const ob = msg.asObject();
      dispatch({
        type: 'dashboardMonitor/update',
        payload: ob,
      });

      dispatch({
        type: 'dashboardMonitor/store',
        payload: ob,
      });
    });
  };


  export function Publish(value){
    const client = require('emitter-io').connect({ host: hostIP, port: port});

    client.publish({
      key: secretKey,
      channel: channel,
      message: JSON.stringify(value),
    });
  };

  export default Sub;



