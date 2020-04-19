import {h} from 'preact';
import styles from './Preview.css';
import spinner from '../spinner.gif';

export default function Preview({src, loading }) {
	return (
		<div class={styles.Preview}>
			{loading && (<div>
                <img class={styles.PreviewImageLoader} src={spinner} />
                <p>Generating GIF...</p>
            </div>)}
			{!loading && <img class={styles.PreviewImage} src={src} />}
		</div>
	);
}
