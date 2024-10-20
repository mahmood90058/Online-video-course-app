import Image from 'next/image'
import React from 'react'

function WelcomeBannerDashboard({user}) {
  return (
    <div className="  flex flex-col md:flex-row gap-5 items-center bg-pink-200 rounded-xl p-5">
    <Image src={'/banner.png'} alt="banner" width={200} height={200}/>
    <div>
        <h2 className="text-[37px] font-semibold ">Welcome Back, <span className="text-primary font-semibold">{user?.fullName}</span> </h2>
        <h2 className="text-gray-700 ">Explore Learn and Build Real life projects!</h2>
    </div>
</div>
  )
}

export default WelcomeBannerDashboard