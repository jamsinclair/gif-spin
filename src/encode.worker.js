import encodeGif from 'gifski-wasm';

onmessage = async function (event) {
	const buffer = await encodeGif(event.data);
	postMessage(buffer);
};
