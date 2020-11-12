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

const useStyles = makeStyles((theme) => ({

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
    [theme.breakpoints.down('xs')]: {
      height:'70px',
      width:'70px', 
    },
    
  }
  
}));

const FollowCard = (props) => {
const classes = useStyles();


	return (
    <>
      
      
                  <Grid item xs={12} sm={12} >
                    <Grid container spacing={0} justify='center' align='left' alignItems='center' className={classes.card}>
                      <Grid item xs={3} lg={2} >
                        <Avatar alt="Remy Sharp" src={props.el.photo} className={classes.avatar}/>

                      </Grid>
                      <Grid item xs={5} lg={6}  >
                        <Link to={"/profile/"+props.el._id}>
                           <Typography variant="h6" color="black" component="p">
                              {props.el.name}
                            </Typography>
                        </Link> 
                      </Grid>
                          {props.Followingids.includes(props.el._id)

                           ?
                           <Grid item xs={4} lg={4} >
                                <Button variant="contained" component="label" className={classes.btn} onClick={() => props.unFollowUser(props.el._id)}>
                                   unfollow
                                </Button>
                            </Grid>
                               
                          :
                           <Grid item xs={4} lg={4} >
                                <Button variant="contained" component="label" className={classes.btn} onClick={() => props.followUser(props.el._id)}>
                                   follow
                                </Button>
                            </Grid>     

                           
                         }
                      
                      </Grid>
                    </Grid>
                
     
    </>
	)
};

FollowCard.propTypes = {
  followUser: PropTypes.func.isRequired,
  unFollowUser: PropTypes.func.isRequired,
};



export default connect(null, { followUser,unFollowUser })(FollowCard);

