import Allblogs from '@/components/Allblogs';
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export async function getBlogsFromServer(){
    const res= await fetch('http://localhost:3000/api/blogs?q={}',{
      method: 'GET'
    });
    const data=res.json();
    
    return data;
}
const BlogsPage = async() => {
    const allBlogs= await getBlogsFromServer();
  return (
    <>
      <Navbar />
      <Allblogs/>
      
    </>
  )
}

export default BlogsPage