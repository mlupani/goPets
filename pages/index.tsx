import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';
import HeadPage from 'components/HeadPage';
import Logo from 'components/Logo';
import Spinner from 'components/Spinner';
import GroupButtons from 'components/GroupButtons';
import FormRegister from 'components/FormRegister';
import { createUserEmailPass } from '../firebase/auth';

const Home: NextPage = () => {

  const user = useSelector((state: RootState) => state.usuario)
  const router = useRouter()

  useEffect(() => {
    const { emailSignUp, passSignUp, phoneSignUp } = router.query
    if(emailSignUp && passSignUp && phoneSignUp) {
      createUserEmailPass(emailSignUp, passSignUp, phoneSignUp)
    }
  }, [router])

  if(user.status === 'authenticated' && !user.register) return <></>

  else if(user.status === 'not-authenticated' || (user.status === 'authenticated' && user.register) || user.status === 'checking')
    return (
      <>
        <HeadPage title={'GoPets | Home'} descripcion={'Pagina principal de GoPets'} />
        <div className='flex flex-col items-center h-screen w-screen mx-5'>
          <Logo/>
          {
            user.status === 'authenticated' && user.register && user?.user?.provider !== 'password' ?
            <FormRegister/> :
            user.status === 'checking' ? <Spinner /> :
            <GroupButtons/>
          }
        </div>
      </>
    )
    else return <></>
}

export default Home
