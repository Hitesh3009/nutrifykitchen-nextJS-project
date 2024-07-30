"use client";
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useState } from 'react'
const BlogsPage = () => {

  const [blog, setBlog] = useState([]);
  const fectchBlog = async () => {
    const parsed = await fetch('../api/blogs');
    console.log(parsed);
    const data = await parsed.json();
    console.log(data);
    setBlog(data);
  }

  useEffect(() => {
    fectchBlog();
  }, []);

  return (
    <>
      <Navbar />
      <div className="blogs flex flex-col items-center flex-wrap space-x-5 space-y-3 p-5">
        <p></p>

        {
          blog.map((blogItem) => {
            return (<div className="blogsItems border-2 border-black p-5 w-5/12 h-40" key={blogItem.slug}>
              <div>
                <Link href={`blogpost/${blogItem.slug}`}><h4 className="text-lg font-bold cursor-pointer">{blogItem.title}</h4></Link>
                <p>{blogItem.description.substr(0, 155) + '.....'}</p>
              </div>
            </div>);
          })
        }

      </div>
    </>
  )
}

export default BlogsPage