import {h} from 'preact';
import styles from './Checkbox.css';

export default function Checkbox({label, value, onChange}) {
	return (
		<label class={styles.Checkbox}>
			<input
				type="checkbox"
				checked={value}
				onChange={(event) => {
					onChange(event.target.checked);
				}}
			/>
			{label}
		</label>
	);
}
