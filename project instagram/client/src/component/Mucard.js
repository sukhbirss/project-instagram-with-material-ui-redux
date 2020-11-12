import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAlert } from './../extra/extra'
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import Comment from '@material-ui/icons/Comment';

import TextField from '@material-ui/core/TextField';
import { likePost,unLikePost,commenting } from "../actions/post_actions";

const useStyles = makeStyles((theme) => ({
  root: {
    
    maxWidth: 400,
    border:'solid 1px',
    borderColor:'black',
    borderRadius:'18px',
    textAlign:'left',
  },
  media: {
    height: 20,
    paddingTop: '100%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar:{
    height:'60px',
    width:'60px',
    
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
 
  input: {
    '& > *': {
      margin: theme.spacing(1),
      width: '95%',
    },
  },
}));

const Cards = (props) => {
  console.log(props);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <>
     {props !== null ? 
            <>
          <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar alt="Remy Sharp" src={props.Data.postedBy.photo} className={classes.avatar} />
            
        }
        action={
          <IconButton aria-label="settings">
             
          </IconButton>
        }
        title={
          <Link to={"/profile/"+props.Data.postedBy._id}>

            <Typography variant="h6" color="black" component="p">
            {props.Data.postedBy.name}
          </Typography>
          </Link>
      }
        style={{ padding: 6 }}
      />
      <CardMedia
        className={classes.media}
        image={props.Data.photo}
        title="Paella dish"
      />
      
      <CardActions disableSpacing style={{ padding: 0 }} >
      {props.Data.likes.includes(props.User._id) 
        ?
        <IconButton aria-label="add to favorites" onClick={()=>props.unLikePost(props.Data._id)} >    
          <FavoriteIcon color="secondary" style={{ fontSize: 35 }}/>
          {props.Data.likes.length}
        </IconButton>
        :
        <IconButton aria-label="add to favorites" onClick={()=>props.likePost(props.Data._id)} >    
          <FavoriteBorder color="black" style={{ fontSize: 35, color:'black' }}/>
          {props.Data.likes.length}

        </IconButton>
      }
        

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >

        <Comment style={{ fontSize: 35, color:'black' }}/>
        {props.Data.comment.length}
  </IconButton>
      </CardActions>
      <CardContent style={{ padding: 3 , display:'flex' , flexDirection:'row' ,align:'center',alignItems:'center'}}>
        <Typography variant="h6" color="black" component="p">
          {props.Data.postedBy.name} 
          
        </Typography>
        <p>::</p>
        <Typography variant="subtitle2" color="black" component="p">
         {props.Data.text}
        </Typography>

      </CardContent>
      <form className={classes.input} noValidate autoComplete="off" onSubmit={(e)=>{
                                    e.preventDefault() 
                                    props.commenting(e.target[0].value,props.Data._id) }} >
       <TextField id="standard-basic" label="Comment" />
      </form>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        {props.Data.comment.map((ell,i)=>{if(i<3){return(   
                                                            <CardContent style={{ padding: 3 , display:'flex' , flexDirection:'row' }}>
                                                              <Typography variant="h6" color="black" component="p">
                                                                {ell.username} 
                                                                
                                                              </Typography>

                                                              <Typography variant="subtitle1" color="black" component="p">
                                                               : {ell.text}
                                                              </Typography>

                                                            </CardContent>
                                                                                                                                
                                                                          )}})}
         

        </CardContent>
      </Collapse>
    </Card>
    </>
    :
            <div >
              <p>no man</p>
            </div>
            
           
           }
    </>
  )
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
  userData: state.userData
});

export default connect(mapStateToProps, { likePost,unLikePost,commenting })(Cards);