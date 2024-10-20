// step-6
import Image from 'next/image'
import React from 'react'

function Banner() {
  return (
    <div className="  flex flex-col md:flex-row gap-5 items-center bg-white rounded-xl p-5">
        <Image src={'/banner.png'} alt="banner" width={200} height={200}/>
        <div>
            <h2 className="text-[37px] font-semibold ">Welcome to <span className="text-primary font-semibold">CourseAdda</span> </h2>
            <h2 className="text-gray-700 ">Explore Learn and Build Real life projects!</h2>
        </div>
    </div>
  )
}

export default Banner

