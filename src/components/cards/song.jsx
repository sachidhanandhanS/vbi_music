import React from 'react'
import {
  Grid,
  makeStyles,
  Checkbox
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/CloseOutlined' 

const useStyles = makeStyles(() => ({
  songComponent: {
    height: '74px',
    padding: '12px',
    '&:hover': {
      backgroundColor: '#ffffff',
      border: '1px solid #d7dee8',
      borderRadius: '4px'
    }
  },
  img: {
    width: '40px',
    height: '40px'
  },
  closeIcon: {
    cursor: 'pointer'
  }
}));

const Song = ({
  showCheckbox,
  song,
  checked,
  handleSelect,
  handleClose
}) => {
  const classes = useStyles()
  return (
    <Grid container alignItems="center" key={song.id} className={classes.songComponent}>
      {showCheckbox ?<Grid item xs={2} sm={1}>
        <Checkbox
          value={song.id}
          color="primary"
          checked={checked}
          onChange={({target: { checked }}) => handleSelect(checked, song)}
        />
      </Grid> : ''}
      <Grid item xs={2} sm={1}>
        <img className={classes.img} src={song.thumbnailUrl} alt={song.title} />
      </Grid>
      <Grid item xs={showCheckbox ? 8 : 10} sm={10}>
        {song.title}
      </Grid>
      {handleClose && <Grid item xs={1}>
        <CloseIcon className={classes.closeIcon} onClick={handleClose} color="secondary" />
      </Grid>}
    </Grid>
  )
}

export default Song