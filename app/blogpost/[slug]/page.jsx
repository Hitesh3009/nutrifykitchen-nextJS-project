import Navbar from "@/components/Navbar";
import Image from "next/image";
export async function getMyBlog(slug) {
  const jsondata = await fetch(`http://localhost:3000/api/getblogs?slug=${slug}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await jsondata.json();
  return data;
}
export default async function Blogpost({ params }) {
  const slug = params.slug;
  console.log(slug);
  const myBlog = await getMyBlog(slug);
  const blogImg = myBlog.image
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

          <div className="main flex justify-center flex-col items-center space-y-4">
            <div className="container flex justify-start mt-6 w-10/12 md:w-10/12 xl:w-6/12 lg:w-7/12 p-4 border-2 border-gray-400">
              <div className="Imgcontainer border-2 border-black relative w-44 h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 flex">
                <Image src={blogImg} fill />
              </div>
              <div className="source absolute right-[11%] md:right-[14%] lg:right-[27%] flex flex-col ">
                <span className=" text-xs xl:text-xl md:text-sm lg:text-base text-green-600">{myBlog.source}</span>
                <span>
                  See full recipe on:
                  <a
                    href={myBlog.url}
                    className="text-xs md:text-base"
                  style={{cursor:'pointer',color:"blue"}}>
                    {myBlog.source}
                  </a>
                </span>
              </div>
              <div className="flex flex-col justify-center relative right-[-6%] top-[15%] md:right-[-13%] md:top-[20%] lg:right-[-4.5%] lg:top-[20%] xl:right-[-7.4%] xl:top-[25%]">
                <div className="flex flex-wrap w-[51vw] md:w-[47vw] xl:w-[30vw] lg:w-[35vw]">
                  {
                    myBlog.healthLabels.map((val, index) => {
                      return (<>
                        <div className="flex flex-col" key={index}>
                          <p className="mx-2 font-semibold text-xs md:text-sm text-pretty">{val}</p>
                        </div>
                      </>)
                    })
                  }
                </div>
              </div>
            </div>
            <div className=" w-10/12 md:w-10/12 xl:w-6/12 lg:w-7/12 flex flex-wrap flex-col justify-start border-2 border-gray-400">
              <p className="text-center font-bold text-lg lg:text-xl mt-3">Ingredients:</p>
              <div className="p-7 flex flex-wrap">
                {
                  myBlog.ingredientLines.map((val, index) => {
                    return (<>
                      <div className="flex flex-col" key={index}>
                        <p className="m-2 font-light text-sm md:text-base">{val}</p>
                      </div>
                    </>)
                  })
                }
              </div>
              <div>
                <div className="w-full flex flex-wrap justify-center text-justify">
                  <p className="font-bold text-lg lg:text-xl text-center">Nutrition:</p>
                  <div className="mx-2 flex flex-wrap justify-between ">
                    {
                      myBlog.digest.map((item, index) => {
                        return (<div key={index} className="m-3">
                          <h3 className="text-base lg:text-lg font-bold">{item.label}</h3>
                          <p className="font-light text-sm md:text-base">Total Fat: {item.total}{item.unit}</p>
                          <p className="font-light text-sm md:text-base">Daily Fat: {item.daily}{item.unit}</p>
                          {
                            item.sub && (
                              <div>
                                {
                                  item.sub.map((subitem, subindex) => {
                                    return (<div key={subindex} className="ml-6">
                                      <ul className="list-disc">
                                        <li className="font-semibold text-sm lg:text-base">{subitem.label}</li>
                                        <p className="font-light text-sm md:text-base">Total Fat: {subitem.total}{subitem.unit}</p>
                                        <p className="font-light text-sm md:text-base">Daily Fat: {subitem.daily}{subitem.unit}</p>
                                      </ul>
                                    </div>)
                                  })
                                }
                              </div>
                            )
                          }
                        </div>)
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>)}
    </div>
  </>)
}

