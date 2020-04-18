import GIF from 'gif.js/dist/gif';
import rotateImage from './rotateImage';

export default async function createSpinningGif(
	src,
	duration = 2000,
	fps = 14
) {
	console.time('createSpinningGif');
	const gif = new GIF({
		transparent: '#000',
		quality: 10,
		workers: 2,
		workerScript: 'gif.worker.ecec0195.js'
	});

	const delay = duration / fps;
	const frames = Math.round((duration / 1000) * fps);
	for (let i = 0; i < frames; i++) {
		const rotation = ((i + 1) / frames) * 360;
		// eslint-disable-next-line no-await-in-loop
		const imageCtx = await rotateImage(src, rotation);
		if (!gif.options.width || !gif.options.height) {
			gif.options.width = imageCtx.canvas.width;
			gif.options.height = imageCtx.canvas.height;
		}

		gif.addFrame(imageCtx, {copy: true, delay});
	}

	return new Promise((resolve) => {
		gif.on('finished', function (blob) {
			console.timeEnd('createSpinningGif');
			resolve(URL.createObjectURL(blob));
		});
		gif.render();
	});
}
