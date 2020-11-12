import React,{useState,useEffect} from 'react';
import { showAlert } from './../extra/extra';
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import { loginUser } from "./../actions/user_actions";
import { loadPost } from "../actions/post_actions";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { signup } from "./../actions/user_actions";
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
   root:{
    backgroundColor:'#edebeb',
    width:'100vw',
    height:'100vh',
    display:'flex',
    flexDirection:'column',
    margin:'auto',
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
      display:'flex', 
      flexDirection:'column',
      width:'100vw',
      height:'100vh',
    },
  },
  post:{
    
    maxWidth:'600px',
    height:'500px',
    border:'solid 1px',
    borderColor:'black',
    borderRadius:'10px',
    textAlign:'left',
    padding:'10px',
    marginBottom:'10px',
    backgroundColor:'white',
    [theme.breakpoints.down('sm')]: {
      height:'450px',
    },

  },
   signup:{
    
    maxWidth:'600px',
    height:'40px',
    border:'solid 1px',
    borderColor:'black',
    borderRadius:'5px',
    textAlign:'left',
    backgroundColor:'white',
  },
  btn:{
    background: 'radial-gradient(circle at 80% 107%, #fdf497 0%, #fdf497 5%, #fd5949 25%, #d6249f 60%, #285AEB 90%)',
    width: "96%" ,
    height:'40px',
    border:'solid  1px',
    borderRadius:'6px',
    fontSize:'20px',
    color:'black',
  },
  textField:{
    width:'43vw',
    [theme.breakpoints.down('sm')]: {
      width: '90vw', 
    },
  },
  save:{
    width:'100%',

  },
  upload:{ 
    color: "black", 
    backgroundColor:'#ff6666',
    [theme.breakpoints.down('sm')]: {
    },
  },
  input:{
    width:'95%',
    border:'solid 1px grey',
    borderRadius:'5px',

    height:'40px',
    [theme.breakpoints.down('sm')]: {
       height:'30px',
    },

  }
  
 
}));
const Signup = ({ signup, auth: { token,isAuthenticated,error } }) => {
    const classes = useStyles();
    const [photo,setPhoto] = useState("");
    const [picurl,setPicUrl] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");
    const history = useHistory()

    const validateForm = () => {return name.length > 0 && passwordConfirm.length >0 && email.length > 0 && password.length > 0;}
    const handleSubmit = (event) => {
        event.preventDefault();
      if(password !== passwordConfirm){
           showAlert('erorr', 'password and confirm Password doest match');  
        }
      }
  useEffect(()=>{
    if(picurl){

        let dataToSubmit = {name,
                email,
                password,
                passwordConfirm,
                photo:picurl
              };

    if(password === passwordConfirm){

        signup(dataToSubmit);
          if(!error && isAuthenticated){         
               showAlert('success', 'signup successfully!');  
               localStorage.setItem('jwt', token);
           history.push('/')
             }
          else {
                showAlert('error', error);  

          }}
      }
    
  },[picurl])
  
  const userPic = () =>{
      
      if(photo !== ""){
        const data = new FormData();
          data.append("file",photo)
        data.append("upload_preset","sukhbir-insta")
        data.append("cloud_name","sukhbir")

        fetch("https://api.cloudinary.com/v1_1/sukhbir/image/upload",{
          method:"post",
          body:data
        })
        .then(res=>res.json())
        .then((data) => {
          console.log(data);
          setPicUrl(data.secure_url)
          console.log(picurl)
        })
        .catch(err =>console.log(err))
    }
    else{
          showAlert('error', 'Please choose a pic');  

    }

};
  return (
    <>  
      <Grid container spacing={0} align='center' justify='center' alignItems='center' className={classes.root} >
              <Grid container spacing={0} className={classes.post}   >
                <Grid item xs={12} align='center' justify='center' alignItems='center' >
                    <img src="https://i.imgur.com/zqpwkLQ.png" />
                    <Typography variant="body" color="black" component="p">
                 sukhbir singh's project
                </Typography>
                </Grid>
                
                <form className={classes.save} onSubmit={handleSubmit} >
                  <Grid container spacing={2} align='center' justify='center' alignItems='center'   >
                  <Grid item xs={12}   >
                      <input type="text" placeholder="Enter Name" value={name} className={classes.input} onChange={e => setName(e.target.value)} required  />
                    </Grid>
                    <Grid item xs={12}   >
                      <input type="text" placeholder="Enter email" value={email} className={classes.input} onChange={e => setEmail(e.target.value)}  required />
                    </Grid>
                    <Grid item xs={12}  >
                      <input type="password" placeholder="Enter password" value={password} className={classes.input}  onChange={e => setPassword(e.target.value)} required />
                    </Grid>
                    <Grid item xs={12}  >
                      <input type="password" placeholder="confirm password" value={passwordConfirm} className={classes.input}  onChange={e => setPasswordConfirm(e.target.value)} required />
                    </Grid>
                    <Grid item xs={6} lg={4}  >
                      <Button variant="contained" component="label" className={classes.upload} >
                            Upload DP
                        <input type="file" onChange={(e)=>setPhoto(e.target.files[0])} style={{ display: "none" }} required />
                      </Button>
                    </Grid>
                      <Grid item xs={6} lg={8} align='center' >
                    </Grid>

                    <Grid item xs={12}  align='center' >
                      <button block bsSize="large" disabled={!validateForm()} type="submit" className={classes.btn} onClick={() => userPic()}> Signup </button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid container spacing={0} align='center' justify='center'  className={classes.signup} >
                <Typography variant="h6" color="black" component="p">
                  Exiting user?<Link to="/login" style={{color:'#0099ff'}}>Login </Link>
                </Typography>

              </Grid>
            </Grid>
    </>
    );
};

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { signup })(Signup);