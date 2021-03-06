import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import playlistsReducer from './playlists_reducer';
import artistPlaylistsReducer from './artist_playlists_reducer';
import artistsReducer from './artists_reducer';
import tracksReducer from './tracks_reducer';
import albumsReducer from './albums_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  playlists: playlistsReducer,
  artistPlaylists: artistPlaylistsReducer, 
  artists: artistsReducer,
  tracks: tracksReducer,
  albums: albumsReducer
});

export default entitiesReducer;