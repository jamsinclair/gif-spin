import {h} from 'preact';
import styles from './NumberRange.css';

export default function NumberRange({label, min, max, step, value, onChange}) {
	return (
		<label class={styles.NumberRange}>
			<div class="label">{label}</div>
			<input
				type="range"
				min={min}
				max={max}
				value={value}
				step={step}
				onChange={(event) => onChange(event.target.value)}
			/>
		</label>
	);
}
