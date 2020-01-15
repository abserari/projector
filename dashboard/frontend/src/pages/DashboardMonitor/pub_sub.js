const Sub = (dispatch) => {
    const client = require('emitter-io').connect({ host: '127.0.0.1', port: '8080' }); // once we're connected, subscribe to the 'chat' channel

    client.subscribe({
      key: 'Ws8wxZjTP9GbEbncf8FYCHr_volK1Bbu',
      channel: 'pine',
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
