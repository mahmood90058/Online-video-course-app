"use client";

import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';  // Assuming this is where your API utility is
import CourseOverview from './Components/CourseOverview';
import WatchCourseContent from './Components/WatchCourseContent';
import { toast } from 'sonner';

function WatchCourse({ params }) {
  const { user } = useUser();
  const [courseData, setCourseData] = useState(null);  // State to store the fetched course data
  const [loading, setLoading] = useState(true);        // Loading state
  const [error, setError] = useState(null);   


  const[completedChapter, setChapterCompleted]= useState([])


  const[activeChapterIndex, setActiveChapterIndex]= useState(0)
  
  
  // Error state to handle API errors

  useEffect(() => {
    if (params && user) {
      fetchUserEnrolledCourse();
    }
  }, [params, user]);

  // Function to fetch course data from API
  const fetchUserEnrolledCourse = async () => {
    try {
      const response = await GlobalApi.getUserEnrolledCourse(
        params.enrollId, 
        user.primaryEmailAddress.emailAddress
      );
      console.log("API Response:", response.userEnrollCourses);  // For debugging
      
      const enrolledCourse = response.userEnrollCourses[0]; // Assuming you need the first course in the list
      setCourseData(enrolledCourse.courseList);  // Set the courselist from the API response
      setChapterCompleted(enrolledCourse.completedChapter);  // Set the courselist from the API response
    } catch (err) {
      console.error("Error fetching course data:", err);
      setError("Failed to load course data.");
    } finally {
      setLoading(false);  // Set loading to false after fetching data
    }
  };

  if (loading) {
    return <p>Loading course details...</p>;  // Loading message
  }

  if (error) {
    return <p>{error}</p>;  // Error message in case of API failure
  }



  // completed chapter

  const onCompleteChapter=(chapterId)=>{
    GlobalApi.markCompletedChapter(params.enrollId, chapterId).then(res=>{
      // console.log(res);
      if(res){
        toast("chapter marks completed")
        fetchUserEnrolledCourse();
        
      }
    })
  }





  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-3">
      <div className="col-span-2 bg-white p-3">
        {courseData ? (
          <CourseOverview courseInfo={courseData} activeChapterIndex={activeChapterIndex} watchMode={true} setChapterCompleted={(chapterId)=>onCompleteChapter(chapterId)} />  // Pass the fetched courselist to CourseOverview
        ) : (
          <p>No course information available.</p>  // Fallback if no courseData
        )}
      </div>

      <div>
              
                
                <WatchCourseContent   courseData={courseData} isUserAlreadyEnrolled={true} watchMode={true} completedChapter={completedChapter}setActiveChapterIndex={(index)=>setActiveChapterIndex(index)}/>

            </div>
    </div>
  );
}

export default WatchCourse;
