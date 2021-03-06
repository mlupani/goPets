import { useRouter } from 'next/router'
import FooterButton from 'components/FooterButton'
import useHandleUpload from '../hooks/useHandleUpload';


const Footer = () => {

    const router = useRouter()
    const { ref, handleFile, handlePublish } = useHandleUpload()

    if(router.pathname !== '/')
        return (
            <nav className='grid grid-cols-5 md:hidden bg-blue-greenBlueCrayola2 fixed w-full left-0 bottom-0 pl-0 mb-0 h-16'>
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
