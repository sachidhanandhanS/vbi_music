import { BASE_URL } from '../utils/constant'

class Song {
  constructor() {
    this.songs = JSON.parse(localStorage.getItem('song'));
    this.albums = JSON.parse(localStorage.getItem('albums'));
  }

  async getAllAlbums() {
    if(!this.albums) {
      const response = await (await fetch(`${BASE_URL}/albums`)).json()
      this.albums = {}
      response.forEach(item => {
        this.albums[item.id] = item
      });
      localStorage.setItem('albums', JSON.stringify(this.albums))
    }
    return this.albums
  }

  async getAllSongs() {
    if(!this.songs) {
      const response = await (await fetch(`${BASE_URL}/photos`)).json()
      await this.getAllAlbums()
      this.songs = response.map(item => {
        return {
          ...item,
          albumTitle: this.albums[item.albumId].title 
        }
      })
      localStorage.setItem('albums', JSON.stringify(this.songs))
    }
    return this.songs
  }
}

export default new Song()