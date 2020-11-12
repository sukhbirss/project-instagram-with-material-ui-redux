import axios from 'axios';

import { POST_LOADED,LIKE,COMMENT,UNLIKE } from '../actions/types';
import { showAlert } from './../extra/extra'

export const loadPost = () => dispatch => {
       console.log("yo2")

    axios.post('users/post/get',{},{headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer " + localStorage.getItem("jwt")
                          }})
        .then(response => {
          console.log(response)
                    dispatch({
                          type: POST_LOADED,
                          payload: response.data.post
                      })
              })
          
        .catch((err)=> console.log(err))         
}
export const likePost = (id) => dispatch => {
   
  console.log("working")
    axios.patch('/users/post/like',{id},{headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer " + localStorage.getItem("jwt")
                          }})
        .then(response => {
          console.log(response)
                    dispatch({
                          type: LIKE,
                          payload: response.data.post
                      })
              })
          
        .catch((err)=> console.log(err))         
}
export const unLikePost = (id) => dispatch => {
   

    axios.patch('/users/post/unlike',{id},{headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer " + localStorage.getItem("jwt")
                          }})
        .then(response => {
          console.log(response)
                    dispatch({
                          type: UNLIKE,
                          payload: response.data.post
                      })
              })
          
        .catch((err)=> console.log(err))         
}
export const commenting = (comment,post) => dispatch => {
      
    axios.post('/users/post/comment',{comment,post},{headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer " + localStorage.getItem("jwt")
                          }})
        .then(response => {
          console.log(response)
                    showAlert('success','commenting successfull')
                    dispatch({
                          type: COMMENT,
                          payload: response.data.post
                      })
              })
          
        .catch((err)=> console.log(err))         
}