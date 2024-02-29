
export default async function processImage(file) {
    let base64String = "";
    let reader = new FileReader();
    reader.onload = function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");

        imageBase64Stringsep = base64String;

    }
    reader.readAsDataURL(file);
    console.log(base64String)
    return base64String;
}
