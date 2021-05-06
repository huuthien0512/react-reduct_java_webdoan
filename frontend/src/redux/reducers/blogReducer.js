import {
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_REQUEST
} from '../constants/blogConstants'

const initState = {
  blogs: []
};

const blogReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_BLOGS_REQUEST:
      return { loading: false, ...state };
    case FETCH_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: action.payload
      };
    default:
      return state;
  }
};

export default blogReducer;