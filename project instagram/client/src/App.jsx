import React,{ useReducer,useEffect } from 'react';
import { Route,Switch,useHistory } from 'react-router-dom'
import Signup from './component/Signup'
import Login from './component/Login'
import Follow from './component/Follow'
import MyFollowing from './component/MyFollowing'
import MyFollower from './component/MyFollower'
import Me from './component/Me'
import Navbar from './Navbar'
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from "./actions/user_actions";
import { LOGOUT} from './actions/types';
import Home from './component/Home'
import HomeContainer from './component/HomeContainer'
import Post from './component/Post'
import UserProfile from './component/UserProfile'
import Settings from './component/Settings'

const Routing = ()=>{
  return(
  			<Switch>
			    <Route exact path="/" component={Home}/>
			    <Route exact path="/home" component={HomeContainer}/>
			    <Route exact path="/post" component={Post}/>
			    <Route path="/signup" component={Signup}/>
			    <Route exact path="/login" component={Login}/>
			    <Route path="/find" component={Follow}/>
			    <Route path="/following" component={MyFollowing}/>
			    <Route path="/follower" component={MyFollower}/>
			    <Route path="/me" component={Me}/>
			    <Route path="/Settings" component={Settings}/>

   			    <Route path="/profile/:id" component={UserProfile}/>

			</Switch>
  )
}

const App = () => {
  useEffect(() => {

  	if(localStorage.jwt){
  		store.dispatch(loadUser());
  	}

    if (!localStorage.getItem("jwt") && window.location.pathname !=="/login") {
		window.location.replace("/login");
    }

	window.addEventListener('storage', () => {
      if (!localStorage.jwt) store.dispatch({ type: LOGOUT });
      window.location.replace("/login");
    });

  }, []);

	return (
		<>
		    <Provider store={store}>
 			 	<Routing />
    		</Provider>
		</>
		);
};
export default App;