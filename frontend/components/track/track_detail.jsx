import React from 'react';
import TrackIndexItem from './track_index_item';

class TrackDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { play: false }; 
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(track) {
    let index = (this.props.tracks.indexOf(track) + 1) % this.props.tracks.length;  
    let nextTrack = this.props.tracks[index];
    this.props.receiveCurrentTrack(track);
    this.props.receiveNextTrack(nextTrack); 
    this.props.receiveTitle(track.title); 
    this.props.receiveArtist(track.artist);
    this.props.receivePlaylistId(this.props.playlistId);  
    this.props.receiveAlbumId(track.album_id);  
  }

  render() {
    const { tracks } = this.props; 
    return (
      <ul id="track-list">
        {tracks.map(track => <TrackIndexItem key={track.id} track={track} handleClick={this.handleClick} />)} 
      </ul>
    );
  }
}

export default TrackDetail;