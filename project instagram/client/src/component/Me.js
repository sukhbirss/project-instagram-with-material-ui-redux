import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAlert } from './../extra/extra'
import {Link} from "react-router-dom";
import { loadPost } from "../actions/post_actions";
import Mucard from './Mucard'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import HomeContainer from './HomeContainer'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { getMe } from "./../actions/user_actions";
import { deleteMyPost } from "./../actions/user_actions";
import Hidden from '@material-ui/core/Hidden';
import DetailDesktop from './DetailDesktop';
import DetailMobile from './DetailMobile';
import CircularProgress from '@material-ui/core/CircularProgress';


const backgroundColor = 'white'
const useStyles = makeStyles((theme) => ({
  root:{
    padding:'0 0 0 560px',
    [theme.breakpoints.down('sm')]: {
      padding: '50px 5px 0 5px', 
    },
  },
  paper: {
    margin:'0 0 0 140px',
    justifyContent:'space-around',
    alignItems:'center',
    display:'flex',
    flexDirection:'column',
    position:'fixed',
    minHeight: "100vh",
    backgroundColor:'#e8e3e3',
  },
  boxx: {
    
    margin:'10px 0 -200px 0',
  },
  card:{
    margin:'auto',
    marginBottom:'10px',
    border:'black',
    color:'black',
  },
  load:{
    padding:'0 0 0 140px',
    [theme.breakpoints.down('sm')]: {
      padding: '50px 5px 0 5px', 
    },
    padding:'0 0 0 0px',
    height:'100vh',
    width:'100vw',
  },
    avatar:{
    height:'200px',
    width:'200px',
    
  },
  btn:{
    background: 'radial-gradient(circle at 80% 107%, #fdf497 0%, #fdf497 5%, #fd5949 25%, #d6249f 60%, #285AEB 90%)',
    width: "50%" ,
    height:'40px',
  },
  floatbtn:{
    position:'fixed',
    bottom:'5%',
    right:'5%',
  }
  
}));

const Me = ({ getMe, auth: {user} , userData:{posts,followingids} }) => {
const classes = useStyles();
  useEffect(()=>{
      getMe(); 
      
},[getMe]);

const trashPost = async(id,postedById) =>{
    let dataToSubmit = {
            id,
            postedById
          }  

    deleteMyPost(dataToSubmit);

    showAlert('success', 'post deleted successfully!');

};



	return (
    
    <>
      {posts !== null && user !== null ?
        <>
            <HomeContainer/>
            <DetailDesktop Me={user} Post={posts} followButton='0'/>
            <DetailMobile Me ={user} Post={posts} followButton='0'/>              
             
              <Grid container spacing={0} justify='center' className={classes.root}  >
              {posts !== null ?
                posts.map((el,i)=>{
                  return(
                          <Grid item xs={12} align='center' justify='center' alignItems='center' className={classes.card} >
                             <Mucard Data={el} User={user} Me='true'/>
                          </Grid>
                        )
                   })
              :
                <Grid container spacing={0} justify='center' align='center' alignItems='center' className={classes.load}  >
                  <CircularProgress color="secondary" />
                </Grid>
              }
              </Grid>
           
           <div className={classes.floatbtn}>
             <Link to="/post">
                <Fab color="primary" size="large" aria-label="add">
                  <AddIcon />
                </Fab> 
              </Link> 
            </div>
</>
        :
        <>
          <HomeContainer/>
          <Grid container spacing={0} justify='center' align='center' alignItems='center' className={classes.load}  >
            <CircularProgress color="secondary" />
          </Grid>
        </>
       }
    </>
    

    
  
	)
};



Me.propTypes = {
  getMe: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  userData: state.userData,
  auth: state.auth
});

export default connect(mapStateToProps, { getMe })(Me);
