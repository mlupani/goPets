import { ref, uploadString, getStorage, getDownloadURL  } from 'firebase/storage'

const storage = getStorage()

export const uploadImage = async (file, child) => {
	const storageRef =  ref(storage, `${child}/${file.name}`)
	return  await uploadString(storageRef, file.base64, 'data_url')
}

/*
export const deleteImage = name => {
	const ref = storage.ref(`${name}`)
	ref.delete().then(() => {
	}).catch(error => {
		console.log('no se ha podido borrar la imagen: '+error)
	})
}
*/

export const putStorageItem = async (fileUploaded, child) => {
	const snapshot = await uploadImage(fileUploaded, child)
	const url = await getDownloadURL(snapshot.ref)
	return url
}