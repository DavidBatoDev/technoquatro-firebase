import React from 'react';
import LandingStudents from '../components/LandingStudents';
import { IoMdMenu } from "react-icons/io";
import Posts from '../components/Posts';

const Landing = () => {
  return (
    <div className='font-inter'>
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

      <main 
      className='relative h-[90vh] bg-cover bg-center bg-no-repeat w-full' 
      // style={{ backgroundImage: "linear-gradient(255deg, rgba(0, 0, 0, 0.00) 17.71%, rgba(0, 0, 0, 0.45) 82.29%), url('/images/bg.jpg')" }}>
      style={{ backgroundImage: "url('/images/bg.jpg')" }}>
        <div className='absolute bottom-20 bg-red-400 w-screen z-50'>
        </div>
      </main>
      <LandingStudents />
      <Posts/>
    </div>
  )
}

export default Landing;
