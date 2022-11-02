import { decode } from 'blurhash'
import { createCanvas, createImageData } from 'canvas'

export function hashDecode (blurhash: string, width: number, height: number, punch?: number) {
  const canvas = createCanvas(width, height,)
  const pixels = decode(blurhash, width, height, punch)
  if (pixels) {
    const ctx = canvas.getContext("2d");
    const imageData = createImageData(pixels, width, height);
    ctx.putImageData(imageData, 0, 0);
    const base64 = canvas.toDataURL()
    return base64;
  }
}
export default {
  hashDecode
}
