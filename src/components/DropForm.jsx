import { useState, useEffect } from 'preact/hooks';
import { DropZone } from 'ascender';
import * as styles from './DropForm.module.css';

export default function DropForm({ children, onAddFile }) {
	const [ascenderForm, setAscenderForm] = useState(null);
	useEffect(() => {
		if (!ascenderForm) {
			// eslint-disable-next-line new-cap
			const instance = DropZone(document.body, {
				accept: 'image/jpeg,image/png,image/gif',
				multiple: false,
			});
			instance.on('fileadded', onAddFile);
			setAscenderForm(instance);
		}

		return () => {
			if (ascenderForm) {
				ascenderForm.destroy();
				setAscenderForm(null);
			}
		};
	}, [onAddFile, ascenderForm]);

	return <form class={styles.DropForm}>{children}</form>;
}
