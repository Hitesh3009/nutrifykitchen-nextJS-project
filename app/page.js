import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center pt-16">
        <div className="flex flex-col items-center space-y-5">
          <h2 className="font-bold text-5xl">HUNTING CODER</h2>
          <div className="imageWrap w-96 h-60 relative">
            <Image src='/coderImg.jpg' alt="Image of a coder" className="rounded-lg p-3" fill />
          </div>
          <p className="text-xl">This blog is to help the coders</p>
          <h3 className="font-bold text-2xl">Popular Blogs</h3>
          <div className="blogs flex justify-center flex-wrap space-x-5 space-y-3 pb-5">
            <p></p>

            <div className="blogsItems border-2 border-black p-5 h-40">
              <div>
                <h4 className="text-lg font-bold cursor-pointer">How to learn JavaScript in 2024 for web</h4>
                <p>Here is the resource from where you can learn</p>
              </div>
            </div>

            <div className="blogsItems border-2 border-black p-5 h-40">
              <div>
                <h4 className="text-lg font-bold cursor-pointer">How to learn JavaScript in 2024 for web</h4>
                <p>Here is the resource from where you can learn</p>
              </div>
            </div>

            <div className="blogsItems border-2 border-black p-5 h-40">
              <div>
                <h4 className="text-lg font-bold cursor-pointer">How to learn JavaScript in 2024 for web</h4>
                <p>Here is the resource from where you can learn</p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
