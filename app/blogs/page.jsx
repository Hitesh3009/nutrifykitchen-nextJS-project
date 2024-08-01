import Navbar from '@/components/Navbar'
import Link from 'next/link'
import {promises as fs } from 'fs';
export async function getBlogsFromServer() {
  const res = await fetch('http://localhost:3000/api/blogs', {
    method: 'GET'
  });
  const data = res.json();

  return data;
}

export async function getBlogsInStaticPage() {
  try {
    const res = await fs.readdir('./blogdata', 'utf-8');
    let allBlogs = [];
    let myfile;
    for (let index = 0; index < res.length; index++) {
      const item = res[index];
      myfile = await fs.readFile(('./blogdata/' + item), 'utf-8');
      allBlogs.push(JSON.parse(myfile));
    }
    return allBlogs;
  } catch (error) {
    console.error(error);
    return error;
  }
}
const BlogsPage = async () => {
  // const allBlogs = await getBlogsFromServer();
  const allBlogs = await getBlogsInStaticPage();
  // console.log(allBlogs);
  return (
    <>
      <Navbar />
      <div className="blogs flex flex-col items-center flex-wrap space-x-5 space-y-3 p-5">
        <p></p>

        {
          allBlogs.map((blogItem) => {
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