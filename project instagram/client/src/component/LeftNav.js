import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Home from '@material-ui/icons/Home';
import PersonAdd from '@material-ui/icons/PersonAdd';
import ExitToApp from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import {Link} from "react-router-dom";
import SettingsIcon from '@material-ui/icons/Settings';
const backgroundColor = 'black'
const useStyles = makeStyles((theme) => ({
  root: {

    display:'flex',
    flexDirection:'column',
    margin:'0 0 0 0',
    position:'fixed',
    height:"100vh",
    width:"140px",
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'black',
  },
  avatar:{
    height:'100px',
    width:'100px',
    
  }
}));

const LeftNav = ({  auth: {user} }) => {
const classes = useStyles();


	return (
  <>
          {user !== null ?
            <Hidden only={['sm', 'xs']}>
            <Box  bgcolor="text.secondary" className={classes.root}>
                    <Link to='/me'>
                      <IconButton aria-label="profile">
                        <Avatar alt="Remy Sharp" src={user.photo} className={classes.avatar}/>
                      </IconButton>
                    </Link>
                    <Link to="/">
                      <IconButton aria-label="home">                 
                        <Home style={{ fontSize: 60, color:'white'}}/> 
                       </IconButton>
                    </Link>
                    <Link to='/find'>

                      <IconButton aria-label="friend">   
                        <PersonAdd style={{ fontSize: 60, color:'white' }}/> 
                      </IconButton>
                    </Link>
                    <Link to='/settings'>
                      <IconButton aria-label="friend">   
                        <SettingsIcon style={{ fontSize: 60, color:'white',paddingLeft:'5px' }}/> 
                      </IconButton>
                    </Link>
                      <IconButton aria-label="logout" onClick={()=>{localStorage.clear();window.location.replace("/login")}}>
>                        <ExitToApp style={{ fontSize: 60, color:'white' }}/> 
                      </IconButton>
            </Box>
            </Hidden>
            :
            <p>Error</p>
          }
         
  </>
	)
};

LeftNav.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});


export default connect(mapStateToProps)(LeftNav);

