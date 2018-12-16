import _ from 'lodash';
import React from 'react';
import { Player } from 'video-react';
import axios from 'axios';

const IP = '192.168.1.161:8000';

const sources = {
  sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
  bunnyTrailer: `http://${IP}/assets/SampleVideo_1280x720_1mb.mp4`,
  bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
  test: 'http://media.w3.org/2010/05/video/movie_300.webm',
  staticOn: `http://${IP}/assets/SampleVideo_1280x720_1mb.mp4`,
  staticOff: `http://${IP}/assets/SampleVideo_1280x720_5mb.mp4`,

};

const DF = {
	on: 'staticOff',
	off: 'staticOn',
};

const DEFAULT_BS = false;

class VideoPlayer extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			buttonState: DEFAULT_BS,
			source: sources[DF.on]
		};
	}
	componentDidMount() {
		this.player = this.refs.player;
		this.player.subscribeToStateChange(this.handleStateChange.bind(this));
		this.fetchButtonState();
	

	}
	fetchButtonState() {
		axios.get('http://192.168.1.161:3334')
		.then(result => {
			const bs = _.get(result, 'data.message');
//			console.log(bs);	
			if (bs !== this.state.buttonState) {
				let trailer = DF.on;
				if (bs) trailer = DF.off;
				this.setState({
					buttonState: bs,
					currentTime: 0,
					source: sources[trailer]
					
				});
				this.player.load();
			}
		})
		.catch(error => {
	      		console.log(error);
	      	})
		.then(() => {
			setTimeout(() => { this.fetchButtonState() }, 100);
		});

	}

	handleStateChange(state) {
	  // copy player state to this component's state
	  this.setState({
	    player: state,
	    currentTime: state.currentTime
	  });
	}
	componentDidUpdate() {
	}
		
	render() {
	 	return (
	 		<div>
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
