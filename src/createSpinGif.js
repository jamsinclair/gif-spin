import GIF from 'gif.js/dist/gif';
import rotateImage from './rotateImage';

const workerScript = {
	production: 'gif.worker.b6b68db6.js',
	development: 'gif.worker.ecec0195.js'
};

export default async function createSpinningGif(
	src,
	{duration = 1500, fps = 14, quality = 10, showFullImage, showAntiClockwise}
) {
	const gif = new GIF({
		transparent: '#000',
		workers: 2,
		// Parcel uses file hash in file names
		// Use this to reference worker file correctly so we can load it
		// @note will need to update name if the script content updates
		workerScript: workerScript[process.env.NODE_ENV || 'development'],
		quality,
		differ: 'FloydSteinberg-serpentine'
	});

	const delay = duration / fps;
	const frames = Math.round((duration / 1000) * fps);
	for (let i = 0; i < frames; i++) {
		const rotation = ((i + 1) / frames) * 360;
		// eslint-disable-next-line no-await-in-loop
		const imageCtx = await rotateImage(
			src,
			rotation,
			showFullImage,
			showAntiClockwise
		);
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
