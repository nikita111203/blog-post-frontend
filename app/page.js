"use client"
import axios from 'axios';
import { CirclePlus } from 'lucide-react'
import { MoveRight } from 'lucide-react'
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setposts] = useState([]);
  async function fetchAPI() {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`);
      // console.log(response.data)
      setposts(response.data);
    } catch (error) {
      console.log("error fetching Post", error)
    }

  }

  useEffect(() => {
    fetchAPI()
  }, [])
  return (
    //HEADERS
    <div className='space-y-6'>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium  ">Latest Posts</h2>
        <Link href="/create">
          <button className="btn btn-primary flex gap-x-2 items-center">
            <CirclePlus />
            Create Post </button></Link>
      </div>

      {/* CARDS DIV */}
      {posts.length > 0 ?
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>

          {posts.map((item, i) =>
            <div key={i} className='card'>
              <h2 className='text-xl font-medium mb-2'>{item.title}</h2>
              <p className='text-gray-400'>By {item?.author}</p>
              <p className=' mt-2 mb-4'>{item.description.length < 100 ? item?.description : `${item.description.substring(0, 150)}.....`}</p>
              <Link href={`/posts/${item._id}`}>
                <button className=' btn btn-secondary flex gap-x-2 items-center'>View More
                  <MoveRight />
                </button>

              </Link>

            </div>

          )}

        </div>

        : <h2 className="italic text-3xl py-10 font-bold text-center">You Dont have any post. Create post</h2>}
    </div>
  );
}