import React from 'react'
import {
  Grid,
  Checkbox
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/CloseOutlined' 
import useStyles from './styles'

const Song = ({
  showCheckbox,
  song,
  checked,
  handleSelect,
  handleClose
}) => {
  const classes = useStyles()
  return (
    <Grid container alignItems="center" className={classes.songComponent}>
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