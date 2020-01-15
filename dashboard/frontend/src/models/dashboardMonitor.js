const Model = {
  namespace: 'dashboardMonitor',
  state: {
    pm: 10,
    tem: 20,
    hum: 30,
  },
  effects: {
    *update({ payload } , { put }) {
      console.log('here',payload);
      yield put({
        type: 'changeData',
        payload: payload,
      });
    },
    
    *update({ payload } , { put }) {
        console.log('here',payload);
        yield put({
          type: 'changeData',
          payload: payload,
        });
      },
  },

  reducers: {
    changeData(state,{ payload }) {
     console.log(payload, 'here again')
      return {
          ...state,
          pm: payload.pm,
          tem: payload.tem,
          hum: payload.hum
        };
    },
  },
};

export default Model;
