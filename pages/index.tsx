import Head from 'next/head'
import React from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import {sanityClient, urlFor} from '../sanity';
import { Post } from '../typings';
import Link from 'next/link';

interface Props {
  posts: [Post];
}

function Home({posts}: Props) {
  console.log(posts);
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium Blog</title>
        <link rel='icon' href='/favicon.ico'/>
      </Head>

      <Header /> 

      <Banner />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 p-2 md:p-6'>
        {posts.map(post => (
          <Link key={post._id} href={`/post/${post.slug.current}/`}>
            <div className='border rounded-lg group cursor-pointer overflow-hidden'>
              <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform' src={urlFor(post.mainImage).url()!}/>
              <div className='flex justify-between p-5 bg-white'>
                <div>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p className='text-sm'>{post.description} by {post.author.name}</p>
                </div>
                <img className='w-12 h-12 rounded-full' src={urlFor(post.author.image).url()!}/>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    _createdAt,
    title,
    slug,
    author -> {
      name,
      image
    },
    mainImage,
    description
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    }
  }
}


export default Home