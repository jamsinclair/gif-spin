import {h} from 'preact';
import {saveAs} from 'file-saver';
import Button from './Button';
import NumberRange from './NumberRange';
import styles from './Controls.css';
import Checkbox from './Checkbox';

export default function Controls({
	duration,
	fps,
	gifSource,
	quality,
	showFullImage,
	showAntiClockwise,
	dispatch
}) {
	return (
		<div class={styles.Controls}>
			<div class={styles.ControlsLeft}>
				<Checkbox
					label={`Show Full Image`}
					value={showFullImage}
					onChange={(payload) => dispatch({type: 'setShowFullImage', payload})}
				/>
				<Checkbox
					label={`Reverse direction`}
					value={showAntiClockwise}
					onChange={(payload) =>
						dispatch({type: 'setShowAntiClockwise', payload})
					}
				/>
				<NumberRange
					label={`Spin Duration: ${duration}ms`}
					min={200}
					max={3000}
					step={100}
					value={duration}
					onChange={(payload) => dispatch({type: 'setDuration', payload})}
				/>
				<NumberRange
					label={`Framerate: ${fps}fps`}
					min={2}
					max={24}
					step={1}
					value={fps}
					onChange={(payload) => dispatch({type: 'setFps', payload})}
				/>
				<NumberRange
					label={`Quality: ${quality} (lower is better)`}
					min={1}
					max={10}
					step={1}
					value={quality}
					onChange={(payload) => dispatch({type: 'setQuality', payload})}
				/>
			</div>
			<div class={styles.ControlsRight}>
				<Button
					disabled={!gifSource}
					onClick={() => saveAs(gifSource, 'spin.gif')}
				>
					Download GIF
				</Button>
				<Button onClick={() => dispatch({type: 'reset'})}>
					Upload another image?
				</Button>
			</div>
		</div>
	);
}
