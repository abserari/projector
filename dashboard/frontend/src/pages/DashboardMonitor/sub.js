import defaultSettings from'/Users/yang/go/src/github.com/yhyddr/projector/dashboard/frontend/config/defaultSettings.js';
const { hostIP,port,secretKey,channel } = defaultSettings; 

const Sub = (dispatch) => {
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
      console.log(ob.pm);
    });
  };

export default Sub;

