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
import HomeContainer from './HomeContainer';
import { followUser,unFollowUser,getAllUser } from "./../actions/user_actions";
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FollowCard from './FollowCard';
import CircularProgress from '@material-ui/core/CircularProgress';

const backgroundColor = 'white'
const useStyles = makeStyles((theme) => ({
  root:{

    padding:'10px 0 0 140px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 3px 0 3px', 
    },
  },
  load:{
    padding:'0 0 0 0px',
    height:'100vh',
    width:'100vw',
  },
  card:{
    display:'flex',
    border:'solid 2px',
    borderColor:'black',
    borderRadius:'20px',
    maxWidth:'600px',
    height:'100px',
    padding:'3px',
    margin:'10px 0 10px 0',
  },
  btn:{
    background: '#ff6e63',
    width: "100%" ,
    height:'40px',
  },
  avatar:{
    position:'sticky',
    height:'90px',
    width:'90px',
    
  },
  floatbtn:{
    position:'fixed',
    bottom:'5%',
    right:'5%',
  }
  
}));

const MyFollower = ({ userData:{followerids,followingids} }) => {
const classes = useStyles();
  const [data,setData] = useState([]);

  useEffect(()=>{
      fetch("/users/follower",{
        method:'post',
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          }
      })
      .then(res=>res.json())
      .then(res => {
        if(res.message ==="jwt expired"){
          localStorage.clear()
                  window.location.replace("/login");
        }
        setData(res.user.follower); 
        console.log(res)})
      .catch(err =>console.log(err))     
},[]);


	return (
    <>
      <HomeContainer/>
      {data && followingids !== null ? 
          <>
            <Grid container spacing={0} justify='center' align='center' className={classes.root}>
              
              {data.map((ell,i)=>{
                  return(
                  <FollowCard el={ell} Followingids={followingids} />
                )
                })
              }
            </Grid>
           
           <div className={classes.floatbtn}>
             <Link to="/post">
                <Fab color="secondary" size="large" aria-label="add">
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
	)
};

MyFollower.propTypes = {
  followUser: PropTypes.func.isRequired,
  unFollowUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  userData: state.userData
});

export default connect(mapStateToProps, { followUser,unFollowUser })(MyFollower);

