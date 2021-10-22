import { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { handleLogout } from "store/slices/usuarios";
import { logOut } from "../../firebase/auth";


const index = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        logOut(dispatch, handleLogout)
    }, [])
    return (
        <div>
            
        </div>
    )
}

export default index
