import { handleUploadInfo } from 'store/slices/usuarios'
import { setupReader } from 'helpers/readerImage'
import { compressingFiles } from 'helpers/compressor'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import { useRouter } from 'next/router'

const useHandleUpload = () => {

    const dispatch = useDispatch()
    const ref = useRef() as React.MutableRefObject<HTMLInputElement>
    const router = useRouter()

    const handlePublish = () => {
        ref.current.click()
    }

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e?.target?.files?.length) {
            const fileObj = e.target.files[0]
            const fileCompressed = await compressingFiles(fileObj)
            const file = await setupReader(fileCompressed)
            dispatch(handleUploadInfo(file))
            router.push('/new')
        }
    }

    return {
        handleFile,
        handlePublish,
        ref
    }
}

export default useHandleUpload
