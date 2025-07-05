import React from 'react'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'

function Navbar() {
    return (
        <div className='bg-gray-900 '>
            <div className='container mx-auto px-4 py-4'>
                <Link href="/" className='flex items-center  gap-x-3 text-xl font-medium'>
                    <BookOpen className="text-purple-500" />
                    Blog App
                </Link>
            </div>
        </div>
    )
}

export default Navbar
