import React from 'react'
import ProgressCourseItem from './ProgressCourseItem'

function InProgressCourseList({ userEnrolledCourses }) {
  return (
    <div className='p-5 bg-white mt-3 rounded-sm'>
      <h2 className='text-primary font-bold text-[27px]'>Recent Courses</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-3'>
        {userEnrolledCourses && userEnrolledCourses.length > 0 ? (
          userEnrolledCourses.map((item, index) => (
            <ProgressCourseItem key={index} course={item} />
          ))
        ) : (
          <p>No recent courses available.</p>
        )}
      </div>
    </div>
  )
}

export default InProgressCourseList;
