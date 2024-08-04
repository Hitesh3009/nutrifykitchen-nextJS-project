import Navbar from "@/components/Navbar";
import Image from "next/image";
export async function getMyBlog(slug) {
  const jsondata = await fetch(`http://localhost:3000/api/getblogs?slug=${slug}`, {
    method: 'GET',
    headers:{'Content-Type': 'application/json'}
  });
  const data = await jsondata.json();
  return data;
}
export default async function Blogpost({ params }) {
  const slug =params.slug;
  console.log(slug);
  const myBlog = await getMyBlog(slug);
  const blogImg=myBlog.image
  // console.log(myBlog);
  return (<>

    <div className="flex flex-col h-screen">
      {myBlog.error ? (<>
        <div className="flex flex-grow">
          <p className="font-bold text-4xl m-auto">{myBlog.status} {myBlog.error} :(</p>
        </div>
      </>)
        :
        (<>
          <Navbar />
          <div className="main flex justify-center">
            <div className="container flex flex-col items-center border-2 border-black mt-6 w-7/12 p-4">
              <div className="Imgcontainer border-2 border-black relative w-52 h-52">
                  <Image src={blogImg} fill/>
              </div>
            </div>
          </div>
        </>)}
    </div>
  </>)
}