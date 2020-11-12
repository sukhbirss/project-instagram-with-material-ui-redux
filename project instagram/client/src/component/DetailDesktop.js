import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import { followUser,unFollowUser } from "./../actions/user_actions";

const backgroundColor = 'white'
const useStyles = makeStyles((theme) => ({

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

    avatar:{
    height:'200px',
    width:'200px',
    
  },
  btn:{
    background: 'radial-gradient(circle at 80% 107%, #fdf497 0%, #fdf497 5%, #fd5949 25%, #d6249f 60%, #285AEB 90%)',
    width: "50%" ,
    height:'40px',
  },
  
  
}));
const DetailDesktop = (props) => {
const classes = useStyles();


	return (
  
          
            <Hidden only={['xs', 'sm']}>
                  <Paper className={classes.paper} >
                    <Grid container spacing={2} align='center' justify='center' alignItems='center' className={classes.boxx}>
                      {props.followButton !== '0' ?
                        <>
                          {props.followButton.includes(props.Me._id) ?
                            <Grid item xs={12} >
                              <Button variant="contained" component="label" className={classes.btn} onClick={() => props.unFollowUser(props.Me._id)}>
                                unFollow
                              </Button>
                            </Grid>
                          :
                            <Grid item xs={12} >
                              <Button variant="contained" component="label" className={classes.btn} onClick={() => props.followUser(props.Me._id)}>
                                Follow
                              </Button>
                            </Grid>
                          }
                        </>
                          :
                          <Grid item xs={12} >
                          </Grid>
                        }
                      <Grid item xs={12} >
                        <Avatar alt="Remy Sharp" src={props.Me.photo} className={classes.avatar}/>
                      </Grid>
                      <Grid item xs={12} >
                        <Typography variant="h6" color="black" component="p">
                            {props.Me.name}
                        </Typography>
                      </Grid>  
                    </Grid>  
                      <Grid container spacing={0} align='center'  >
                        <Grid item xs={4} >
                          <Typography variant="h6" color="black" component="p">
                          Post
                          </Typography>
                        </Grid>
                        <Grid item xs={4} >
                        <Typography variant="h6" color="black" component="p">
                          <Link to='/follower'>Follower</Link>
                          </Typography>
                        </Grid>
                        <Grid item xs={4} >
                          <Typography variant="h6" color="black" component="p">
                          <Link to='/following'>Following</Link>
                          </Typography>
                        </Grid>
                        <Grid item xs={4} >
                          <Typography variant="h6" color="black" component="p">
                            {props.Post.length}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} >
                          <Typography variant="h6" color="black" component="p">
                            {props.Me.follower.length}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} >
                          <Typography variant="h6" color="black" component="p">
                          {props.Me.following.length}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} >
                          <Typography variant="h6" color="black" component="p">
                          ---BIO----
                          </Typography>
                        </Grid>
                      </Grid>
                  </Paper>
                 </Hidden>
         

	)
};
DetailDesktop.propTypes = {
  followUser: PropTypes.func.isRequired,
  unFollowUser: PropTypes.func.isRequired,
};



export default connect(null, { followUser,unFollowUser })(DetailDesktop);




