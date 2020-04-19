import {h} from 'preact';
import styles from './Button.css';

export default function Button({children, disabled, onClick}) {
	return (
		<button class={styles.Button} disabled={disabled} onClick={onClick}>
			{children}
		</button>
	);
}
