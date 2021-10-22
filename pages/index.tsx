import type { NextPage } from 'next'
import {signInFacebook, signInGoogle} from '../firebase/auth'
import useUser from 'hooks/useUser'
import HeadPage from 'components/HeadPage';
import Logo from 'components/Logo';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import GroupButtons from 'components/GroupButtons';
import FormRegister from 'components/FormRegister';

const Home: NextPage = () => {

  const user = useUser()

  //if(user.status === 'checking' && !user.register) return <Spinner />

  if(user.status === 'authenticated' && !user.register) return <></>

  if(user.status === 'not-authenticated' || (user.status === 'authenticated' && user.register) || user.status === 'checking')
    return (
      <>
        <HeadPage title={'GoPets | Home'} descripcion={'Pagina principal de GoPets'} />
        <div className='flex flex-col items-center h-screen w-screen mx-5'>
          <Logo/>
          {
            user.status === 'authenticated' && user.register ?
            <FormRegister/> :
            user.status === 'checking' ? <Spinner /> :
            <GroupButtons/>
          }
        </div>
      </>
    )
}

export default Home
