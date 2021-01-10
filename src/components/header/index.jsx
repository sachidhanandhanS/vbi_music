import React from 'react';
import {
  Link,
  Typography,
  Toolbar,
  AppBar
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import useStyles from './styles'

const Header = ({ history }) => {
  const classes = useStyles();
  
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography
          variant="h6"
          className={classes.title}
          onClick={() => {
            history.push('/')
          }}
        >
          VBI Music
        </Typography>
        <Link
          className={classes.link}
          onClick={() => {
            history.push('/albums')
          }}
        >
          Albums
        </Link>
        <Link
          className={classes.link}
          onClick={() => {
            history.push('/playlist')
          }}
        >
          Playlist
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header)