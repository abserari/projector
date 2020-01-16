import defaultSettings from '../../../../config/defaultSettings.js';

const { hostIP,port,secretKey,channel } = defaultSettings; 

const Publish = value => {
    const client = require('emitter-io').connect({ host: hostIP, port: port});

    client.publish({
      key: secretKey,
      channel: channel,
      message: JSON.stringify(value),
    });
  };
  export default Publish;