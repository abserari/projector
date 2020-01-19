const FaceModel = {
  namespace: 'face',
  state: {
    area: 5000,
    score: 0.5,
    offsetX: 40,
  },

  effects: {
    *area({ payload }, { put }) {
      yield put({
        type: 'modifyArea',
        payload: payload,
      });
    },
    *score({ payload }, { put }) {
      yield put({
        type: 'modifyScore',
        payload: payload,
      });
    },
    *offsetX({ payload }, { put }) {
      yield put({
        type: 'modifyOffsetX',
        payload: payload,
      });
    },
  },

  reducers: {
    modifyArea(state, { payload }) {
      return {
        ...state,
        area: payload,
      };
    },
    modifyScore(state, { payload }) {
      return {
        ...state,
        area: payload,
      };
    },
    modifyOffsetX(state, { payload }) {
      return {
        ...state,
        area: payload,
      };
    },
  },
};

export default FaceModel;
