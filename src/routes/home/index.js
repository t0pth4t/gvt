import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import LinearProgress from 'preact-material-components/LinearProgress';
import 'preact-material-components/LinearProgress/style.css';
import style from './style';
const restTime = 60;
export default class Home extends Component {
	state = {
		time: restTime,
		sets: 0,
		seconds: restTime
	};

	componentDidMount() {
		this.timer = 0;
	}

	increment = () => {
		
	};

	secondsToTime = sexs => {

		const divisorForMinutes = sexs % (60 * 60);
	
		const divisorForSeconds = divisorForMinutes % 60;
		const seconds = Math.ceil(divisorForSeconds);
	
		return seconds;
	}

	countDown = () => {
		
		// Remove one second, set state so a re-render happens.
		let seconds = this.state.seconds - 1;
		this.setState({
		  time: this.secondsToTime(seconds),
		  seconds
		});
		
		// Check if we're at zero.
		if (seconds === 0) {
			clearInterval(this.timer);
			this.setState({
				time: restTime,
				seconds: restTime
			});
		  }
	  }

	startTimer = () => {
		  this.timer = setInterval(this.countDown, 1000);
		  this.setState({ sets: this.state.sets+1 });
	  }

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render({}, {time, sets }) {
		return (
			<div class={`${style.home} page`}>
				<h1>GVT 10x10</h1>
				<Card>
					<div class={style.cardHeader}>
						<h2 class=" mdc-typography--title">Sets { sets} </h2>
						<div class=" mdc-typography--caption">Click Start to start rest timer</div>
					</div>
					<div class={style.cardBody}>
						Rest Time Remaining: { time } second(s)
						<LinearProgress progress={time / restTime} secondary />
					</div>
					<Card.Actions>
						<Button class={style.fullWidth} raised ripple onClick={this.startTimer}>Start</Button>
					</Card.Actions>
				</Card>
			</div>
		);
	}
}
