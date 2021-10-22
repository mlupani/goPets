import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from '../../index';

interface user {
	avatar: string
}

interface userState {
	status: string,
	token?: string | null,
	errorMessage: string,
	user: user | null,
	register: boolean
}

const stateUser = {
	0: 'checking',
	1: 'authenticated',
	2: 'not-authenticated',
	3: 'checked'
}

const initialState: userState = {
	status: stateUser[0],
	token: null,
	errorMessage: '',
	user: null,
	register: false
}

export const usuarioSlice = createSlice({
	name: 'usuario',
	initialState: initialState,
	reducers: {
		login: (state, action) => {
			state.token = action.payload.token
			state.user = action.payload.user
			state.status = stateUser[1]
			state.errorMessage = ''
			state.register = action.payload.register
		},
		addError: (state, action) => {
			state.errorMessage = action.payload
		},
		checking: (state) => {
			state.status = stateUser[0]
			state.token = null
			state.errorMessage = ''
			state.user = null
			state.register = false
		},
		logout: (state) => {
			state.status = stateUser[2]
			state.token = null
			state.errorMessage = ''
			state.user = null
			state.register = false
		}
	}
})

export const { login, addError, logout, checking } = usuarioSlice.actions

export const signIn = (user: any, register: boolean) => (dispatch: AppDispatch) => {
	if(user)
		dispatch(login({user, register}))
	else
		dispatch(logout())
}

export const signUp = () => async (dispatch: AppDispatch) => {

}

export const setChecking = () => async (dispatch: AppDispatch) => {
	dispatch(checking())
}

export const handleLogout = () => (dispatch: AppDispatch) => {
	dispatch(logout())
}

export default usuarioSlice.reducer