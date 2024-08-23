import React from 'react';
import LandingStudents from '../components/LandingStudents';
import Posts from '../components/Posts';
import HeaderNav from '../components/HeaderNav';
import LandingImage from '../components/LandingImage';

const Landing = () => {
  return (
    <div className='font-inter'>
      <HeaderNav />
      <LandingImage />
      <LandingStudents />
      <Posts/>
    </div>
  )
}

export default Landing;
