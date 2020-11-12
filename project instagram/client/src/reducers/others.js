import { USERPROFILE} from '../actions/types';

const initialState = {
  otherUserposts: null,
  otherUserData: null,

};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (action.type) {
    case USERPROFILE:
      return {
        ...state,
        otherUserposts: payload.posts,
        otherUserData:payload.user,
      };
        default:
      return state;
  }
}

