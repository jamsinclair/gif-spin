import { useEffect, useReducer } from 'preact/hooks';
import { createDataUri } from 'ascender';
import createSpinGif from '../createSpinGif.js';
import DropForm from './DropForm';
import Preview from './Preview';
import Controls from './Controls';
import * as styles from './App.module.css';

function reducer(state, action) {
	switch (action.type) {
		case 'setDuration':
			return { ...state, duration: action.payload };
		case 'setFps':
			return { ...state, fps: action.payload };
		case 'setGifSource':
			return { ...state, gifSource: action.payload };
		case 'setImageSource':
			return { ...state, imageSource: action.payload };
		case 'setQuality':
			return { ...state, quality: action.payload };
		case 'setLoading':
			return { ...state, loading: action.payload };
		case 'setShowFullImage':
			return { ...state, showFullImage: action.payload };
		case 'setShowAntiClockwise':
			return { ...state, showAntiClockwise: action.payload };
		case 'reset':
			return { ...initialState };
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
	quality: 60,
	showFullImage: true,
	showAntiClockwise: false,
};

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const {
		duration,
		fps,
		gifSource,
		imageSource,
		loading,
		quality,
		showFullImage,
		showAntiClockwise,
	} = state;

	useEffect(() => {
		let abortGif = () => { };
		const handleCreateSpinGif = async () => {
			dispatch({ type: 'setLoading', payload: true });
			const { abort, result } = await createSpinGif(imageSource, {
				duration,
				fps,
				quality,
				showFullImage,
				showAntiClockwise,
			});
			abortGif = abort;
			try {
				const payload = await result;
				dispatch({ type: 'setGifSource', payload });
			} finally {
				abortGif = () => { };
				dispatch({ type: 'setLoading', payload: false });
			}
		};

		if (imageSource) {
			handleCreateSpinGif();
		}

		return () => {
			abortGif();
		};
	}, [imageSource, duration, fps, quality, showFullImage, showAntiClockwise]);

	return (
		<div class={styles.App}>
			<header>
				<h1>GIF Spin</h1>
			</header>
			<main>
				{!imageSource && (
					<DropForm
						onAddFile={(file) =>
							createDataUri(file).then((payload) =>
								dispatch({ type: 'setImageSource', payload }),
							)
						}
					>
						<h2>
							Create rotating, spinning, twirling GIFs right in your browser!
						</h2>
						<p class={styles.AppText}>
							Drag 'n' drop your image on the page or{' '}
							<span class={styles.underline}>click to browse and select.</span>
						</p>
					</DropForm>
				)}
				{(gifSource || loading) && (
					<Preview src={gifSource} loading={loading} />
				)}
				{imageSource && (
					<Controls
						duration={duration}
						fps={fps}
						gifSource={gifSource}
						quality={quality}
						showFullImage={showFullImage}
						dispatch={dispatch}
					/>
				)}
			</main>
			<footer class={styles.AppFooter}>
				Hacked together at{' '}
				<a
					href="https://github.com/jamsinclair/gif-spin"
					onClick={(event) => event.stopPropagation()}
				>
					github.com/jamsinclair/gif-spin
				</a>
			</footer>
		</div>
	);
}
