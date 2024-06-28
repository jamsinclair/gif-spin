export default async function encodeGif(options) {
	const myWorker = new Worker(new URL('./encode.worker.js', import.meta.url), { type: 'module' });

	myWorker.postMessage(options);

	return {
		abort: () => {
			myWorker.terminate();
		},
		promise: new Promise((resolve, reject) => {
			myWorker.addEventListener('message', (event) => {
				resolve(event.data);
			});

			myWorker.addEventListener('error', reject);
		}),
	};
}
