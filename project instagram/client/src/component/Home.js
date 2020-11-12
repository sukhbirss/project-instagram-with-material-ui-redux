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
import HomeContainer from './HomeContainer'
import CircularProgress from '@material-ui/core/CircularProgress';
const backgroundColor = 'white'
const useStyles = makeStyles((theme) => ({
  root:{
    padding:'0 0 0 140px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px 5px 0 5px', 
    },
  },
  load:{
    display:'flex',
    flexDirection:'column',
    padding:'0 0 0 140px',
    [theme.breakpoints.down('sm')]: {
      padding: '50px 5px 0 5px', 
    },
    height:'100vh',
    width:'100vw',
  },
  card:{
    margin:'auto',
    border:'black',
    color:'black',
  },
  floatbtn:{
    position:'fixed',
    bottom:'5%',
    right:'5%',
  }
  
}));

const Home = ({ loadPost, post:{allpost}, auth: {user},userData:{followingids} }) => {
const classes = useStyles();
useEffect(()=>{
    loadPost();      
},[loadPost]);




	return (
    <>
    <HomeContainer/>
  {followingids !== null && followingids.length !== 0 ? 

    <>
      {allpost !== null ? 
          <>
            
            <Grid container spacing={2} justify='center' className={classes.root}  >
              {
                allpost.map((el,i)=>{
                  return(
                          <Grid item xs={12} align='center' justify='center' alignItems='center' className={classes.card} >
                             <Mucard Data={el} User={user} Following={followingids}/>
                          </Grid>
                        )
                   })}
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
         
          <Grid container spacing={0} justify='center' align='center' alignItems='center' className={classes.load}  >
              <CircularProgress color="secondary" />
          </Grid>
           }
    </>
    :
    <Grid container spacing={0} justify='center' align='center' alignItems='center' className={classes.load}  >
              <h3>Welcome,Please follow somebody otherwise feed mai nobody :)</h3>
              <br/>
              <h3>Click on menu and then add</h3>
    </Grid>
  }
  </>
	)
};

Home.propTypes = {
  loadPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
  userData: state.userData
});

export default connect(mapStateToProps, { loadPost})(Home);

