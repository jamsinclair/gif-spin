import {h} from 'preact';
import {useState} from 'preact/hooks';
import DropForm from './DropForm';
import Preview from './Preview';

export default function App() {
	const [file, setFile] = useState(null);
	return (
		<div>
			<h1>Gif Spin</h1>
			{!file && <DropForm onAddFile={(file) => setFile(file)} />}
			{file && <Preview file={file} />}
		</div>
	);
}
