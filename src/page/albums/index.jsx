import React from 'react';
import songApi from '../../api/song';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles'

const styles = () => ({
  container: {
    padding: '40px 20px',
    overflow: 'auto',
    height: 'calc(100% - 150px)'
  },
  img: {
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
  }
})

class Albums extends React.Component {
  state = {
    albums: []
  }

  async componentDidMount() {
    try {
      const albums = await songApi.getAllAlbums() 
      this.setState({
        albums
      })
    } catch(e) {
      console.error('Error while fetching albums', e.message)
    }
  }

  render() {
    const { classes } = this.props
    const { albums } = this.state
    return (
      <main className={classes.container}>
        <Grid container spacing={3} wrap="wrap">
          {albums.map(album => {
            return(
              <Grid item sm={4} md={3} lg={2} key={album.id}>
                <Typography>
                  {album.title}
                </Typography>
              </Grid>
              )
            })}
        </Grid>
      </main>
    )
  }
}

export default withStyles(styles)(Albums)