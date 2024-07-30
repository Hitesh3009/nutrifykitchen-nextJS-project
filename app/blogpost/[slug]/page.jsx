import Navbar from "@/components/Navbar";

export default function Blogpost({ params }) {
  return (<>
    <Navbar />
    <div className="main flex justify-center">
      <div className="container flex flex-col items-center border-2 border-black mt-6 w-7/12">
        <h1 className="text-4xl font-bold">Title for the blog {params.slug}</h1>
        <hr className="border-2 border-black w-full" />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum deleniti expedita similique dolorum autem soluta atque ut rerum onsequatur esse corporis nemo inventore, nesciunt odio nulla perferendis eveniet nam officia?
          Magni cum explicabo, aliquam molestias mollitia ipsam repellendus vel nobis quasi, sed eos praesentium officia doloribus cupiditate alias! Deleniti at possimus id reiciendis cumque sit saepe distinctio, et totam esse.
          Delectus sequi voluptatem aut repellat? Voluptatibus magnam voluptatum unde nisi? Blanditiis incidunt aperiam maiores non possimus atque nisi, ut id eveniet amet quasi doloremque fugit sunt quaerat unde! Voluptates, aliquid.</p>
      </div>
    </div>
  </>)
}