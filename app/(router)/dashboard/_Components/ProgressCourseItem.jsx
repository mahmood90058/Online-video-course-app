import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

function ProgressCourseItem({ course }) {
  // Calculate the percentage of completed chapters
  const getTotalChapterPercentage = (item) => {
    const totalChapters = item?.chapter?.length || 0; // Total chapters are directly under `item`
    const completedChapters = item?.completedChapter?.length || 0; // Completed chapters
  
    if (totalChapters === 0) {
      return 0; // Avoid division by zero if there are no chapters
    }
  
    // Calculate the percentage of completed chapters
    const percentage = (completedChapters / totalChapters) * 100;
    return percentage.toFixed(2); // Round to 2 decimal places
  };
  

  return (
    <Link href={"/course-preview/"+course.slug}>
    <div className="border rounded-xl hover:shadow-md cursor-pointer hover:shadow-purple-300">
      <Image src={course?.banner.url} width={500} height={150} alt='banner' className="rounded-t-xl" />

      <div className="flex flex-col gap-1 p-1">
        {/* Course Name */}
        <h2 className="font-md">{course.name}</h2>

        {/* Course Author */}
        <h2 className="text-gray-400">By: {course.auther}</h2>

        {/* Progress Section */}
        <h2 className='text-[12px] text-gray-400 mt-3 '>
          {getTotalChapterPercentage(course)}% 
          <span className='float-right'>
  {course.completedChapter?.length || 1}/{course.chapter?.length || 0} Chapters
</span>

        </h2>

        {/* Progress Bar */}
        <Progress value={getTotalChapterPercentage(course)} className="h-[7px]" />
      </div>
    </div>
    </Link>
  );
}

export default ProgressCourseItem;
