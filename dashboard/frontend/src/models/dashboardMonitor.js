const Model = {
  namespace: 'dashboardMonitor',
  state: {
    pm: 10,
    tem: 20,
    hum: 30,
  },
  effects: {
    *changePM25({ value }, { put }) {
      console.log('here');
      yield put({
        type: 'PM25',
        payload: value,
      });
    },
  },
  reducers: {
    PM25(value) {
      state = {
        pm: value,
      };
      return state;
    },
  },
};

export default Model;
