import { BASE_URL } from '../utils/constant'

class Song {
  constructor() {
    this.songs = null;
    this.albums = null;
  }
  async getAllAlbums() {
    if(!this.albums) {
      const response = await fetch(`${BASE_URL}/albums`)
      this.albums = response.json()
    }
    return this.albums
  }

  async getAllSongs() {
    if(!this.songs) {
      const response = await fetch(`${BASE_URL}/photos`)
      this.songs = response.json()
    }
    return this.songs
  }
}

export default new Song()