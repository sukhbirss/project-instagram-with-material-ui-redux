import axios from 'axios';
import { LOGIN_SUCCESS,GET_ME,USER_LOADED ,UPDATED,
          DELETE_POST,ALL_USER,FOLLOWING,
          FOLLOWER,FOLLOW,UNFOLLOW,
          USERPROFILE,SIGNUP,ERROR} from '../actions/types';
import store from '../store';
import { showAlert,changeHtml } from './../extra/extra'

export const loginUser = (dataToSubmit) => dispatch => {
    axios.post('/users/login',dataToSubmit)
                .then(response => {
                     dispatch({
                                type: LOGIN_SUCCESS,
                                payload: response.data
                              })
                      dispatch({
                          type: FOLLOWING,
                          payload: response.data
                               })
                      dispatch({
                          type: FOLLOWER,
                          payload: response.data
                      })
                })
                 .catch((err)=>{
                      dispatch({
                          type: ERROR,
                          payload: err.response.data.message
                        })
                 })         
}

export const loadUser = () => dispatch => {
    axios.post('/users',{},{headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer " + localStorage.getItem("jwt")
                          }})
              .then(response => {
                    dispatch({
                          type: USER_LOADED,
                          payload: response.data
                      })
                    dispatch({
                          type: FOLLOWING,
                          payload: response.data
                      })
                    dispatch({
                          type: FOLLOWER,
                          payload: response.data
                      })
              })
        .catch((err)=>(console.log(err)))   

}

export const deleteMyPost = (dataToSubmit) =>{

store.dispatch({
          type: DELETE_POST,
         payload: dataToSubmit.id
      
      })

    // axios.delete('/users/post/mypost',data: {id,postedById}{headers:{
    //                         "Content-Type":"application/json",
    //                         "Authorization":"Bearer " + localStorage.getItem("jwt")
    //                       }})
    //           .then(response => 
    //                 dispatch({
    //                       type: DELETE_POST,
    //                       payload: dataToSubmit.id
    //                   })
    //           )
    //     .catch((err)=>(err.response))         
}

export const getMe = (dataToSubmit) => dispatch => {

        fetch("/users/post/mypost",{
        method:'post',
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          }
        })
        .then(res=>res.json())
        .then(response => {
              dispatch({
                          type: GET_ME,
                          payload: response
                      })
            }
                  )  
        .catch((err)=>(console.log("error",err)))         
}

export const getAllUser = (dataToSubmit) => dispatch => {
    axios.post('users/alluser',{})
                .then(response => 
                     dispatch({
                                type: ALL_USER,
                                payload: response.data.user
                              })
                )
                 .catch((err)=>(err.response))              
}
// export const getAllfollowing = (dataToSubmit) => dispatch => {
//     axios.get('users/following')
//                 .then(response => 
//                      dispatch({
//                                 type: POPULATED_FOLLOWING,
//                                 payload: response.data.user.following
//                               })
//                 )
//                  .catch((err)=>(err.response))              
// }

export const followUser = (id) => dispatch => {
    axios.patch('/users/follow',{id},{headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer " + localStorage.getItem("jwt")
                          }})
                .then(response =>{
                          dispatch(loadUser());
                          dispatch({
                                    type: FOLLOW,
                                    payload:id
                                })
                          
                          })
                .catch((err)=>(err.response))                        
}
export const unFollowUser = (id) => dispatch => {
    axios.patch('/users/unfollow',{id},{headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer " + localStorage.getItem("jwt")
                          }})
                .then(response =>{
                          dispatch(loadUser());
                          dispatch({
                                    type: UNFOLLOW,
                                    payload:id
                                })
                          
                          })
                .catch((err)=>(err.response))                        
}

export const signup = (dataToSubmit) => dispatch => {
    
     axios.post('/users/signup',dataToSubmit)           
                               .then(response => {
          
                                    dispatch({
                                          type:SIGNUP ,
                                          payload:response.data
                                      })}
                                    )
                               .catch((err)=>{
                                    dispatch({
                                        type: ERROR,
                                        payload: err.response.data.message
                                      })
                 })  
            
}
export const updateMe = (data) => dispatch => {
    //changeHtml('Updating',`update${Object.keys(data)[0]}`)
    showAlert('success',`UPDATING ${Object.keys(data)[0]}`)
    axios.patch('/users/updateme',{data},{headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer " + localStorage.getItem("jwt")
                          }})
                .then(response =>{
                          dispatch(loadUser());
                          showAlert('success',` ${Object.keys(data)[0]} UPDATED`)

                          })
                .catch((err)=>(err.response))                        
}
export const getUserProfile = (id) => dispatch => {
   

    axios.post(`/users/profile/${id}`,{},{headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer " + localStorage.getItem("jwt")
                          }})
        .then(response => {
          
                    dispatch({
                          type:USERPROFILE ,
                          payload:response.data
                      })
              })
          
        .catch((err)=> console.log(err))         
}