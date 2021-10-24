import React, { useState } from 'react'
import { signInFacebook } from '../firebase/auth';
import { signInGoogle } from '../firebase/auth';
import Button from 'components/Button';
import FormLogin from './FormLogin';

const options = {
    0: 'buttons',
    1: 'login',
    2: 'register'
}

const GroupButtons = () => {

    const [show, setShow] = useState(options[0])

    return (
        <div id="buttons" className='flex flex-col justify-center items-center h-screen w-screen gap-4'>
            {
                show === 'buttons' ?
                    <>
                        <Button text={'Registrarse'} onClick={() => {console.log('Registrarse')}} />
                        <Button text={'Entrar'} onClick={() => setShow('login')} />
                        <Button text={'Ingresar con Facebook'} onClick={signInFacebook} />
                        <Button text={'Ingresar con Google'} onClick={signInGoogle} />
                    </> :
                show === 'login' ? <><FormLogin/><Button text={'Volver'} onClick={() => setShow('buttons')} /></> :
                ''
            }
        </div>
    )
}

export default GroupButtons
