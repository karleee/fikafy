import { connect } from 'react-redux';

import { receiveCurrentTrack } from '../../actions/track_actions';
import { receiveTitle, receiveArtist, receiveAlbumId, receiveIsPlaying } from '../../actions/audio_actions';

import ArtistDetail from './artist_detail';

import { selectPlaylistFromArtist, selectTracksFromArtistPlaylist, selectPlaylistsFromUser } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  // Get all playlists, tracks, artists, and albums from local storage
  const playlists = Object.values(JSON.parse(localStorage.getItem('artist_playlists')));
  const tracks = Object.values(JSON.parse(localStorage.getItem('tracks')));
  const artists = Object.values(JSON.parse(localStorage.getItem('artists')));
  const albums = Object.values(JSON.parse(localStorage.getItem('albums')));

  // Get artist, artist's playlists, and artist's tracks
  const artist = artists[ownProps.match.params.artistId - 1];
  let artistPlaylist = selectPlaylistFromArtist(playlists, artist)[0];
  let artistTracks = selectTracksFromArtistPlaylist(tracks, artistPlaylist);


  //TESTING...
  // console.log('Playlists: ' + JSON.stringify(playlists));
  // console.log('Artists: ' + JSON.stringify(artists)); 
  // console.log('Found Artist: ' + JSON.stringify(artist));




  // Get artist page's play state
  let storedPlayState = JSON.parse(localStorage.getItem('artist_playing')); 
  const playState = storedPlayState === null ? false : storedPlayState;

  // Before assigning to props check if tracks contains invalid values
  // If so, default to tracks in local storage
  const isInvalid = ele => ele === undefined || ele === null;
  if (tracks.some(isInvalid) || !tracks) tracks = JSON.parse(localStorage.getItem('playlist_tracks'));

  return ({
    artist,
    albums,
    playlist: artistPlaylist,
    tracks: artistTracks,
    currentTrack: state.ui.currentTrack,
    isPlaying: state.ui.isPlaying,
    playState
  });
};

const mapDispatchToProps = dispatch => ({ 
  receiveCurrentTrack: track => dispatch(receiveCurrentTrack(track)),
  receiveTitle: title => dispatch(receiveTitle(title)),
  receiveArtist: artist => dispatch(receiveArtist(artist)),
  receiveAlbumId: albumId => dispatch(receiveAlbumId(albumId)),
  receiveIsPlaying: isPlaying => dispatch(receiveIsPlaying(isPlaying))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetail);