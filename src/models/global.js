export default {
  namespace: 'global',

  state: {
    collapsed: false,
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        collapsed: payload,
      };
    },
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
