"use client";
import React, { useState } from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';

// Navigation Component for the navbar on the application
const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // To Open and Close the hamburger navbar
    const toggleDropDown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }
    const pathname=usePathname();
    return (
        <>
            {/* Opens Navbar for the small width screen and hides for larger ones*/}
            <nav className="bg-gray-400 top-0">
                <div id="hamburger" className="p-3 lg:hidden flex space-x-5 items-center text-white">
                    <button onClick={toggleDropDown} className='mt-2'>
                        <div className="border-2 rounded-lg border-white w-10 mb-2"><hr /></div>
                        <div className="border-2 rounded-lg border-white w-10 mb-2"><hr /></div>
                        <div className="border-2 rounded-lg border-white w-10 mb-2"><hr /></div>
                    </button>
                </div>
                {
                    isDropdownOpen && (<div>
                        <ul className="lg:hidden bg-gray-600 text-white block p-4 text-lg">
                        <Link href='/' className={pathname==='/'?'bg-red-500 rounded-lg block':''}><li className="hover:underline px-2.5 py-2">Home</li></Link>
                        <Link href='/about' className={pathname==='/about'?'bg-red-500 rounded-lg block':''}><li className="hover:underline px-2.5 py-2">About</li></Link>
                        <Link href='/blog' className={pathname==='/blog'?'bg-red-500 rounded-lg block':''}><li className="hover:underline px-2.5 py-2">Blogs</li></Link>
                        <Link href='/contact' className={pathname==='/contact'?'bg-red-500 rounded-lg block':''}><li className="hover:underline px-2.5 py-2">Contact</li></Link>
                        </ul>
                    </div>)
                }
                <div className="hidden lg:flex items-center justify-center">
                    <ul className="lg:flex space-x-40 text-white p-5 text-lg">
                        <Link href='/' className={pathname==='/'?'bg-red-500 rounded-lg':''}><li className="hover:underline px-2.5 py-2">Home</li></Link>
                        <Link href='/about' className={pathname==='/about'?'bg-red-500 rounded-lg':''}><li className="hover:underline px-2.5 py-2">About</li></Link>
                        <Link href='/blog' className={pathname==='/blog'?'bg-red-500 rounded-lg':''}><li className="hover:underline px-2.5 py-2">Blogs</li></Link>
                        <Link href='/contact' className={pathname==='/contact'?'bg-red-500 rounded-lg':''}><li className="hover:underline px-2.5 py-2">Contact</li></Link>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar