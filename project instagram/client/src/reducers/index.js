import { combineReducers } from 'redux';
import auth from './auth';
import userData from './userData';
import post from './post';
import others from './others';

export default combineReducers({
  auth,
  userData,
  post,
  others
});
