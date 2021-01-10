import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  appBar: {
    display: 'flex',
    justifyContent: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none !important',
    marginLeft: '20px'
  },
  title: {
    fontWeight: 'bold',
    cursor: 'pointer'
  },
}));

export default useStyles