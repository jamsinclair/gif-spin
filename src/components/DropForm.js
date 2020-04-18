import {h} from 'preact';
import {useState, useEffect, useRef} from 'preact/hooks';
import Ascender from 'ascender';
import styles from './DropForm.css';

const ascenderOptions = {
	dropArea: {
		multipleFiles: false
	}
};

export default function DropForm({onAddFile}) {
	const [ascenderForm, setAscenderForm] = useState(null);
	const formRef = useRef(null);
	useEffect(() => {
		if (!ascenderForm && formRef.current) {
			const instance = new Ascender(formRef.current, ascenderOptions);
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
		<form class={styles.DropForm} ref={formRef}>
			I am a form
		</form>
	);
}
