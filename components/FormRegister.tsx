import { FormEvent, useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../firebase/client';
import { useForm } from '../hooks/useForm';
import { signIn } from '../store/slices/usuarios'
import Button from './Button';
import { RootState } from '../store/index';

const FormRegister = () => {

    const user = useSelector(({usuario}:RootState) => usuario.user)
    const dispatch = useDispatch()
    const { onChange, form } = useForm({
        contrasena: '',
        confirmar_contrasena: '',
        telefono: ''
    })
    const [error, setError] = useState(true)

    useEffect(() => {
        if(form.contrasena.length >= 6 && form.confirmar_contrasena.length >= 6 && form.telefono.length >= 8 && form.contrasena === form.confirmar_contrasena){
            setError(false)
        }else{
            setError(true)
        }
    }, [form])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if(error) return null
        const userUpdated = {...user, password: form.contrasena, phoneNumber: form.telefono}
        await updateUser(userUpdated)
        dispatch(signIn(userUpdated, false))
    }

    return (
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6 items-center justify-center">
                <img className='w-20 h-20 rounded-full' alt={'avatar de usuario'} src={user?.avatar}></img>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="contrasena">
                    Contrase&ntilde;a
                </label>
                <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${(form.contrasena.length < 5 || form.contrasena !== form.confirmar_contrasena) && 'border-red-500'} ${form.contrasena.length > 5 && form.contrasena === form.confirmar_contrasena && 'border-green-500'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} onChange={(e) => onChange(e.target.value, 'contrasena')} id="contrasena" type="password" placeholder="Contraseña" autoComplete='off' />
                {
                    !form.contrasena && <p className="text-red-500 text-xs italic">Campo obligatorio</p>
                }
                {
                    form.contrasena && form.confirmar_contrasena !== form.contrasena && <p className="text-red-500 text-xs italic">Las contraseñas deben coincidir</p>
                }
                {
                    form.contrasena && form.contrasena.length < 5 && <p className="text-red-500 text-xs italic">La contraseña debe tener como minimo 6 caracteres</p>
                }
                </div>
                <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="confirmar_contrasena">
                    Confirmar contrase&ntilde;a
                </label>
                <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${(form.confirmar_contrasena.length < 5 || form.contrasena !== form.confirmar_contrasena) && 'border-red-500'} ${form.confirmar_contrasena.length > 5 && form.contrasena === form.confirmar_contrasena && 'border-green-500'} border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="confirmar_contrasena" type="password" placeholder="Confirmar Contraseña" autoComplete='off' onChange={(e) => onChange(e.target.value, 'confirmar_contrasena')} />
                {
                    !form.confirmar_contrasena && <p className="text-red-500 text-xs italic">Campo obligatorio</p>
                }
                {
                    form.confirmar_contrasena && form.confirmar_contrasena !== form.contrasena && <p className="text-red-500 text-xs italic">Las contraseñas deben coincidir</p>
                }
                {
                    form.confirmar_contrasena && form.confirmar_contrasena.length < 5 && <p className="text-red-500 text-xs italic">La contraseña debe tener como minimo 6 caracteres</p>
                }
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="telefono">
                    Telefono
                </label>
                <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${(!form.telefono || form.telefono.length < 8) && 'border-red-500'} ${form.telefono.length >= 8 && 'border-green-500'} border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="telefono" type="text" placeholder="Telefono" 
                onChange={(e) => onChange(e.target.value, 'telefono')} autoComplete='off'/>
                {
                    !form.telefono && <p className="text-red-500 text-xs italic">Campo obligatorio</p>
                }
                {
                    form.telefono && form.telefono.length < 8 && <p className="text-red-500 text-xs italic">Ingrese un telefono v&aacute;lido</p>
                }
                </div>
            </div>
            <Button text={'Registrar'} disabled={error} />
            </form>
    )
}

export default FormRegister
