import GIF from 'gif.js/dist/gif';
import rotateImage from './rotateImage';

export default async function createSpinningGif(
	src,
	duration,
	fps,
	quality = 10,
	showFullImage
) {
	const gif = new GIF({
		transparent: '#000',
		workers: 2,
		// Parcel uses file hash in file names
		// Use this to reference worker file correctly so we can load it
		// @note will need to update name if the script content updates
		workerScript: 'gif.worker.b6b68db6.js',
		quality,
		differ: 'FloydSteinberg-serpentine'
	});

	const delay = duration / fps;
	const frames = Math.round((duration / 1000) * fps);
	for (let i = 0; i < frames; i++) {
		const rotation = ((i + 1) / frames) * 360;
		// eslint-disable-next-line no-await-in-loop
		const imageCtx = await rotateImage(src, rotation, showFullImage);
		if (!gif.options.width || !gif.options.height) {
			gif.options.width = imageCtx.canvas.width;
			gif.options.height = imageCtx.canvas.height;
		}

		gif.addFrame(imageCtx, {copy: true, delay});
	}

	const result = new Promise((resolve, reject) => {
		gif.on('abort', function () {
			reject(new Error('Gif creation aborted'));
		});
		gif.on('finished', function (blob) {
			resolve(URL.createObjectURL(blob));
		});
		gif.render();
	});

	return {
		abort: () => gif.abort(),
		result
	};
}
