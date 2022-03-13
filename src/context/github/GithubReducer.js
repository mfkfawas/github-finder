//here will be all our reducers will go that are related to the Github State
const githubReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default githubReducer;
