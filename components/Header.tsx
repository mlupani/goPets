import useHandleUpload from 'hooks/useHandleUpload';
import useUser from 'hooks/useUser';
import { useRouter } from 'next/router';
import HeaderButton from './HeaderButton';

const Header = () => {

    const user = useUser()
    const router = useRouter()
    const { ref, handleFile, handlePublish } = useHandleUpload()

    if(router.pathname !== '/')
        return (
            <div className='grid grid-cols-2 grid-flow auto-cols-max md:grid-cols-3 justify-center  pb-3 bg-blue-greenBlueCrayola w-full z-50 fixed items-center'>
                <div className='flex justify-center lg:justify-end'>
                    <select>
                        <option>Localizacion</option>
                    </select>
                </div>
                <div className='flex justify-around lg:justify-center text-2xl'>
                    <h1 className='text-white'>GoPets!</h1>
                </div>
                <div className='hidden md:flex flex-grow gap-5 pt-1'>
                    <input type="file" className='hidden' onChange={handleFile} name="file" ref={ref} />
                    <HeaderButton title={'Inicio'} icon={'dog'} page={'home'} selected={router?.pathname === '/home' ? true : false} />
                    <HeaderButton title={'Adopta'} icon={'heart'} page={'adopta'} selected={router?.pathname === '/adopta' ? true : false} />
                    <HeaderButton title={'Publica'} icon={'house'} onClick={handlePublish} selected={router?.pathname === '/publica' ? true : false} />
                    <HeaderButton title={'Encuentra'} icon={'search'} page={'home'} selected={router?.pathname === '/search' ? true : false} />
                    <HeaderButton title={'Usuario'} icon={'user'} page={'usuario'} selected={router?.pathname === '/user' ? true : false} />
                </div>
            </div>
        )
    else
        return null
}

export default Header
