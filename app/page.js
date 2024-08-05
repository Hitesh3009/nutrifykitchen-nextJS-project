import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center pt-16 ">
        <div className="flex flex-col items-center space-y-5">
          <h2 className="font-bold text-2xl lg:text-3xl xl:text-5xl text-center text-white">NUTRIFY KITCHEN</h2>
          <div className="imageWrap w-96 h-72 relative">
            <Image src='/eating.png' alt="Image of a coder" className="rounded-lg p-3" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
          </div>
          <div className="flex flex-wrap text-center p-3">
            <p className="text-base lg:text-xl font-semibold text-white">This blog is to helps you to know the nutritional values of the foods and provide the recipe source for various dishes</p>
          </div>
          <div className="blogs flex justify-center flex-wrap space-x-5 space-y-3 pb-5">
            <p></p>

            <div className="blogsItems p-5 relative w-64 h-56">
              <div>
                <Image src='/sandwich.jpg' fill />
              </div>
            </div>
            <div className="blogsItems p-5 relative w-64 h-56">
              <div>
                <Image src='/veggies and salad.jpg' fill />
              </div>
            </div>
            <div className="blogsItems p-5 relative w-64 h-56">
              <div>
                <Image src='/variety food.jpg' fill />
              </div>
            </div>
            <div className="blogsItems p-5 relative w-64 h-56">
              <div>
                <Image src='/vegetables.jpg' fill />
              </div>
            </div>
            <div className="blogsItems p-5 relative w-64 h-56">
              <div>
                <Image src='/Watermelon.webp' fill />
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
