const Model = {
  namespace: 'dashboardMonitor',
  state: {
    pm: getValue('pm'),
    tem: getValue('tem'),
    hum: getValue('hum'),
  },
  effects: {
    *update({ payload } , { put }) {
      yield put({
        type: 'changeData',
        payload: payload,
      });
    },
    store({payload}){
        localStorage.setItem('data',JSON.stringify(payload))
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

function getValue(key){
  const state=localStorage.getItem('data')
  const value= JSON.parse(state)
  return value[key]
}
