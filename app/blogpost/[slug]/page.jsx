import Navbar from "@/components/Navbar";

export async function getMyBlog(slug) {

  const jsondata = await fetch(`http://localhost:3000/api/getblogs`, {
    method: 'GET'
  });
  // console.log(jsondata);
  const data = await jsondata.json();
  // console.log(data);
  return data;
}
export default async function Blogpost({ params }) {
  const slug = params.slug;
  const myBlog = await getMyBlog(slug);
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
              <h1 className="text-4xl font-bold mb-3">{myBlog.title}</h1>
              <hr className="border-2 border-black w-full" />
              <p className="m-2 text-justify">{myBlog.description}</p>
            </div>
          </div>
        </>)}
    </div>
  </>)
}