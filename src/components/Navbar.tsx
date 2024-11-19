"use client"
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full flex items-center justify-center sticky '>
        <div className=' bg-gray-900 rounded-xl px-4 py-2 mt-5 text-white text-2xl flex flex-row justify-between gap-5 items-center'>
            <h2>card<span className= 'italic font-bold'>It |</span></h2>
            
            <ul className='text-base flex flex-row gap-3 items-center justify-center font-semibold'>
                <li>Login</li>
                <li>Buy me cofee</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar