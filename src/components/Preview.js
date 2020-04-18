import {h} from 'preact';
import {useState, useEffect} from 'preact/hooks';
import styles from './Preview.css';

export default function Preview({file}) {
	const [src, setSrc] = useState(null);
	useEffect(() => {
		if (file) {
			file.getDataUri().then(setSrc);
		}
	}, [file]);

	return (
		<div class={styles.Preview}>
			<img class={styles.PreviewImage} src={src} />
		</div>
	);
}
