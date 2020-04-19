import {h} from 'preact';
import styles from './Preview.css';

export default function Preview({src}) {
	return (
		<div class={styles.Preview}>
			<img class={styles.PreviewImage} src={src} />
		</div>
	);
}
