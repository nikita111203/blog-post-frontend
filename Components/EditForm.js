"use client"
import axios from 'axios';
import { FilePen } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function EditForm({ initialPost }) {
    // console.log(initialPost, "initial post");
    const [formdata, setFormData] = React.useState({
        title: initialPost.title,
        author: initialPost.author,
        description: initialPost.description
    })
    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formdata, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formdata, "form Data")
        try {
            const id=initialPost._id
            await axios.put(``${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`/${id}`,formdata);
            toast.success("Post Updated Successfully!!")
            router.push("/");
        } catch (error) {
            toast.error(" Not updated");
            console.log("error Occured",error)
        }
    }
    return (
        <div>
            <div className='card'>
                <label className=' mb-2 block '>Title <span className='text-red-600'>*</span></label><br />
                <input type='text' required name="title" value={formdata.title} onChange={handleChange} id='title' placeholder='Enter Post Title ' className='input mb-4' />

                <label className='font-semibold mb-2  block'>Author <span className='text-red-600'>*</span></label><br />
                <input type='text' required name="author" value={formdata.author} onChange={handleChange} id='author' placeholder='Enter Author Name ' className='input mb-4' />
                <label className='font-semibold mb-2 block '>Description <span className='text-red-600'>*</span></label><br />
                <textarea type='text' required name="description" value={formdata.description} onChange={handleChange} id='description' placeholder='Enter Post Description ' className='input min-h-[150px] mb-4' />

                <div className='flex gap-2 items-center'>
                    <button onClick={handleSubmit} className='btn btn-primary flex gap-1 items-center'><FilePen/> Edit Post</button>
                    <button onClick={()=>router.back()} className='btn btn-secondary flex gap-1 items-center'> Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditForm
