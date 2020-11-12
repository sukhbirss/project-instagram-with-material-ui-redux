import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAlert,changeHtml } from './../extra/extra'
import {Link} from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { updateMe } from "../actions/user_actions";
import { makeStyles } from '@material-ui/core/styles';
import HomeContainer from './HomeContainer'
import CircularProgress from '@material-ui/core/CircularProgress';

const backgroundColor = 'white'
const useStyles = makeStyles((theme) => ({
  root:{
    padding:'0 0 0 140px',
    height:'100vh',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 10px 0 10px', 
      height:'100vh',

    },
  },
  setingbox:{
    border:'solid 1px black',
    borderRadius:'10px',
    boxShadow:'2px 2px 30px 10px grey',
    height:'600px',
    width:'700px',
    padding:'10px 10px 20px 20px',
    [theme.breakpoints.down('sm')]: {
      height:'450px',
      width:'500px',
      padding:'10px 10px 20px 20px',
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
    avatar:{
    height:'150px',
    width:'150px',
    [theme.breakpoints.down('sm')]: {
      height:'100px',
      width:'100px',
    },
  },
  input:{
    border:'solid 1px black',
    borderRadius:'5px',
    width:'100%',
    height:'50px',
    [theme.breakpoints.down('sm')]: {
       height:'30px',
    },
  },
  floatbtn:{
    position:'fixed',
    bottom:'5%',
    right:'5%',
  }
  
}));

const Settings = ({ updateMe,auth: {user} }) => {
const classes = useStyles();
const [name,setName] = useState('');
const [email,setEmail] = useState('');
const [photo,setPhoto] = useState("")
const [password,setPassword] = useState('');
const [pic,setPic] = useState("")

  

  useEffect(()=>{
    
    if(photo){

      updateMe({photo})
      showAlert('success', 'posted  successfully!');
      

      }
       
  },[photo])


const postData = () =>{
    
      console.log('1');
      const data = new FormData();
      data.append("file",pic)
      data.append("upload_preset","sukhbir-insta")
      data.append("cloud_name","sukhbir")
      fetch("https://api.cloudinary.com/v1_1/sukhbir/image/upload",{
        method:"post",
        body:data
      })
      .then(res=>res.json())
      .then((data) => {
        setPhoto(data.secure_url)
      })
      .catch(err =>console.log(err))

};
  
	return (
    
    <>
      <HomeContainer/>
      {user !== null ? 
          <>
            <Grid container spacing={0} justify='center' align='center' alignItems='center' className={classes.root}  >
              <Grid container spacing={1}  align='center' className={classes.setingbox}  >
                <Grid item xs={12}>
                  <input accept="image/*" style={{ display: "none" }} onChange={(e)=>setPic(e.target.files[0])} id="icon-button-file" type="file" />
                  <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <Avatar src={user.photo} className={classes.avatar} />
                    </IconButton>
                  </label>
                </Grid>  
                <Grid item xs={12}>
                  <Button variant="outlined" color="primary" id='updatepic' disabled={ pic == "" } onClick={() => postData()}>
                    Upload
                  </Button>                   
                </Grid>  
                <Grid item xs={12}  style={{ textAlign: 'left'}} >
                  <Typography variant="subtitle2" color="black" component="p">
                   Update Name
                  </Typography>                  
                </Grid> 
                 
                <Grid item xs={8}>
                  <input type="text" placeholder={user.name} value={name} className={classes.input} onChange={e => setName(e.target.value)} />
                </Grid>   
                <Grid item xs={4}>
                  <Button variant="outlined" color="primary" id='updatename' disabled={name === ''} onClick={() => updateMe({name})}>
                    Update
                  </Button>                   
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'left'}}>
                  <Typography variant="subtitle2" color="black" component="p">
                   Update Email
                  </Typography>                  
                </Grid>
                <Grid item xs={8}>
                  <input type="email" placeholder={user.email} value={email} className={classes.input} onChange={e => setEmail(e.target.value)} />
                </Grid>   
                <Grid item xs={4}>
                  <Button variant="outlined" color="primary" id='updateemail' disabled={!email.length > 0} onClick={() => updateMe({email})}>
                    Update
                  </Button>                   
                </Grid>  
                <Grid item xs={12} style={{ textAlign: 'left'}}>
                  <Typography variant="subtitle2" color="black" component="p">
                   Update Password
                  </Typography>                  
                </Grid>
                <Grid item xs={8}>
                  <input type="password" placeholder='********' value={password} className={classes.input} onChange={e => setPassword(e.target.value)} />
                </Grid>   
                <Grid item xs={4}>
                  <Button variant="outlined" color="primary" id='updatepassword' disabled={!password.length > 0} onClick={() => updateMe({password})}>
                    Update
                  </Button>                   
                </Grid>          
              </Grid>
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

  

	)
};

Settings.propTypes = {
  auth: PropTypes.object.isRequired,
  updateMe: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateMe })(Settings);

