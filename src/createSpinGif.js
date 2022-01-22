import GIF from 'gif.js/dist/gif.js';
import rotateImage from './rotateImage.js';

const workerScript = new URL(
	'../node_modules/gif.js/dist/gif.worker.js',
	import.meta.url,
);

export default async function createSpinningGif(
	src,
	{duration = 1500, fps = 14, quality = 10, showFullImage, showAntiClockwise},
) {
	const gif = new GIF({
		transparent: '#000',
		workers: 2,
		workerScript,
		quality,
		differ: 'FloydSteinberg-serpentine',
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
			showAntiClockwise,
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
		result,
	};
}
