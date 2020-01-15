const Publish = value => {
    const client = require('emitter-io').connect({ host: '127.0.0.1', port: '8080' });

    client.publish({
      key: 'Ws8wxZjTP9GbEbncf8FYCHr_volK1Bbu',
      channel: 'pine',
      message: JSON.stringify(value),
    });
  };
  export default Publish;