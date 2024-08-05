"use client";
import Navbar from '@/components/Navbar'
import React, { useState } from 'react'

const ContactPage = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [desc, setdesc] = useState('');

    // Handles the contact page's input data on changes 
    const handleOnchange = (e) => {
        e.preventDefault();
        if (e.target.name === 'name')
            setname(e.target.value);
        else if (e.target.name === 'email')
            setemail(e.target.value);
        else if (e.target.name === 'phone')
            setphone(e.target.value);
        else if (e.target.name === 'desc')
            setdesc(e.target.value);
    }

    // Fetches the post url which on submit clears the input fields and logs the provided information in the contactdata folder in file system
    const handleContactSubmit = async (e) => {
        e.preventDefault();
        const data = { name, email, phone, desc };

        // Checks for the valid phone number
        if (phone.length === 10) {
            await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            setname('');
            setemail('');
            setphone('');
            setdesc('');
            return alert('Form submitted');
        }
        else {
            return alert('Phone Number incomplete');
        }
    }
    return (
        <>
            <Navbar />
            <div className='outerContainer flex items-center justify-center pt-5 md:pt-12 pb-[5.7rem]'>
                <form className='innerContainer border-2 border-gray-400 px-8 md:px-16 py-4 md:py-8 text-white' onSubmit={handleContactSubmit}>
                    <div className="contactDetails flex flex-col space-y-2">
                        <h1 className='font-bold text-xl md:text-3xl text-center'>Contact Us</h1>
                        <hr className='border-2 border-gray-500' />
                        <p></p>
                        <div>
                            <label htmlFor="name">Name</label><span className='text-red-500'>&nbsp;*</span>
                        </div>
                        <input type="text" name="name" id="name" className='input_bottom_line pl-3 text-black' value={name} onChange={handleOnchange} required />
                        <div>
                            <label htmlFor="email">Email</label><span className='text-red-500'>&nbsp;*</span>
                        </div>
                        <input type="email" name="email" id="email" className='input_bottom_line pl-3 text-black' value={email} onChange={handleOnchange} required />
                        <div>
                            <label htmlFor="phone">Phone</label><span className='text-red-500'>&nbsp;*</span>
                        </div>
                        <input type="number" name="phone" id="phone" className='input_bottom_line pl-3 text-black' value={phone} onChange={handleOnchange} required />
                        <div>
                            <label htmlFor="concern">Concern</label><span className='text-red-500'>&nbsp;*</span>
                        </div>
                        <textarea name="desc" id="desc" rows={5} className='input_bottom_line pl-3 text-black' placeholder='Elaborate your concern here' value={desc} onChange={handleOnchange} required />
                        <center><button className='bg-blue-600 text-white px-5 py-1.5 rounded-md mt-2'>Submit</button></center>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ContactPage