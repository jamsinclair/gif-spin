import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import styles from './Preview.css';

export default function Preview({ file }) {
    const canvasRef = useRef(null);
    const canvas = canvasRef.current;
    const [src, setSrc] = useState(null);
    useEffect(() => {
        if (file) {
            file.getDataUri()
                .then(setSrc)
        }
    }, [file]);

    if  (!src || !canvas) {
        console.log('here', canvasRef, canvas)
        return null;
    }

    function drawImageActualSize() {
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        ctx.drawImage(this, 0, 0);
        ctx.drawImage(this, 0, 0, this.width, this.height);
    }

    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.onload = drawImageActualSize;
    image.src = src;

    return (
        <div class={styles.Preview}>
            <canvas ref={canvasRef}></canvas>
            {/* <img class={styles.PreviewImage} src={src} /> */}
        </div>
    )
}
