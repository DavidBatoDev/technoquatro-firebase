import React from 'react'

const LandingImage = () => {
  return (
    <main 
        className='relative h-[90vh] bg-cover bg-center bg-no-repeat w-full' 
        // style={{ backgroundImage: "linear-gradient(255deg, rgba(0, 0, 0, 0.00) 17.71%, rgba(0, 0, 0, 0.45) 82.29%), url('/images/bg.jpg')" }}>
        style={{ backgroundImage: "url('/images/bg.jpg')" }}>
        <div className='absolute bottom-20 bg-red-400 w-screen z-50'>
        </div>
    </main>
  )
}

export default LandingImage
