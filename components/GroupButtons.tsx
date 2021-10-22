import React from 'react'
import { signInFacebook } from '../firebase/auth';
import { signInGoogle } from '../firebase/auth';
import Button from 'components/Button';

const GroupButtons = () => {
    return (
        <div id="buttons" className='flex flex-col justify-center items-center h-screen w-screen gap-4'>
            <Button text={'Registrarse'} onClick={() => {console.log('Registrarse')}} />
            <Button text={'Entrar'} onClick={() => {console.log('Entrar')}} />
            <Button text={'Ingresar con Facebook'} onClick={signInFacebook} />
            <Button text={'Ingresar con Google'} onClick={signInGoogle} />
        </div>
    )
}

export default GroupButtons
