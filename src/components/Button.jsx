import * as styles from './Button.module.css';

export default function Button({ children, disabled, onClick }) {
	return (
		<button class={styles.Button} disabled={disabled} onClick={onClick}>
			{children}
		</button>
	);
}
