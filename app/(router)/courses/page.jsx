// step-5

import React from 'react'
import Banner from './_components/Banner'
import CourseList from './_components/CourseList'
import SideBanner from './_components/SideBanner'

function Courses() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 p-5 gap-5">


    <div className="col-span-3">
      {/* left container */}
      <Banner/>
      {/* course List */}
      <CourseList/>
      
    </div>
    <div className="p-5 bg-white rounded-xl">
      {/* Right container */}
      <SideBanner/>
      
    </div>
    </div>
  )
}

export default Courses