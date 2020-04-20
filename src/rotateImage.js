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

function calculateHypotenuse(a, b) {
	return Math.sqrt(a ** 2 + b ** 2);
}

function drawRotatedImageCenter(image, degrees, showFullImage) {
	const {width, height} = image;
	const canvasWidth = showFullImage
		? calculateHypotenuse(width, height)
		: width;
	const canvasHeight = showFullImage
		? calculateHypotenuse(width, height)
		: height;
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx.setTransform(1, 0, 0, 1, canvasWidth / 2, canvasHeight / 2);
	ctx.rotate(toRadians(degrees));
	ctx.drawImage(image, -width / 2, -height / 2);
}

export default async function createRotatedImageContext(
	src,
	degrees,
	showFullImage
) {
	canvas = document.createElement('canvas');
	ctx = canvas.getContext('2d');
	clearCanvas(ctx);
	const image = await createImage(src);
	drawRotatedImageCenter(image, degrees, showFullImage);
	return ctx;
}
