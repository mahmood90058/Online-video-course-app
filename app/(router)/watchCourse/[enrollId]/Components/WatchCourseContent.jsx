import { Lock, Play } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function WatchCourseContent({ courseData, isUserAlreadyEnrolled,watchMode=false, setActiveChapterIndex, completedChapter }) {
  useEffect(() => {
    console.log(courseData); // Log to check structure
  }, [courseData]);

  const [activeIndex, setActiveIndex] = useState(0);




  // Make sure to access the chapters based on the actual structure of courseData
  // Adjusting access to chapter data

  const chapters = courseData?.chapter || []; 


  // use to check chapter completed or not
  const checkChapterCompleted=(chapterId)=>{
    return completedChapter.find(item=>item.chapterId==chapterId)

  }
  
  
  

  return (
    <div className='p-3 bg-white rounded-md mt-3'>
      <h2>Contents</h2>
      {chapters.length > 0 ? (
        chapters.map((item, index) => (
          <div key={index}>
            <h2
              onClick={() => setActiveIndex(index)}  // Set the active index on click
              className={`p-2 text-[14px] flex justify-between items-center border rounded-sm px-4 cursor-pointer m-2 hover:bg-gray-300 transition-all duration-300 ${
                activeIndex === index && 'bg-primary text-white'
              } ${isUserAlreadyEnrolled && 'hover:bg-primary hover:text-white'} ${watchMode&&checkChapterCompleted(item.id)&& 'border-green-600 bg-green-500'}`}

              onClick={()=>{watchMode&&setActiveChapterIndex(index);setActiveIndex(index)}}
            >
              {index + 1}. {item.name || "No name"} {/* Safely access the chapter name */}

              {activeIndex === index || isUserAlreadyEnrolled ? (
                <Play className='h-4 w-4' />
              ) : (
                <Lock className='h-4 w-4' />
              )}
            </h2>
          </div>
        ))
      ) : (
        <p>No chapters available</p>
      )}
    </div>
  );
}

export default WatchCourseContent;
