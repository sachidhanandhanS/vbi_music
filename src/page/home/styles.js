const styles = () => ({
  container: {
    padding: '60px',
    overflow: 'auto',
    height: 'calc(100% - 185px)'
  },
  songBody: {
    overflow: 'auto',
    padding: '30px'
  },
  addToList: {
    marginBottom: '30px'
  },
  addToListLink: {
    cursor: 'pointer'
  },
  searchComponent: {
    marginBottom: '20px'
  },
  searchResult: {
    marginBottom: '20px'
  },
  '@media only screen and (max-width: 600px)': {
    container: {
      padding: '20px 10px',
      overflow: 'auto',
      height: 'calc(100% - 100px)'
    },
  }
})

export default styles
