import React from 'react'
import {
  Grid,
  Checkbox,
  Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/CloseOutlined'
import FavouriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavouriteIcon from '@material-ui/icons/Favorite'
import { convertToEllipsis } from '../../utils/common'
import useStyles from './styles'

const Song = ({
  showCheckbox,
  showFavourite,
  isFavourite,
  handleFavourite,
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
      <Grid container direction="column" item xs>
        <Typography title={song.title}>
          {convertToEllipsis(song.title, 40)}
        </Typography>
        <small title={song.albumTitle}>
          {convertToEllipsis(song.albumTitle, 55)}
        </small>
      </Grid>
      {showFavourite && <Grid item xs={1} className={classes.textRight}>
        {isFavourite ? (
          <FavouriteIcon
            className={classes.isFavourite}
            onClick={() => handleFavourite(!isFavourite)}
          />
        ) : (
          <FavouriteBorderIcon
            className={classes.favouriteIcon}
            onClick={() => handleFavourite(!isFavourite)}
          />
        )}
      </Grid>}
      {handleClose && <Grid item xs={1} className={classes.textRight}>
        <CloseIcon
          className={classes.closeIcon}
          onClick={handleClose}
          color="secondary"
        />
      </Grid>}
    </Grid>
  )
}

export default Song