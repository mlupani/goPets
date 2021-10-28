import { useEffect, useState } from 'react';
import { getPosts } from '../../firebase/client'
import Card from 'components/Card';
import LoadingSpinner from 'components/LoadingSpinner';

const index = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts(setPosts)
    }, [])

    return (
        <div className='container mx-auto flex flex-col justify-center items-center relative'>
            <div className='grid grid-cols-1 pb-24 gap-10 lg:pt-10 md:mx-44 lg:mx-56 xl:mx-96 mt-14 lg:mt-10'>
                {
                    posts === undefined ? 'No hay publicaciones' : !posts?.length ? <div className='h-screen flex justify-center items-center'><LoadingSpinner/></div> : null
                }
                {
                    posts?.map(({id, title, img, createdAt, description, avatar, usuarioName}) => (
                        <Card key={id} id={id} title={title} img={img} fecha={createdAt} description={description} avatar={avatar} userName={usuarioName} />
                    ))
                }
            </div>
        </div>
    )
}

export default index
