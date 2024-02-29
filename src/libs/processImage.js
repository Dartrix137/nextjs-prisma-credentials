import {writeFile} from 'fs/promises'
import {readFileSync} from 'fs'

export default async function processImage(image) {
    const byteArrayBuffer = readFileSync(image);
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = '/tmp/'+image.name
    return byteArrayBuffer;
}