"use client"
import React from 'react'
import { GithubIcon  } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='w-full flex items-center justify-center sticky '>
        <div className=' bg-gray-800 rounded-xl px-4 py-2 mt-5 text-white text-2xl flex flex-row justify-between gap-5 items-center'>
            <h2>card<span className= 'italic font-bold'>It |</span></h2>
            
            <ul className=' text-sm flex flex-row gap-3 items-center justify-center font-semibold'>
                <li>
                  <Link href="https://github.com/Bawanthathilan/cardIt" target='_blank'>
                  <GithubIcon/>
                  </Link>
                  </li>
                <li>
                  <Link href="https://buymeacoffee.com/bawanthathilan" target='_blank'>
                  Buy me Coffee 
                  </Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar