const Model = {
  namespace: 'dashboardMonitor',
  state: {
    pm: 10,
    tem: 20,
    hum: 30,
  },
  effects: {
    *update({ payload } , { put }) {
      yield put({
        type: 'changeData',
        payload: payload,
      });
    },

    // *store({ payload } , { put }) {
    //     yield put({
    //       type: 'service/storeData',
    //       payload: payload,
    //     });
    //   },
    store({payload}){
        let i=1
        localStorage.setItem(i,JSON.stringify(payload))
        i++
    }
  },

  reducers: {
    changeData(state,{ payload }) {
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
