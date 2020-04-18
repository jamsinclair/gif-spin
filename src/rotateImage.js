let canvas;
let ctx;

function toRadians(degrees) {
	return degrees * (Math.PI / 180);
}

function createImage(src) {
	const img = new Image();
	img.src = src;
	return new Promise((resolve, reject) => {
		img.addEventListener('load', () => resolve(img));
		img.addEventListener('error', reject);
	});
}

function clearCanvas(ctx) {
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawRotatedImageCenter(image, degrees) {
	const {width, height} = image;
	canvas.width = width;
	canvas.height = height;
	ctx.setTransform(1, 0, 0, 1, width / 2, height / 2);
	ctx.rotate(toRadians(degrees));
	ctx.drawImage(image, -width / 2, -height / 2);
}

export default async function createRotatedImageContext(src, degrees) {
	canvas = document.createElement('canvas');
	ctx = canvas.getContext('2d');
	clearCanvas(ctx);
	const image = await createImage(src);
	drawRotatedImageCenter(image, degrees);
	return ctx;
}
