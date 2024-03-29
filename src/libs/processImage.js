export default async function processImage(image) {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes).toString('base64');
    const withPrefix = 'data:image/png;base64,' + buffer;
    return withPrefix;
}