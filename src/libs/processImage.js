import {writeFile} from 'fs/promises'

export default async function processImage(image) {
    const bytes = Buffer.from(image).toString('base64');
    console.log(bytes)
    const withPrefix = 'data:image/png;base64,' + bytes;
    console.log(withPrefix)
    return withPrefix;
}