import React from 'react';
import {
  Typography,
  Divider
} from '@material-ui/core';
import Image from 'react-bootstrap/Image';


const NewsPost = (props) => {
  
  return (
    <div style={{ padding: "20px", marginTop: "20px", marginBottom: "20px" }}> 
      <Typography variant="h4" color="textPrimary" align="left">
        {props.title}
      </Typography>
      <Typography gutterBottom variant="subtitle1" color="textSecondary" align="left">
        {props.author}
      </Typography>
      <Divider />
      <img src={props.imageURL} alt="SOLSTICE article image"/>
      <Typography gutterBottom variant="h6" align="left">
        {props.imageURL}
      </Typography>
      <Typography gutterBottom variant="h6" align="left">
        {props.text}
      </Typography>
      <Typography  
        variant="subtitle1" 
        color="textSecondary"
        align="right"
      >
        Published: {props.date}
      </Typography>
    </div>
    
  );
}

export default NewsPost;
