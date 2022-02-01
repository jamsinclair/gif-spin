import encodeGif from './encode.js';
import rotateImage from './rotateImage.js';

function blobToBase64(blob) {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.readAsDataURL(blob);
	});
}

export default async function createSpinningGif(
	src,
	{duration = 1500, fps = 14, quality = 10, showFullImage, showAntiClockwise},
) {
	const frames = [];

	const numberOfFrames = Math.round((duration / 1000) * fps);
	for (let i = 0; i < numberOfFrames; i++) {
		const rotation = ((i + 1) / numberOfFrames) * 360;
		// eslint-disable-next-line no-await-in-loop
		const imageCtx = await rotateImage(
			src,
			rotation,
			showFullImage,
			showAntiClockwise,
		);

		frames.push(
			imageCtx.getImageData(
				0,
				0,
				imageCtx.canvas.width,
				imageCtx.canvas.height,
			),
		);
	}

	const {promise, abort} = await encodeGif({
		frames,
		width: frames[0].width,
		height: frames[0].height,
		fps,
		quality,
	});

	const result = promise.then((data) => {
		const imageBlob = new Blob([data], {type: `image/gif`});
		return blobToBase64(imageBlob);
	});

	return {
		abort,
		result,
	};
}
