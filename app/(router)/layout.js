// 2nd step

"use client"

import React, { useContext, useEffect } from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '../_utils/GlobalApi';
import { UserMemberContext } from '../-context/UserMemberContext'

function layout({children}) {

  const {user}= useUser();

  const {isMember, setIsMember}= useContext(UserMemberContext);

  useEffect(()=>{
    UsercheckMembership();
  },[user])


  const UsercheckMembership=()=>{
    GlobalApi.checkForMembersShips(user?.primaryEmailAddress.emailAddress).then(res=>{
      console.log(res);
      if(res?.memberships?.length>0){
        // console.log("its member")
        setIsMember(true)
      }
      
    })

  }

  return (

    <div>

        <div className='sm:w-64 hidden sm:block fixed'>
            <SideNav/>
        </div>

        <div className="ml-64">
            <Header/>


        {children}</div>
        </div>
        
        
  )
}

export default layout