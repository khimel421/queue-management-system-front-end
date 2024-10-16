import React from 'react'
import { Link } from "react-router-dom";

export default function Banner() {
    return (
        <div className='flex justify-between items-center'>
            <div className=' space-y-12'>
                <h1 className='text-6xl font-bold '>Queue management system</h1>
                <div className='space-x-4'>
                <Link to={`/signin`}> <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-[#0184ff] text-white hover:bg-white hover:text-black text-2xl">Log In</button></Link>
                <Link to={`/signup`}><button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-[#0184ff] text-white hover:bg-white hover:text-black text-2xl">Register</button></Link>
                    
                </div>
                
            </div>
            <figure className='w-[600px]'>
                <img src="/images/banner.jpg" alt="img" />
            </figure>
        </div>
    )
}
