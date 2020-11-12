import { POST_LOADED,COMMENT,LIKE,UNLIKE } from '../actions/types';

const initialState = {
  allpost: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (action.type) {

    case POST_LOADED:
      return {
        allpost:payload
        };
    case COMMENT:
      return {
        ...state,
        allpost:state.allpost.map(post => 
           post._id === payload._id ? { ...post, comment: payload.comment }: post)                               
        }
    case LIKE:
    console.log(payload)
      return {
        ...state,
        allpost:state.allpost.map(post => 
           post._id === payload._id ? { ...post, likes: payload.likes }: post)                               
        }
    case UNLIKE:
    console.log(payload)
      return {
        ...state,
        allpost:state.allpost.map(post => 
           post._id === payload._id ? { ...post, likes: payload.likes }: post)                               
        }
    default:
      return state;
  }
}
