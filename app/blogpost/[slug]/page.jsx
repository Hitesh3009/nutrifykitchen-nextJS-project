"use client";
import Navbar from "@/components/Navbar";
import { useState,useEffect } from "react";
export default function Blogpost({ params }) {
  const [blog, setBlog] = useState();
  const slug=params.slug;
  const fectchBlog = async () => {
      const parsed = await fetch(`http://localhost:3000/api/getblogs?slug=${slug}`);
      const data=await parsed.json();
      setBlog(data);
  }

  useEffect(()=>{
    if(slug.length>0)
    fectchBlog();
  },[]);

  return (<>
    <Navbar />
    {blog && <div className="main flex justify-center">
      <div className="container flex flex-col items-center border-2 border-black mt-6 w-7/12 p-4">
        <h1 className="text-4xl font-bold mb-3">{blog.title}</h1>
        <hr className="border-2 border-black w-full" />
        <p className="m-2 text-justify">{blog.description}</p>
      </div>
    </div>}
  </>)
}