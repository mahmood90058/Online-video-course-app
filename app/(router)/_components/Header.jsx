// step-4
"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { BellDot, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Header() {
  // to get the information of login user
  const {user,isLoaded}= useUser();
  return (
    <div className="p-7 md:ml-[-10px]  bg-white flex  justify-between">
        <div className="flex gap-2 border rounded-md p-2">
            <SearchIcon className="h-5 w-5"/>
            <input type="text" placeholder="Search...."  className="outline-none" />
        </div>

        {/* Get started  Button and bell icon */}

        <div className=" flex items-center gap-4">
            <BellDot className=" text-gray-800"/>
            {
              isLoaded&&user?
              <UserButton />
              :
              <Link href="/sign-in">
              <Button>Get Started</Button>
              </Link>
            }
        </div>
        
        


    </div>
  )
}

export default Header


