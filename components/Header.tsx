import useUser from 'hooks/useUser';
import { useRouter } from 'next/router';
import HeaderButton from './HeaderButton';

const Header = () => {

    const user = useUser()
    const router = useRouter()

    if(router.pathname !== '/')
        return (
            <div className='grid grid-cols-2 grid-flow auto-cols-max md:grid-cols-3 justify-center border-b-2 border-gray-200 pb-3 bg-gray-800 w-full z-50 fixed items-center'>
                <div className='flex justify-center lg:justify-end'>
                    <select>
                        <option>Localizacion</option>
                    </select>
                </div>
                <div className='flex justify-around lg:justify-start lg:justify-center text-2xl'>
                    <h1 className='text-white'>GoPets!</h1>
                </div>
                <div className='hidden md:flex flex-grow gap-5 pt-1'>
                    <HeaderButton title={'Inicio'} icon={'dog'} page={'home'} selected={router?.pathname === '/home' ? true : false} />
                    <HeaderButton title={'Adopta'} icon={'heart'} page={'adopta'} selected={router?.pathname === '/adopta' ? true : false} />
                    <HeaderButton title={'Publica'} icon={'house'} page={'home'} selected={router?.pathname === '/publica' ? true : false} />
                    <HeaderButton title={'Encuentra'} icon={'search'} page={'home'} selected={router?.pathname === '/search' ? true : false} />
                    <HeaderButton title={'Usuario'} icon={'user'} page={'usuario'} selected={router?.pathname === '/user' ? true : false} />
                </div>
            </div>
        )
    else
        return null
}

export default Header
