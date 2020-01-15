const PersonInfoModel = {
  namespace: 'personInfo',
  state: {
    currentPerson: {},
    persons: [],
    outstandPerson: [],
    timeSpend: 0,
  },

  effects: {
    *modifyCurrentPerson({ payload }, { put }) {
      yield put({
        type: 'modifyCurrent',
        payload: payload,
      });
    },
    *modifyPerson({ payload }, { put }) {
      if (payload == 0) {
        return;
      }
      yield put({
        type: 'modifyPersons',
        payload: payload,
      });
    },
    *modifyTimeSpend({ payload }, { put }) {
      yield put({
        type: 'saveTimeSpend',
        payload: payload,
      });
    },
    *addPerson({ payload }, { put }) {
      yield put({
        type: 'addToPersons',
        payload: payload,
      });
    },
  },

  reducers: {
    modifyPersons(state, { payload }) {
      let tmpArr = state.persons.unshift(state.persons.splice(payload, 1)[0]);
      return {
        ...state,
        persons: [...tmpArr],
      };
    },
    saveTimeSpend(state, action) {
      let time = action.payload.toFixed(2);
      return {
        ...state,
        timeSpend: time,
      };
    },
    addToPersons(state, { payload }) {
      let tmpArr = state.persons.unshift(payload);
      return {
        ...state,
        persons: [...tmpArr],
      };
    },
    modifyCurrent(state, { payload }) {
      let storage = window.localStorage;
      storage.setItem('person', JSON.stringify(payload));
      console.log(storage.getItem('person'));
      return {
        ...state,
        currentPerson: payload,
      };
    },
  },
};

export default PersonInfoModel;
