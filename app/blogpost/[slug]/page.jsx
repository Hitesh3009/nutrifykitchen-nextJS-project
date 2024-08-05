import Image from "next/image";

// Fetches the particular blog based on the slug
export async function getMyBlog(slug) {
  const jsondata = await fetch(`http://localhost:3000/api/getblogs?slug=${slug}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await jsondata.json();
  return data;
}

// Gets the response from the getMyBlog function
export default async function Blogpost({ params }) {

  // Gets the slug from the url params and passes it to the getMyBlog function
  const slug = params.slug;
  const myBlog = await getMyBlog(slug);

  return (<>

    <div className="flex flex-col min-h-screen text-white">
      {/* Checks for whether the blog is available or not and displays the 404 error message */}
      {myBlog.error ? (<>
        <div className="flex flex-grow">
          <p className="font-bold text-4xl m-auto">{myBlog.status} {myBlog.error} :&#40;</p>
        </div>
      </>)
        :
        (<>
          {/* Displays the blog content */}
          <div className="main flex justify-center flex-col items-center space-y-4 pb-5">
            <div className="container flex flex-col items-center md:items-stretch md:flex-row md:justify-start mt-6 w-10/12 md:w-10/12 xl:w-6/12 lg:w-7/12 p-4 border-2 border-gray-400">
              <div className="Imgcontainer border-[3.5px] border-gradient relative w-56 h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 flex">
                <Image src={myBlog.images.SMALL.url} fill alt="Recipe Image" priority={true} sizes="auto" className="text-white"/> {/*Blog Image */}
              </div>
              <div className="source relative md:absolute right-[-5%] md:right-[14%] lg:right-[27%] flex flex-col">
                <span className=" text-xs xl:text-xl md:text-sm lg:text-base text-green-600">{myBlog.source}</span> {/*Recipe Source */}
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
              <div className="flex flex-col justify-center relative right-[-6%] top-[2%] md:right-[-13%] md:top-[18%] lg:right-[-4.5%] lg:top-[20%] xl:right-[-7.4%] xl:top-[20%] mt-3 md:mt-10">
                <div className="flex flex-wrap w-[51vw] md:w-[48vw] xl:w-[30vw] lg:w-[35vw]">
                  {
                    // Iterates the recipe healthlabels array
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
                    // Iterates the recipe ingredients array
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
                    // Iterates the recipe nutrition array
                      myBlog.digest.map((item, index) => {
                        return (<div key={index} className="m-3">
                          <h3 className="text-base lg:text-lg font-bold">{item.label}</h3>
                          <p className="font-light text-sm md:text-base">Total Fat: {item.total}{item.unit}</p>
                          <p className="font-light text-sm md:text-base">Daily Fat: {item.daily}{item.unit}</p>
                          {
                            item.sub && (
                              <div>
                                {
                                // Iterates the recipe sub nutrition array (if any)
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

