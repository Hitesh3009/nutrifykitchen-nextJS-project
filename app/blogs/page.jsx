import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React from 'react'

const BlogsPage = () => {
    return (
        <>
            <Navbar/>
            <div className="blogs flex flex-col items-center flex-wrap space-x-5 space-y-3 p-5">
            <p></p>

            <div className="blogsItems border-2 border-black p-5 h-40">
              <div>
                <Link href='blogpost/learn-javascript'><h4 className="text-lg font-bold cursor-pointer">How to learn JavaScript in 2024 for web</h4></Link>
                <p>Here is the resource from where you can learn</p>
              </div>
            </div>

            <div className="blogsItems border-2 border-black p-5 h-40">
              <div>
                <Link href='blogpost/learn-javascript'><h4 className="text-lg font-bold cursor-pointer">How to learn JavaScript in 2024 for web</h4></Link>
                <p>Here is the resource from where you can learn</p>
              </div>
            </div>

            <div className="blogsItems border-2 border-black p-5 h-40">
              <div>
                <Link href='blogpost/learn-javascript'><h4 className="text-lg font-bold cursor-pointer">How to learn JavaScript in 2024 for web</h4></Link>
                <p>Here is the resource from where you can learn</p>
              </div>
            </div>

          </div>
        </>
    )
}

export default BlogsPage