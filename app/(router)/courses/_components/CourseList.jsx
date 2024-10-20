// step-8

"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import CourseItem from './CourseItem'
import Link from 'next/link'



function CourseList() {
    const [courseList, setCourseList] = useState([])
    // fetch Course List
    const getAllCourse = () => {
        GlobalApi.getCourseList().then(res => {
            // console.log(res)
            setCourseList(res?.courseLists)
        })
    }

    useEffect(() => {
        getAllCourse()

    }, [])


    return (
        <div className="p-5 bg-white rounded-lg mt-4">
            {/* Title and Filter */}
            <div className="flex items-center justify-between">
                <h2 className="text-primary font-semibold text-[20px]">All Courses</h2>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">All</SelectItem>
                        <SelectItem value="dark">Paid</SelectItem>
                        <SelectItem value="system">Free</SelectItem>
                    </SelectContent>
                </Select>


            </div>
            {/* display course list */}
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 mt-3'>
                {/* step-10 skeleton effect */}

                {courseList?.length>0?
                    courseList.map((item, index)=>(
                        <Link href={'/course-preview/'+item.slug}>
                        <div key={index}>

                            <CourseItem course={item}/>

                        </div>
                        </Link>

                    ))
                    :
                    [1,2,3,4].map((item,index)=>(
                        <div key={index} className="w-full h-[240px] rounded-xl m-2 bg-slate-200 animate-pulse">

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CourseList


