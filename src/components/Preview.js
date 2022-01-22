import styles from './Preview.css';

const spinner = new URL('../spinner.gif', import.meta.url);

export default function Preview({src, loading}) {
	return (
		<div class={styles.Preview}>
			{loading && (
				<div>
					<img class={styles.PreviewImageLoader} src={spinner} />
					<p>Generating GIF...</p>
				</div>
			)}
			{!loading && <img class={styles.PreviewImage} src={src} />}
		</div>
	);
}
