import React from 'react';
import LandingStudents from '../components/LandingStudents';
import { IoMdMenu } from "react-icons/io";

const Landing = () => {
  return (
    <div className='font-inter'>
      <header className='fixed top-0 w-full z-10'>
        <nav className='flex justify-between items-center px-[120px] py-1 md:px-[20px]'>
            <img src="/images/yellow-logo.png" alt="" className='h-[50px] my-[10px]' />
            <IoMdMenu className='hidden md:block text-white text-[30px] cursor-pointer' />
            <ul className='flex gap-[15px] md:hidden'>
                <li><a href='#' className='text-white font-bold text-[18px]'>Home</a></li>
                <li><a href='#' className='text-white font-bold text-[18px]'>Officers</a></li>
                <li><a href="#" className='text-white font-bold text-[18px]'>Login</a></li>
            </ul>
        </nav>
      </header>

      <main className='relative h-screen bg-cover bg-center bg-no-repeat' style={{ backgroundImage: "linear-gradient(255deg, rgba(0, 0, 0, 0.00) 17.71%, rgba(0, 0, 0, 0.45) 82.29%), url('/images/bg.png')" }}>
        <div className='absolute left-[10px] bottom-[30px] flex justify-center items-center md:left-[50px] md:bottom-[50px]'>
          <div className='text-white font-bold text-[50px] text-center md:text-[70px]'>
            <div>TECHNO</div>
            <div className='text-yellow-500'>QUATRO</div>
          </div>
        </div>
      </main>
      <LandingStudents />
    </div>
  )
}

export default Landing;
