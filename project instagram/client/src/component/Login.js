import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAlert,changeHtml } from './../extra/extra'
import {Link} from "react-router-dom";
import { loginUser } from "./../actions/user_actions";
import { loadPost } from "../actions/post_actions";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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
      padding: '10px', 
    },
  },
  post:{
    
    maxWidth:'600px',
    height:'400px',
    border:'solid 1px',
    borderColor:'black',
    borderRadius:'10px',
    textAlign:'left',
    padding:'10px',
    marginBottom:'10px',
    backgroundColor:'white',


  },
   signup:{
    
    maxWidth:'600px',
    height:'40px',
    border:'solid 1px',
    borderColor:'black',
    borderRadius:'10px',
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


const Login = ({ loginUser, auth: { token,user,isAuthenticated,error } }) => {
	const classes = useStyles();
  	const history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const validateForm = () => {return email.length > 0 && password.length > 0;}
    const handleSubmit = (event) => {
    	
    	event.preventDefault();
		let dataToSubmit = {
		    		email,
		    		password
		    	}
  		loginUser(dataToSubmit)
      changeHtml('logging...','lgbtn')
}

  if(error){
    showAlert('error', error);
    changeHtml('Try Again','lgbtn')

  }
  

	if (isAuthenticated) {
		showAlert('success', 'Logged in successfully!');
		localStorage.setItem('jwt', token);
		history.push('/');
      } 


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
                  <Grid container spacing={4} align='center' justify='center' alignItems='center'   >
                    <Grid item xs={12}   >
						<input type="text" placeholder="Enter email" value={email} className={classes.input} onChange={e => setEmail(e.target.value)}  required />
                    </Grid>
                    <Grid item xs={12}  >
						<input type="password" placeholder="Enter pass" value={password} className={classes.input}  onChange={e => setPassword(e.target.value)} required />
                    </Grid>
                    <Grid item xs={12} align='center' >
						<button block bsSize="large" disabled={!validateForm()} type="submit" id='lgbtn' className={classes.btn}> Login </button>
                       	
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid container spacing={0} align='center' justify='center' alignItems='center' className={classes.signup} >
                <Typography variant="h6" color="black" component="p">
             		Don't have an account? <Link to="/signup" style={{color:'#0099ff'}}>Sign up </Link>
		        </Typography>

              </Grid>
            </Grid>

			
		</>
		);
};
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(Login);

