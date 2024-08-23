import React from 'react'
import { IoMdMenu } from "react-icons/io";

const HeaderNav = () => {
  return (
    <header className='fixed top-0 w-full z-10'>
        <nav className='w-full flex justify-between items-center px-10 py-1 md:px-[20px] bg-white bg-opacity-70'>
            <img src="/images/yellow-logo.png" alt="" className='h-[50px] my-[10px]' />
            <IoMdMenu className='flex md:hidden text-black text-[30px] cursor-pointer' />
            <ul className='md:flex gap-[15px] hidden'>
                <li><a href='#' className='text-blue-500 font-bold text-[18px]'>Home</a></li>
                <li><a href='#' className='text-blue-500 font-bold text-[18px]'>Officers</a></li>
                <li><a href="#" className='text-blue-500 font-bold text-[18px]'>Login</a></li>
            </ul>
        </nav>
    </header>
  )
}

export default HeaderNav
