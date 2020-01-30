import React from 'react';
import { Link } from 'react-router-dom';

const Splash = () => (
  <div className="splash-root-container">
    <div className="splash-background-container"></div>

    <div className="splash-text-container">
      <h1>Music for everyone.</h1>
      <p>Millions of songs. No credit card needed.</p>
      <Link to="/signup">{'Get Spotify Free'.toUpperCase()}</Link>
    </div>
  </div>
);

export default Splash; 