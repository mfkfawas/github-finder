//here will be all our reducers will go that are related to the Github State
const githubReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case 'CLEAR_USERS':
      return {
        ...state,
        users: [],
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default githubReducer;
