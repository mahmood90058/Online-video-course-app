// step-11

"use client"
import React, { useEffect, useState } from 'react';
import VideoDescription from './components/VideoDescription';
import GlobalApi from '@/app/_utils/GlobalApi';
import CourseEnroll from './components/CourseEnroll';
import CourseContent from './components/CourseContent';
import { useUser } from '@clerk/nextjs';

function CoursePreview({ params }) {
    const [courseInfo, setCourseInfo] = useState(null);
    // const[isUserAlreadyEnrolled, setIsUserAlreadyEnrolled]= useState(false)
    const[isUserAlreadyEnrolled, setIsUserAlreadyEnrolled]= useState('')

    const {user}= useUser();

    useEffect(() => {
        if (params) {
            getCourseAllById();
        }
    }, [params]);

    const getCourseAllById = () => {
        GlobalApi.getCourseById(params?.courseid)
            .then(res => {
                console.log("API Response: ", res);  // Log full response
                console.log("Course Lists: ", res?.courseLists);  // Log the courseLists part
                setCourseInfo(res?.courseLists);  // Set courseInfo from API
                
            })
           
    };


    useEffect(()=>{
        courseInfo&&user&&checkUserEnrolledsCourse();
    },[courseInfo,user])



    // To check user already that course Enroll 

    const checkUserEnrolledsCourse=()=>{
        GlobalApi.checkUserEnrolledCourse(courseInfo[0]?.slug,user?.primaryEmailAddress?.emailAddress).then(res=>{
            if(res?.userEnrollCourses[0]?.id){
                console.log(res)
                // setIsUserAlreadyEnrolled(true)
                setIsUserAlreadyEnrolled(res?.userEnrollCourses[0]?.id)
            }
            
        })
    }



    return (
        <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-3">
            <div className="col-span-2 bg-white p-3">
                {courseInfo ? (
                    <VideoDescription courseInfo={courseInfo} />
                ) : (
                    <p>Loading course information...</p>
                )}
            </div>

            {/* Course content */}
            <div>
                <CourseEnroll courseInfo={courseInfo} isUserAlreadyEnrolled={isUserAlreadyEnrolled}/>
                
                <CourseContent courseInfo={courseInfo} isUserAlreadyEnrolled={isUserAlreadyEnrolled}/>
            </div>
        </div>
    );
}

export default CoursePreview;
