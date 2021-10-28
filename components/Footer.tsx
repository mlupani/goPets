import { useRef } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import FooterButton from 'components/FooterButton'
import { handleUploadInfo } from 'store/slices/usuarios'
import { setupReader } from 'helpers/readerImage'
import { compressingFiles } from 'helpers/compressor'

const Footer = () => {

    const ref = useRef() as React.MutableRefObject<HTMLInputElement>
    const router = useRouter()
    const dispatch = useDispatch()

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

    if(router.pathname !== '/')
        return (
            <nav className='grid grid-cols-5 md:hidden bg-red-200 fixed w-full left-0 bottom-0 pl-0 mb-0 h-16'>
                <input type="file" className='hidden' onChange={handleFile} name="file" ref={ref} />
                <FooterButton title={'Inicio'} icon={'dog'} page={'/home'} selected={router?.pathname === '/home' ? true : false} />
                <FooterButton title={'Adopta'} icon={'heart'} page={'/adopta'} selected={router?.pathname === '/adopta' ? true : false} />
                <FooterButton title={'Publica'} icon={'house'} page={''} onClick={handlePublish} selected={router?.pathname === '/publica' ? true : false} />
                <FooterButton title={'Encuentra'} icon={'search'} page={'/home'} selected={router?.pathname === '/search' ? true : false} />
                <FooterButton title={'Usuario'} icon={'user'} page={'usuario'} selected={router?.pathname === '/user' ? true : false} />
            </nav>
        )
    else
        return null
}

export default Footer
