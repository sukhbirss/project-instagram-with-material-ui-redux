import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAlert } from './../extra/extra'
import {Link,useParams} from "react-router-dom";
import { loadPost } from "../actions/post_actions";
import Mucard from './Mucard'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import HomeContainer from './HomeContainer'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { getUserProfile } from "./../actions/user_actions";
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
  load:{
    padding:'0 0 0 140px',
    [theme.breakpoints.down('sm')]: {
      padding: '50px 5px 0 5px', 
    },
    padding:'0 0 0 0px',
    height:'100vh',
    width:'100vw',
  },
  boxx: {
    
    margin:'10px 0 -200px 0',
  },
  card:{
    margin:'auto',
    border:'black',
    color:'black',
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

const UserProfile = ({ getUserProfile, others: {otherUserposts,otherUserData}, auth:{user} }) => {
const {id} = useParams();
const classes = useStyles();

  useEffect(()=>{
    
      getUserProfile(id); 
      
},[getUserProfile]);



	return (
    
    <>
      {otherUserData && user !== null ?
        <>
            <HomeContainer/>
            <DetailDesktop Me={otherUserData[0]} Post={otherUserposts} followButton={user.following}/>
            <DetailMobile Me ={otherUserData[0]} Post={otherUserposts} followButton={user.following}/>              
             
              <Grid container spacing={1} justify='center' className={classes.root}  >
              {otherUserposts !== null ?
                otherUserposts.map((el,i)=>{
                  return(
                          <Grid item xs={12} align='center' justify='center' alignItems='center' className={classes.card} >
                             <Mucard Data={el} User={user} />
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



UserProfile.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  others: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired

};

const mapStateToProps = (state) => ({
  others: state.others,
  auth:state.auth
});

export default connect(mapStateToProps, { getUserProfile })(UserProfile);
