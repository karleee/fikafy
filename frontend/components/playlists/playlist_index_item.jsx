import React from 'react';
import { Link } from 'react-router-dom';

class PlaylistIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleTrack = this.handleTrack.bind(this);
    this.play = this.play.bind(this);
  }

  handleClick(e) {
    if (e.target.classList.contains("circle")) this.props.history.push(`/home`);
  }

  handleTrack() {
    const { playlist, tracks } = this.props;
    let currentTrack = tracks[0];
    let nextTrack = tracks[1];
    this.props.receiveCurrentTrack(currentTrack);
    this.props.receiveNextTrack(nextTrack);
    this.props.receiveTitle(currentTrack.title);
    this.props.receiveArtist(currentTrack.artist);
    this.props.receiveAlbumId(currentTrack.album_id); 
    this.props.receivePlaylistId(playlist.id);
  }

  play() {
    // Setting global isPlaying state to true for icon change
    const isPlaying = true;
    this.props.receiveIsPlaying(isPlaying);

    const { playlist } = this.props;
    this.handleTrack(playlist);  
    this.props.receivePlaylistId(playlist.id);
  }

  render() {
    const { playlist, isPlaying } = this.props;

    // Determine class name for button based on play or pause
    const buttonType = isPlaying ? 'pause-button' : 'play-button';
    const buttonIcon = isPlaying ? 'pause-icon' : 'play-icon';

    return (
        <li>
          <div className="playlist-thumbnail-wrapper" onClick={this.handleClick}> 
            <div className="thumbnail">
              <Link to={`/playlist/${playlist.id}`}>
                <img src={playlist.photo_url} alt="Playlist thumbnail" />
                <p>{playlist.title}</p>
                <p>By {playlist.user}</p> 
              </Link>
            </div>

            <div className={`playlist-item ${buttonType} control-container`}>
              <div className="playlist-item circle-icon-wrapper">
                <div className={`playlist ${buttonIcon}-wrapper`} onClick={this.play}></div>  
              </div>
            </div>
          </div>
        </li>
    );
  }
}
 
export default PlaylistIndexItem;  