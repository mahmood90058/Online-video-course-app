import { UserMemberContext } from '@/app/-context/UserMemberContext';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';

import { toast } from 'sonner';

function CourseEnroll({ courseInfo, isUserAlreadyEnrolled }) {
    const { user } = useUser(); // Get user login status
    // const membership = false; // This should come from your actual membership logic
    const {isMember, setIsMember}= useContext(UserMemberContext);

    // Safely check if courseInfo is available and has data
    const isCourseFree = courseInfo && courseInfo.length > 0 && courseInfo[0]?.free;


    const router = useRouter()


    useEffect(() => {
        console.log("IsuserEnrolledCourse", isUserAlreadyEnrolled)
    }, [isUserAlreadyEnrolled])





    // Enroll the course
    const onEnrollCourse = () => {
        GlobalApi.enrollToCourse(courseInfo[0]?.slug, user?.primaryEmailAddress?.emailAddress).then(res => {
            console.log(res)

            toast("User Enrolled Successfully")




            if (res) {

                // redirect the watch course

                router.push("/watchCourse/" + res.createUserEnrollCourse.id)
            }


        })

    }

    return (
        <div className='p-3 text-center rounded-sm bg-primary mt-3'>
            <h2 className='text-[22px] font-bold text-white'>Enroll in the course</h2>

            {/* Only render the following if courseInfo is available */}
            {courseInfo ?  (
                // Free course logic
                isCourseFree ?  (
                    user ? (!isUserAlreadyEnrolled&&
                        // User is logged in and course is free
                        <div className='flex flex-col gap-3'>
                            <h2 className='text-white font-light'>Enroll now and start learning and building the project</h2>
                            <Button className="bg-white text-primary hover:bg-white hover:text-primary"

                                onClick={() => onEnrollCourse()}
                            >Enroll Now</Button>
                        </div>
                    ) : (
                        // Course is free, but user is not logged in
                        <div className='flex flex-col gap-3'>
                            <h2 className='text-white font-light'>Sign in to enroll and start learning the project</h2>
                            <Link href={"/sign-in"}>
                                <Button className="bg-white text-primary hover:bg-white hover:text-primary">Sign In</Button>
                            </Link>
                        </div>
                    )
                ) : (
                    // Paid course logic
                    <>
                        {user ? (
                            isMember ? (
                                // User is logged in and has a membership
                                <div className='flex flex-col gap-3'>
                                    <h2 className='text-white font-light'>Enroll now and start learning and building the project</h2>
                                    <Button className="bg-white text-primary hover:bg-white hover:text-primary"   onClick={() => onEnrollCourse()}>Enroll Now</Button>
                                </div>
                            ) :!isUserAlreadyEnrolled&& (
                                // User is logged in but does not have a membership
                                <div className='flex flex-col gap-3'>
                                    <h2 className='text-white font-light'>Buy a monthly membership and get access to all courses</h2>
                                    <Button className="bg-white text-primary hover:bg-white hover:text-primary">Buy membership for just $2.99</Button>
                                </div>
                            )
                        ) : (
                            // User is not logged in for a paid course
                            <div className='flex flex-col gap-3'>
                                <h2 className='text-white font-light'>Sign in to enroll and start learning the project</h2>
                                <Link href={"/sign-in"}>
                                    <Button className="bg-white text-primary hover:bg-white hover:text-primary">Sign In</Button>
                                </Link>
                            </div>
                        )}
                    </>
                )
            ) : (
                // Show nothing or a loading state if courseInfo is null or undefined
                <p className='text-white'>Loading course information...</p>
            )}


           {isUserAlreadyEnrolled&& <div className='flex flex-col gap-3'>
                <h2 className='text-white font-light'>Continue To Learn Your project</h2>
                <Link href={"/watchCourse/"+isUserAlreadyEnrolled}>
                    <Button className="bg-white text-primary hover:bg-white hover:text-primary">Continue</Button>
                </Link>
            </div>
}
        </div>


    );
}

export default CourseEnroll;
