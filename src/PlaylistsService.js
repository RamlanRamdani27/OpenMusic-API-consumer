const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer, songs.genre, playlists.name as playlist FROM songs
      LEFT JOIN playlistsongs ON playlistsongs.song_id = songs.id
      LEFT JOIN playlists ON playlists.id = playlistsongs.playlist_id
      WHERE playlists.id = $1
      GROUP BY playlists.name, playlists.id, songs.id`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
