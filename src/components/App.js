import {h} from 'preact';
import {useEffect, useReducer} from 'preact/hooks';
import DropForm from './DropForm';
import Preview from './Preview';
import Controls from './Controls';
import createSpinGif from '../createSpinGif';
import styles from './App.css';

function reducer(state, action) {
	switch (action.type) {
		case 'setDuration':
			return {...state, duration: action.payload};
		case 'setFps':
			return {...state, fps: action.payload};
		case 'setGifSource':
			return {...state, gifSource: action.payload};
		case 'setImageSource':
			return {...state, imageSource: action.payload};
		case 'setQuality':
			return {...state, quality: action.payload};
		case 'setLoading':
			return {...state, loading: action.payload};
		case 'reset':
			return {...initialState};
		default:
			throw new Error(`Unknown action type ${action.type}`);
	}
}

const initialState = {
	duration: 1500,
	fps: 14,
	gifSource: null,
	imageSource: null,
	loading: false,
	quality: 10
};

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const {duration, fps, gifSource, imageSource, loading, quality} = state;

	useEffect(() => {
		let abortGif = () => {};
		const handleCreateSpinGif = async () => {
			dispatch({type: 'setLoading', payload: true });
			const {abort, result} = await createSpinGif(
				imageSource,
				duration,
				fps,
				quality
			);
			abortGif = abort;
			try {
				const payload = await result;
				dispatch({type: 'setGifSource', payload});
			} finally {
				abortGif = () => {};
				dispatch({type: 'setLoading', payload: false });
			}
		};

		if (imageSource) {
			handleCreateSpinGif();
		}

		return () => {
			abortGif();
		};
	}, [imageSource, duration, fps, quality]);

	return (
		<div class={styles.App}>
			<h1>GIF Spin</h1>
			{!imageSource && (
				<DropForm
					onAddFile={(file) =>
						file
							.getDataUri()
							.then((payload) => dispatch({type: 'setImageSource', payload}))
					}
				/>
			)}
			{(gifSource || loading) && <Preview src={gifSource} loading={loading} />}
			{imageSource && (
				<Controls
					duration={duration}
					fps={fps}
					gifSource={gifSource}
					quality={quality}
					dispatch={dispatch}
				/>
			)}
		</div>
	);
}
