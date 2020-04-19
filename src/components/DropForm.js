import {h} from 'preact';
import {useState, useEffect} from 'preact/hooks';
import Ascender from 'ascender';
import styles from './DropForm.css';

const ascenderOptions = {
	dropArea: {
		multipleFiles: false
	}
};

export default function DropForm({children, onAddFile}) {
	const [ascenderForm, setAscenderForm] = useState(null);
	useEffect(() => {
		if (!ascenderForm) {
			const instance = new Ascender(document.body, ascenderOptions);
			instance.on('file:added', onAddFile);
			setAscenderForm(instance);
		}

		return () => {
			if (ascenderForm) {
				ascenderForm.destroy();
				setAscenderForm(null);
			}
		};
	}, [onAddFile, ascenderForm]);

	return (
		<form class={styles.DropForm}>
			{children}
		</form>
	);
}
