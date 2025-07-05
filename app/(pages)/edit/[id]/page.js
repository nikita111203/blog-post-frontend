"use client"
import EditForm from '@/Components/EditForm'
import axios from 'axios'
import React, { use, useEffect , useState } from 'react'

function page({params}) {
    const {id} = use(params)
    const [posts,setPost] =useState(null)
    // console.log(id,"id")  
     useEffect(() => {
        async function fetchPost() {
            try {
                const response = await axios.get(``${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`/${id}`)
                // console.log(response.data);
                setPost(response.data)
            } catch (error) {
                console.log("error fetching post", error);
            }
        }
        fetchPost();
    }, [id])

  return (
    <div className='max-w-3xl mx-auto'> 
                <h2 className='text-3xl font-bold mb-5'> Edit Post</h2>
               {posts? <EditForm initialPost={posts} /> : null }

      
    </div>
  )
}

export default page
