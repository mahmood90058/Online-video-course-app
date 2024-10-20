"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import Image from 'next/image'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function SideBanner() {

    const[SideBannerList, setSidebannerList]= useState([])

    const getSideBanner=()=>{
        GlobalApi.getSideBanner().then(res=>{
            // console.log(res)
            setSidebannerList(res?.sideBanners)
        })
    }

    useEffect(()=>{
        getSideBanner();

    },[])
  return (
    <div>
        {
            SideBannerList.map((item, index)=>(
                <div key={index} className="p-4">

                    <Image src={item.banner.url} alt="banner" width={500} height={300} className="rounded-xl h-[150px] w-[200px]" />
                </div>
            ))
        }

    </div>
  )
}

export default SideBanner