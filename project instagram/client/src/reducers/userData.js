import { GET_ME,DELETE_POST,ALL_USER,FOLLOWING,FOLLOWER,FOLLOW,UNFOLLOW ,OWNLIKE} from '../actions/types';

const initialState = {
  posts: null,
  allUser:null,
  followerids:null,
  followingids:null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (action.type) {
    case GET_ME:
      return {
        ...state,
        posts: payload.post
      };
    
    case ALL_USER:
      return {
        ...state,
        allUser: payload
      };
    case FOLLOWING:
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%5')
      return {
        ...state,
        followingids: payload.user.following
      };
    case FOLLOWER:
      return {
        ...state,
        followerids: payload.user.follower
      };
    case FOLLOW:
      return {
        ...state,
        followingids: [payload, ...state.followingids]
      };
    case UNFOLLOW:
      return {
        ...state,
        followingids: state.followingids.filter(el => el !== payload)
      };
    case DELETE_POST:
      return {
      ...state,
      posts:state.posts.filter(el => el.id !== payload)
    }
    default:
      return state;
  }
}

