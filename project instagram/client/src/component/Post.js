import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAlert,changeHtml } from './../extra/extra'
import {Link,useHistory} from "react-router-dom";
import { loadPost } from "../actions/post_actions";
import Mucard from './Mucard'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import HomeContainer from './HomeContainer'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const backgroundColor = 'white'
const useStyles = makeStyles((theme) => ({
   root:{
    padding:'20vh 0 0 140px',
    display:'flex',
    margin:'auto',
    [theme.breakpoints.down('sm')]: {
      padding: '10vh 10px 10px 10px', 
    },
  },
  post:{
    margin:'auto',
    maxWidth:'700px',
    maxHeight:'600px',
    margin:'auto',
    border:'solid 2px',
    borderColor:'black',
    borderRadius:'20px',
    textAlign:'left',
    padding:'10px',

  },
  btn:{
    background: 'radial-gradient(circle at 80% 107%, #fdf497 0%, #fdf497 5%, #fd5949 25%, #d6249f 60%, #285AEB 90%)',
    width: "100%" ,
     height:'40px',
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
  input: {
    '& > *': {
      margin: theme.spacing(1),
      width: '95%',
    },
  },
 
}));

const Post = () => {
const classes = useStyles();
    const [text, setText] = useState("")
    const [photo,setPhoto] = useState("")
    const [picurl,setPicUrl] = useState("")
    console.log(text)
    const handleSubmit = (event) => event.preventDefault();
  
  useEffect(()=>{
    console.log('2');
    if(picurl){

        fetch("/users/post",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          },  
        body:JSON.stringify({text,photo,picurl})
        })

        .then(res=>res.json())
        .then(data => {
          console.log(data)
          if(data.status === "success"){
              
              changeHtml('Posted','postbtn');

            }
          })
        .catch(err =>console.log(err))

      }
       
  },[picurl])

    const postData = () =>{
      changeHtml('Posting...','postbtn');
      console.log('1');
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

};
	return (
    <>

            <HomeContainer/>
            <Grid container spacing={0} align='center' justify='center' alignItems='center' className={classes.root} >
              <Grid container spacing={2} className={classes.post}   >
                <Grid item xs={12} align='center' justify='center' alignItems='center' >
                  <Typography variant="h3" color="black" component="p">
                    Post
                  </Typography>
                </Grid>

                <Grid item xs={12}   >
                  <Typography variant="h6" color="black" component="p">
                    Type The Caption
                  </Typography>
                </Grid>

                <form className={classes.save} noValidate autoComplete="off" >
                  <Grid container spacing={3}    >
                    <Grid item xs={12}   >
                      <TextField id="standard-basic" label="caption" className={classes.textField} value={text} onChange={e => setText(e.target.value)} />
                    </Grid>

                    <Grid item xs={12}  >
                      <Typography variant="h6" color="black" component="p">
                        Choose A Pic
                      </Typography>
                    </Grid>

                    <Grid item xs={12}  >
                      <Button variant="contained" component="label" >
                            Upload File
                        <input type="file" onChange={(e)=>setPhoto(e.target.files[0])} style={{ display: "none" }}/>
                      </Button>
                    </Grid>

                    <Grid item xs={12}  >
                        <Button variant="contained" component="label" className={classes.btn} id='postbtn' onClick={() => postData()} >
                          PostIt
                        </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
           
           
    </>     

	)
};



export default Post;

