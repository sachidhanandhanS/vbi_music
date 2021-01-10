import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(() => ({
  songComponent: {
    height: "74px",
    padding: "12px",
    "&:hover": {
      backgroundColor: "#ffffff",
      border: "1px solid #d7dee8",
      borderRadius: "4px",
    },
  },
  img: {
    width: "40px",
    height: "40px",
  },
  closeIcon: {
    cursor: "pointer",
  },
}));

export default useStyles