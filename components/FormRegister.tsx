import { FormEvent, useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../firebase/client';
import { useForm } from '../hooks/useForm';
import { signIn, handleRegister } from '../store/slices/usuarios'
import Button from './Button';
import { RootState } from '../store/index';
import { checkEmailRegistered, LinkUserEmailPass, sendVerificationToSignUp } from '../firebase/auth';

const FormRegister = () => {

    const user = useSelector(({usuario}:RootState) => usuario.user)
    const dispatch = useDispatch()
    const { onChange, form } = useForm({
        email: user?.email || '',
        nombre: user?.displayName || '',
        contrasena: '',
        confirmar_contrasena: '',
        telefono: ''
    })
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const handleBlur = async () => {
        const isRegistered = await checkEmailRegistered(form.email)
        if(isRegistered){
            setError(true)
            setErrorMsg('El correo ya esta registrado')
        }else{
            setError(false)
            setErrorMsg('')
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if(form.contrasena.length < 6 || form.confirmar_contrasena.length < 6 || form.telefono.length < 8 || form.contrasena !== form.confirmar_contrasena) {
            setError(true)
            return null
        }
        if(user){
            const userUpdated = {...user, phoneNumber: form.telefono}
            await updateUser(userUpdated)
            await LinkUserEmailPass(user?.email, form.contrasena)
            dispatch(signIn(userUpdated, false))
        }
        else{
            const isRegistered = await checkEmailRegistered(form.email)
            if(!isRegistered) {
                await sendVerificationToSignUp(form.email, form.contrasena, form.telefono) 
                dispatch(handleRegister())
            }else{
                setError(true)
                setErrorMsg('El correo ya esta registado')
            }
        }

    }

    return (
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            {
                user?.avatar ?
                    <div className="flex flex-wrap -mx-3 mb-6 items-center justify-center">
                        <img className='w-20 h-20 rounded-full' alt={'avatar de usuario'} src={user?.avatar}></img>
                    </div> : null
            }
            <div className="flex flex-wrap -mx-3 mb-6">
                {
                    !user?.email ?
                        <><div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${(error && (form.email.length < 5 || !form.email.includes('@') || errorMsg)) && 'border-red-500'} ${form.email.length > 5 && form.email.includes("@") && !errorMsg && 'border-green-500'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} onBlur={handleBlur} onChange={(e) => onChange(e.target.value, 'email')} id="email" type="email" placeholder="Email" autoComplete='off' />
                            {
                                error && !form.email && <p className="text-red-500 text-xs italic">Campo obligatorio</p>
                            }
                            {
                                error && form.email && !form.email.includes("@") && <p className="text-red-500 text-xs italic">El Email es incorrecto</p>
                            }
                            {
                                error && errorMsg && <p className="text-red-500 text-xs italic">{errorMsg}</p>
                            }
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nombre">
                                Nombre
                            </label>
                            <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${(error && form.nombre.length < 3) && 'border-red-500'} ${form.nombre.length > 3 && 'border-green-500'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} onChange={(e) => onChange(e.target.value, 'nombre')} id="nombre" type="text" placeholder="Nombre" autoComplete='off' />
                            {
                                error && !form.nombre && <p className="text-red-500 text-xs italic">Campo obligatorio</p>
                            }
                            {
                                error && form.nombre && !form.nombre && <p className="text-red-500 text-xs italic">El Nombre es incorrecto</p>
                            }
                        </div>
                        </> : null
                }
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="contrasena">
                    Contrase&ntilde;a
                </label>
                <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${(error && (form.contrasena.length < 5 || form.contrasena !== form.confirmar_contrasena)) && 'border-red-500'} ${form.contrasena.length > 5 && form.contrasena === form.confirmar_contrasena && 'border-green-500'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} onChange={(e) => onChange(e.target.value, 'contrasena')} id="contrasena" type="password" placeholder="Contraseña" autoComplete='off' />
                {
                    error && !form.contrasena && <p className="text-red-500 text-xs italic">Campo obligatorio</p>
                }
                {
                    error && form.contrasena && form.confirmar_contrasena !== form.contrasena && <p className="text-red-500 text-xs italic">Las contraseñas deben coincidir</p>
                }
                {
                    error && form.contrasena && form.contrasena.length < 5 && <p className="text-red-500 text-xs italic">La contraseña debe tener como minimo 6 caracteres</p>
                }
                </div>
                <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="confirmar_contrasena">
                    Confirmar contrase&ntilde;a
                </label>
                <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${(error && (form.confirmar_contrasena.length < 5 || form.contrasena !== form.confirmar_contrasena)) && 'border-red-500'} ${form.confirmar_contrasena.length > 5 && form.contrasena === form.confirmar_contrasena && 'border-green-500'} border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="confirmar_contrasena" type="password" placeholder="Confirmar Contraseña" autoComplete='off' onChange={(e) => onChange(e.target.value, 'confirmar_contrasena')} />
                {
                    error && !form.confirmar_contrasena && <p className="text-red-500 text-xs italic">Campo obligatorio</p>
                }
                {
                    error && form.confirmar_contrasena && form.confirmar_contrasena !== form.contrasena && <p className="text-red-500 text-xs italic">Las contraseñas deben coincidir</p>
                }
                {
                    error && form.confirmar_contrasena && form.confirmar_contrasena.length < 5 && <p className="text-red-500 text-xs italic">La contraseña debe tener como minimo 6 caracteres</p>
                }
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="telefono">
                    Telefono
                </label>
                <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${(error && (!form.telefono || form.telefono.length < 8)) && 'border-red-500'} ${form.telefono.length >= 8 && 'border-green-500'} border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="telefono" type="text" placeholder="Telefono"
                onChange={(e) => onChange(e.target.value, 'telefono')} autoComplete='off'/>
                {
                    error && !form.telefono && <p className="text-red-500 text-xs italic">Campo obligatorio</p>
                }
                {
                    error && form.telefono && form.telefono.length < 8 && <p className="text-red-500 text-xs italic">Ingrese un telefono v&aacute;lido</p>
                }
                </div>
            </div>
            <div className="flex justify-center flex-wrap -mx-3 mb-3">
                <Button text={'Registrar'} disabled={error} />
            </div>
            </form>
    )
}

export default FormRegister
