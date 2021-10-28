import { useState, FormEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signInEmail } from '../firebase/auth';
import { useForm } from 'hooks/useForm'
import Button from 'components/Button';
import LoadingSpinner from 'components/LoadingSpinner';

const FormLogin = () => {

    const { onChange, form } = useForm({
        email: '',
        contrasena: '',
    })
    const dispatch = useDispatch();
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setErrorMsg(null)
    }, [form])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        if(!form.email || form.contrasena.length <= 5 || !form.email.includes('@')) {
            setError(true)
            setLoading(false)
            return null
        }
        const error = await signInEmail(form.email, form.contrasena)
        setErrorMsg(error)
        setLoading(false)
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
            <div className='flex flex-col justify-center items-center my-2 mb-2'>
                {
                    loading && <div className='my-4'><LoadingSpinner/></div>
                }
                {
                    errorMsg && <p className="text-red-500 text-lg font-bold italic my-1 mb-4 text-center">{errorMsg}</p>
                }
                <Button text={'Ingresar'} disabled={!form.email || form.contrasena.length <= 5 || !form.email.includes('@') ? true : false} />
            </div>
            </form>
    )
}

export default FormLogin
