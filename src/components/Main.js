require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/VideoReact.css');

import React from 'react';
import VideoPlayer from './VideoPlayer';

// import { Player } from 'video-react';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {

  render() {
    return (
      <div className="index">
		<VideoPlayer
			src='https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
		/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
