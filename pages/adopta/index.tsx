import { useEffect, useState } from 'react';
import { getPosts } from '../../firebase/client'
import FirstCard from 'components/FirstCard'
import LoadingSpinner from 'components/LoadingSpinner';

const index = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts(setPosts)
    }, [])

    return (
        <div className='container mx-auto h-screen flex flex-col pt-12'>
            {
                posts === undefined ? 'No hay publicaciones' : !posts?.length ? <div className='h-screen flex justify-center items-center'><LoadingSpinner/></div> : null
            }
            <div className='grid grid-cols-2 md:auto-cols-min md:grid-cols-6 lg:grid-cols-8 gap-2 mx-1 md:mt-10 pb-24'>
                {
                    posts?.map(({id, title, img, createdAt, description, avatar, usuarioName}) => (
                        <FirstCard key={id} id={id} title={title} img={img} fecha={createdAt} description={description} avatar={avatar} userName={usuarioName} />
                    ))
                }
            </div>
        </div>
    )
}

export default index
