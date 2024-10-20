import { Lock, Play } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function CourseContent({ courseInfo,isUserAlreadyEnrolled }) {
  useEffect(() => {
    console.log("Course Info: ", courseInfo); // Log to check structure
  }, [courseInfo]);

  const [activeIndex, setActiveIndex]= useState(0)

  return (
    <div className='p-3 bg-white rounded-md mt-3'>

      <h2>Contents</h2>
      {
        courseInfo && courseInfo[0]?.chapter?.length > 0 ? ( // Access first object in array
          courseInfo[0].chapter.map((item, index) => ( // Map over the chapters in the first object
            <div key={index}>
              <h2 className={`p-2 text-[14px] flex justify-between items-center border rounded-sm px-4 cursor-pointer m-2 hover:bg-gray-300 transition-all duration-300 ${activeIndex==index&& 'bg-primary text-white'} ${isUserAlreadyEnrolled&&'hover:bg-primary hover:text-white'} `}>{index+1}.{item.name} 


                {
                    activeIndex==index || isUserAlreadyEnrolled?
                    <Play className='h-4 w-4'/>
                 :   
                    <Lock className='h-4 w-4'/>
                }
              </h2>
              
            </div>
          ))
        ) : (
          <p>No chapters available</p>
        )
      }
    </div>
  );
}

export default CourseContent;
