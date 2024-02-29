import {writeFile} from 'fs/promises'

export default async function processImage(image) {
    const bytes = Buffer.from(image).toString('base64');
    return bytes;
}