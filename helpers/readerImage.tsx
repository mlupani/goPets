export const setupReader = async file => {
    return new Promise((resolve, reject) =>{
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve({base64: reader.result, name:file.name,  type:file.type, baseurl: URL.createObjectURL(file)})
        }
        reader.onerror = () => {
            reject(reader);
        };
    })
}