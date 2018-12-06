import React from 'react';
import { Player } from 'video-react';

const sources = {
  sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
  bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
  bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
  test: 'http://media.w3.org/2010/05/video/movie_300.webm'
};

class VideoPlayer extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			source: props.src || sources['bunnyTrailer']
		};
	}
	componentDidMount() {
		this.player = this.refs.player;
		this.player.subscribeToStateChange(this.handleStateChange.bind(this));
	}
	handleStateChange(state) {
	  // copy player state to this component's state
	  this.setState({
	    player: state,
	    currentTime: state.currentTime
	  });
/* 		if (state.currentTime > 5) {
			this.setState({
				currentTime: 0,
				source: sources['bunnyTrailer']
			});
			this.player.load();
		} */
	}
	componentDidUpdate() {
// 		this.setState({current: 'he'});
	}
		
	render() {
	 	return (
	 		<div>
	 			<text>hii - {this.state.currentTime}</text>
				<Player
					ref='player'
					autoPlay
					loop
				>
					<source
						src={this.state.source}
					/>
				</Player>
			</div>
		);
	}
}

export default VideoPlayer;