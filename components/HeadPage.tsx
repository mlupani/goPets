import React from 'react'
import Head from 'next/head';

interface HeadProps {
    title: string,
    descripcion: string
}

const HeadPage = ({title, descripcion}: HeadProps) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={descripcion} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default HeadPage
