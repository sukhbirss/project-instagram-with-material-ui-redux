import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAlert } from './../extra/extra'
import {Link,useHistory} from "react-router-dom";
import { loadPost } from "../actions/post_actions";
import Mucard from './Mucard'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import LeftNav from './LeftNav';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PersonAdd from '@material-ui/icons/PersonAdd';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SettingsIcon from '@material-ui/icons/Settings';

const backgroundColor = 'white'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
    position:'fixed',
    zIndex:'2',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 0,
  },
    avatar:{
    height:'55px',
    width:'55px',
    
  },
  cls: { 
    display:'flex',
    
    justifyContent:'center',
    backgroundColor:backgroundColor,
    [theme.breakpoints.down('sm')]: {
      margin: '0 0 50px 0', 
    },

  }
}));

const HomeContainer = ({  auth: {user} }) => {
const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    
          <>
        {user !== null ?
          <>
            <LeftNav/>
            <div className={classes.cls}>
              <Grid container spacing={2} justify='center' >
                <Hidden only={['md', 'lg']}>
                  <Grid container spacing={2} justify='center' className={classes.root} >
                    <Grid item xs={12} sm={12} >
                      <AppBar position="static" style={{ background: 'black' }}>
                        <Toolbar>
                          <Grid container spacing={0} justify='center' alignItems='center' align='center'>
                            <Grid item xs={2} sm={3} >
                             <Button
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                              >
                                <MenuOutlinedIcon style={{  color:'white' ,fontSize:'30px' }}/>
                                
                              </Button>
                              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                  <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                  >
                                    <Paper>
                                      <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={handleClose}>
                                            <Link to='/'>
                                              <IconButton aria-label="friend">   
                                                  <HomeOutlinedIcon style={{ fontSize: 30, color:'black' }}/>
                                                    home 
                                                </IconButton>
                                              </Link>
                                          </MenuItem>
                                          <MenuItem onClick={handleClose}>
                                            <Link to='/find'>
                                              <IconButton aria-label="friend">   
                                                  <PersonAdd style={{ fontSize: 30, color:'black' }}/>
                                                  add 
                                                </IconButton>
                                              </Link>
                                          </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                          <IconButton aria-label="logout" onClick={()=>{localStorage.clear();window.location.replace("/login")}}>
                                           <ExitToApp style={{ fontSize: 30, color:'black' }}/> 
                                           logout
                                            </IconButton>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link to='/settings'>
                                              <IconButton aria-label="friend">   
                                                <SettingsIcon style={{ fontSize: 30, color:'black' }}/> 
                                                Settings
                                              </IconButton>
                                            </Link>
                                          </MenuItem>
                                        </MenuList>
                                      </ClickAwayListener>
                                    </Paper>
                                  </Grow>
                                )}
                              </Popper>
                            </Grid>
                            <Grid item xs={4} sm={3} >
                             <Link to='/' style={{  color:'white' }}>
                                <h2>
                                  sukhinsta
                                </h2>
                              </Link>
                            </Grid>

                            <Grid item xs={3} sm={3} >
                            </Grid>
                            <Grid item xs={3} sm={3} >
                             <Link to='/me'> <Avatar alt="Remy Sharp" src={user.photo} className={classes.avatar} /></Link>
                            </Grid>
                          </Grid>

                        </Toolbar>
                      </AppBar>
                    </Grid>              
                  </Grid>  
                </Hidden>
             </Grid>
            </div>
          </>
          :
            <p>wait</p>
          }
          </>     


  )
};

HomeContainer.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});


export default connect(mapStateToProps)(HomeContainer);

