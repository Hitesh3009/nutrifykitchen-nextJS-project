import React from 'react'
import Link from "next/link";
const Navbar = () => {
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
        </>
    )
}

export default Navbar