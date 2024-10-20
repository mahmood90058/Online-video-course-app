// step-9
import Image from 'next/image'
import React from 'react'

function CourseItem({course}) {
  return (
    <div className="border rounded-xl hover:shadow-md cursor-pointer hover:shadow-purple-300">
        <Image src={course?.banner?.url} width={500} height={150} alt='banner' className="rounded-t-xl"/>
       

        <div className="flex flex-col gap-1 p-1">
            <h2 className="font-md">{course.name}</h2>
            <h2 className="text-gray-400">{course.auther}</h2>

            
            { course?.chapter?.length==0 ?
            <div className="flex gap-2">
              <Image src={'/youtube.png'} alt="youtube" width={20} height={20}/>
              <h2 className="text-gray-800 font-medium">Watch on Youtube</h2>
            </div>:
            
       
            <div className="flex gap-2">
              <Image src={'/chapter1.png'} alt="chapter" width={20} height={20}/>
              <h2 className="text-gray-800 font-medium">Chapters</h2>
            </div>
        }

            <h2>{course?.free? 'Free':'Paid'}</h2>
        </div>
    </div>
  )
}

export default CourseItem