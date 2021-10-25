import { useState, FormEvent } from 'react';
import { signInEmail } from '../firebase/auth';
import Button from 'components/Button';
import { useForm } from 'hooks/useForm'

const FormLogin = () => {

    const { onChange, form } = useForm({
        email: '',
        contrasena: '',
    })
    const [error, setError] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if(!form.email || form.contrasena.length <= 5 || !form.email.includes('@')) {
            setError(true)
            return null
        }
        signInEmail(form.email, form.contrasena)
        /*
        const userUpdated = {...user, password: form.contrasena, phoneNumber: form.telefono}
        await updateUser(userUpdated)
        dispatch(signIn(userUpdated, false))
        */
    }

    return (
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="contrasena">
                    Email
                </label>
                <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${!form.email.includes('@') && error && 'border-red-500'} 'rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} onChange={(e) => onChange(e.target.value, 'email')} id="email" type="email" placeholder="Email" autoComplete='off' />
                {
                    error && !form.email.includes('@') && <p className="text-red-500 text-xs italic">Email incorrecto</p>
                }
                {
                    error && !form.email && <p className="text-red-500 text-xs italic">Campo obligatorio</p>
                }
                </div>
                <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="contrasena">
                    Contrase&ntilde;a
                </label>
                <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${(form.contrasena.length < 5 && error) && 'border-red-500'} border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="confirmar_contrasena" type="password" placeholder="Contraseña" autoComplete='off' onChange={(e) => onChange(e.target.value, 'contrasena')} />
                {
                    error && !form.contrasena && <p className="text-red-500 text-xs italic">Campo obligatorio</p>
                }
                {
                    error && form.contrasena.length < 5 && <p className="text-red-500 text-xs italic">La contraseña debe tener como minimo 6 caracteres</p>
                }
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <Button text={'Ingresar'} disabled={!form.email || form.contrasena.length <= 5 || !form.email.includes('@') ? true : false} />
            </div>
            </form>
    )
}

export default FormLogin
