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
    *markPerson({ payload }, { put }) {
      yield put({
        type: 'addToOutstandingPerson',
        payload: payload,
      });
    },
  },

  reducers: {
    modifyPersons(state, { payload }) {
      state.persons.unshift(state.persons.splice(payload, 1)[0]);
      return {
        ...state,
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
      state.persons.unshift(payload);
      return {
        ...state,
      };
    },
    modifyCurrent(state, { payload }) {
      let storage = window.localStorage;
      storage.setItem('person', JSON.stringify(payload));
      return {
        ...state,
        currentPerson: payload,
      };
    },
    addToOutstandingPerson(state, { payload }) {
      for (let i = 0; i < state.outstandPerson.length; i++) {
        if (state.outstandPerson[i].id === payload.id) {
          state.outstandPerson.unshift(state.outstandPerson.splice(i, 1)[0]);
          return {
            ...state,
          };
        }
      }
      state.outstandPerson.unshift(payload);
      return {
        ...state,
      };
    },
  },
};

export default PersonInfoModel;
