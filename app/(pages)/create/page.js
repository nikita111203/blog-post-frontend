"use client"
import React, { useState } from 'react'
import { Save } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'

function page() {
    const [formdata, setFormData] = React.useState({
       title: "",
        author: "",
        description: ""
    })
  const router=  useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formdata, [name]: value })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(formdata, "form Data")
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`,formdata);
            toast.success("Post Save Successfully")
            router.push("/");
        } catch (error) {
            toast.error("Post Not Saved");
            console.log("error Occured",error)
        }
    }
    return (
        <div className='max-w-3xl mx-auto'>
            <h2 className='text-3xl font-bold mb-5'> Create New Post</h2>
            <div className='card'>
                <label className=' mb-2 block '>Title <span className='text-red-600'>*</span></label><br />
                <input type='text' required name="title" value={formdata.title} onChange={handleChange} id='title' placeholder='Enter Post Title ' className='input mb-4' />

                <label className='font-semibold mb-2  block'>Author <span className='text-red-600'>*</span></label><br />
                <input type='text' required name="author" value={formdata.author} onChange={handleChange} id='author' placeholder='Enter Author Name ' className='input mb-4' />
                <label className='font-semibold mb-2 block '>Description <span className='text-red-600'>*</span></label><br />
                <textarea type='text' required name="description" value={formdata.description} onChange={handleChange} id='description' placeholder='Enter Post Description ' className='input min-h-[150px] mb-4' />

                <div className='flex gap-2 items-center'>
                    <button onClick={handleSubmit} className='btn btn-primary flex gap-1 items-center'> <Save />Create Post</button>
                    <button className='btn btn-secondary flex gap-1 items-center'> <ArrowLeft />Cancel</button>
                </div>
            </div>

        </div>
    )
}

export default page
