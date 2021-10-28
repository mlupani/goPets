import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {useRouter} from 'next/router';
import Button from 'components/Button';
import { useForm } from 'hooks/useForm';
import { RootState } from 'store/index';
import { putStorageItem } from '../../firebase/storage';
import { addPost } from '../../firebase/client';
import LoadingSpinner from 'components/LoadingSpinner';
import Spinner from '../../components/Spinner';


const index = () => {

    const {upload, user} = useSelector(({usuario}: RootState) => usuario)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const {onChange, form } = useForm({
        title: '',
        description: '',
    })

    useEffect(() => {
        if(!upload.baseurl){
            router.push('/home')
        }
    }, [])

    const handleUpload = async () => {
        if(!upload || !form.title || !form.description) return null
        setLoading(true)
        const url = await putStorageItem(upload, 'posts')
        await addPost(user?.id, user?.avatar, user?.name, form.title, form.description, url)
        router.push('/home')
    }

    if(!upload.baseurl) return <Spinner />

    return (
        <div className='flex flex-col justify-between mb-5 relative pt-10'>
            <div className='flex flex-col justify-center items-center mx-5'>
                <img className='w-full h-60 md:h-96 object-contain' src={upload.baseurl}></img>
            </div>
            <div className='flex flex-col mx-3 justify-center items-center md:mx-40 lg:mx-72 xl:mx-96'>
                <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white my-2`} id="title" type="text" placeholder="Titulo" autoComplete='off' onChange={(e) => onChange(e.target.value, 'title')} />
                <textarea className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white h-40 mb-2`} cols={10} id="description" placeholder='Descripcion' onChange={(e) => onChange(e.target.value, 'description')}></textarea>
                {
                    loading ?
                        <LoadingSpinner/> :
                        <Button text={'Subir publicacion'} onClick={handleUpload} />
                }
            </div>
        </div>
    )
}

export default index
