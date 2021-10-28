import Compressor from 'compressorjs';

export const compressingFiles = async (file: any) => {
    return new Promise((resolve) =>{
        new Compressor(file, {
            quality: 0.65, // 0.6 can also be used, but its not recommended to go below.
            success: compressedResult => {
                resolve(compressedResult)
            }
        });
    })
}