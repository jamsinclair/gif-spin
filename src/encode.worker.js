import encodeGif from 'gifski-wasm/multi-thread';

onmessage = async function (event) {
	const buffer = await encodeGif(event.data);
	postMessage(buffer);
};
