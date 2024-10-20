"use client"
import React, { useEffect, useState } from 'react'
import WelcomeBannerDashboard from './_Components/WelcomeBannerDashboard'
import { useUser } from '@clerk/nextjs'
import SideBanner from '../courses/_components/SideBanner'
import InProgressCourseList from './_Components/InProgressCourseList'
import GlobalApi from '@/app/_utils/GlobalApi'

function Dashboard() {
  const { user } = useUser();
  const [userEnrolledCourses, setUserEnrolledCourses] = useState([]);

  useEffect(() => {
    user && getAllUserEnrolledCourseList();
  }, [user]);

  const getAllUserEnrolledCourseList = () => {
    GlobalApi.getUserAllEnrolledCourseList(user.primaryEmailAddress.emailAddress).then(res => {
      console.log(res);

      // Check if userEnrollCourses exists in the response
      if (res?.userEnrollCourses) {
        // Flatten all the courseLists from each enrolled course
        const allCourses = res.userEnrollCourses.flatMap(enrollment => enrollment.courseList);

        setUserEnrolledCourses(allCourses);
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 p-5 gap-5">
      <div className="col-span-3">
        {/* Left container */}
        <WelcomeBannerDashboard user={user} />
        <InProgressCourseList userEnrolledCourses={userEnrolledCourses} />
      </div>
      <div className="p-5 bg-white rounded-xl">
        {/* Right container */}
        <SideBanner />
      </div>
    </div>
  )
}

export default Dashboard;
