// import { useState } from "react";

import Link from "next/link";

export default function Home() {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const toggleDropDown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // }

  // {
  //   isDropdownOpen && (<div>
  //     <ul className="bg-gray-400 text-white block">
  //       <li></li>
  //       <li>Home</li>
  //       <li>About</li>
  //       <li>Blogs</li>
  //     </ul>
  //   </div>)
  // }
  return (
    <>
      <nav className="bg-gray-600">
        <div id="hamburger" className="p-3 lg:hidden flex space-x-5 items-center text-white">
          <button >
            <div className="border-2 border-black w-10 h-2 mb-1"><hr /></div>
            <div className="border-2 border-black w-10 h-2 mb-1"><hr /></div>
            <div className="border-2 border-black w-10 h-2 mb-1"><hr /></div>
          </button>
        </div>
        <div className="hidden lg:flex items-center justify-center">
          <ul className="lg:flex space-x-40 text-white p-5 text-lg">
            <Link href='/'><li className="hover:underline">Home</li></Link>
            <Link href='/about'><li className="hover:underline">About</li></Link>
            <Link href='/blogs'><li className="hover:underline">Blogs</li></Link>
            <Link href='/contact'><li className="hover:underline">Contact</li></Link>
          </ul>
        </div>
      </nav>
      <main className="flex min-h-screen flex-col items-center pt-20">
        <div className="flex flex-col items-center space-y-10">
          <h2 className="font-bold text-5xl">HUNTING CODER</h2>
          <p className="text-xl">This blog is to help the coders</p>
          <h3 className="font-bold text-2xl">Popular Blogs</h3>
          <div className="blogs flex justify-center flex-wrap space-x-5 space-y-3">
            <p></p>
            <div className="blogsItems border-2 border-black p-5 h-40">
              <div>
                <h4 className="text-lg font-bold">How to learn JavaScript in 2024 for web</h4>
                <p>Here is the resource from where you can learn</p>
              </div>
            </div>

            <div className="blogsItems border-2 border-black p-5 h-40">
              <div>
                <h4 className="text-lg font-bold">How to learn JavaScript in 2024 for web</h4>
                <p>Here is the resource from where you can learn</p>
              </div>
            </div>

            <div className="blogsItems border-2 border-black p-5 h-40">
              <div>
                <h4 className="text-lg font-bold">How to learn JavaScript in 2024 for web</h4>
                <p>Here is the resource from where you can learn</p>
              </div>
            </div>

            <div className="blogsItems border-2 border-black p-5 h-40">
              <div>
                <h4 className="text-lg font-bold">How to learn JavaScript in 2024 for web</h4>
                <p>Here is the resource from where you can learn</p>
              </div>
            </div>

            <div className="blogsItems border-2 border-black p-5 h-40">
              <div>
                <h4 className="text-lg font-bold">How to learn JavaScript in 2024 for web</h4>
                <p>Here is the resource from where you can learn</p>
              </div>
            </div>
            
            <div className="blogsItems border-2 border-black p-5 h-40">
              <div>
                <h4 className="text-lg font-bold">How to learn JavaScript in 2024 for web</h4>
                <p>Here is the resource from where you can learn</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
