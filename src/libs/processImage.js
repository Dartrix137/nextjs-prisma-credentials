import {writeFile} from 'fs/promises'

export default async function processImage(image) {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = '/tmp/'+image.name
    await writeFile(filePath, buffer)
    return filePath;
}