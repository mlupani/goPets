import { useEffect, useState } from 'react'
import { signInFacebook } from '../firebase/auth'
import { signInGoogle } from '../firebase/auth'
import Button from 'components/Button'
import FormLogin from 'components/FormLogin'
import FormRegister from 'components/FormRegister';
import { useSelector } from 'react-redux'
import { RootState } from '../store/index';

const options = {
    0: 'buttons',
    1: 'login',
    2: 'register'
}

const GroupButtons = () => {

    const user = useSelector((state: RootState) => state.usuario)
    const [show, setShow] = useState(options[0])

    useEffect(() => {
        user.register && user.status === 'not-authenticated' && setShow(options[0])
    }, [user])

    return (
        <div id="buttons" className='flex flex-col justify-center items-center h-screen w-screen gap-4'>
            {
                user.register && user.status === 'not-authenticated' ?
                    <h1 className='text-green-600 text-xl'>Revise su correo electr&oacute;nico para confirmar su registro en la plataforma</h1> : null
            }
            {
                show === 'buttons' ?
                    <>
                        <Button text={'Registrarse'} onClick={() => setShow('register')} />
                        <Button text={'Entrar'} onClick={() => setShow('login')} />
                        <Button text={'Ingresar con Facebook'} onClick={signInFacebook} />
                        <Button text={'Ingresar con Google'} onClick={signInGoogle} />
                    </> :
                show === 'login' ? <><FormLogin/><Button text={'Volver'} onClick={() => setShow('buttons')} /></> :
                show === 'register' ? <><FormRegister/><Button text={'Volver'} onClick={() => setShow('buttons')} /></> :
                ''
            }
        </div>
    )
}

export default GroupButtons
