import Navbar from "@/components/Navbar";
import { promises as fs } from 'fs';
export async function getMyBlog(slug) {
  const res = await fetch(`http://localhost:3000/api/getblogs?slug=${slug}`, {
    method: 'GET'
  });
  const data = res.json();
  return data;
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {slug:'how-to-learn-javascript',
          slug:'how-to-learn-python',
          slug:'how-to-learn-flask',
        },
      },
    ],
    fallback: true, // false or "blocking"
  }
}

export async function getMyBlogStatic(slug) {
  try {
    const res = await fs.readFile(`./blogdata/${slug}.json`, 'utf-8')
    return JSON.parse(res);
  } catch (err) {
    // console.log(err);
    const error='No such blog found';
    return {error};
  }
}

export default async function Blogpost({ params }) {
  const slug = params.slug;
  // const myBlog=await getMyBlog(slug);
  const myBlog = await getMyBlogStatic(slug);
  // console.log(myBlog);
  return (<>
    {
      myBlog.error && (<>
        <p>{myBlog.error}</p>
      </>)
    }
    {myBlog && !myBlog.error && (<>
      <Navbar/>
      <div className="main flex justify-center">
      <div className="container flex flex-col items-center border-2 border-black mt-6 w-7/12 p-4">
        <h1 className="text-4xl font-bold mb-3">{myBlog.title}</h1>
        <hr className="border-2 border-black w-full" />
        <p className="m-2 text-justify">{myBlog.description}</p>
      </div>
    </div>
    </>)}
  </>)
}