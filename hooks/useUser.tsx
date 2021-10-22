import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getUserConnected } from '../firebase/auth'
import { useSelector, useDispatch } from 'react-redux'
import { signIn } from '../store/slices/usuarios'
import { RootState } from '../store/index';

const useUser = () => {
	const user = useSelector((state: RootState) => state.usuario)
	const dispatch = useDispatch()
	const router = useRouter()
	
	const conectarUsuario = async () => {
		await getUserConnected(dispatch, signIn)
	}
	
	useEffect(() => {
		conectarUsuario()
	}, [])

	useEffect(() => {
		user.status === 'not-authenticated' && router.push('/')
		user.status === 'authenticated' && !user.register && router.pathname === '/' && router.push('home')
	}, [user])

	return user
}

export default useUser
