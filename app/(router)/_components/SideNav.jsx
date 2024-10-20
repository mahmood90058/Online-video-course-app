// step-3

"use client"


import { useUser } from '@clerk/nextjs';
import { BadgeIcon, BookOpen, GraduationCap, LibraryIcon, Menu, StoreIcon } from 'lucide-react' // Add Menu icon for hamburger
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { useEffect } from 'react';

function SideNav() {
    const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar

    // jab user  login hoga tabhi dikhega dashboard
    const{user}= useUser();

    const menu = [
        {
            id: 8,
            name: "Dashboard",
            icon: LibraryIcon,
            path:'/dashboard',
            auth:user
            

        },
        {
            id: 1,
            name: "All Courses",
            icon: BookOpen,
            path:'/courses',
            auth:true
            

        },
      
        {
            id: 3,
            name: "CiCoursePro",
            icon: GraduationCap,
            path:"/Cicourse-pro",
            auth:true
        }
       
    ]

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle sidebar
    }


    // for route slected color
    const path= usePathname();
    useEffect(()=>{
        console.log(path)
    },[])

    return (
        <div >
            {/* Hamburger menu visible only on small screens */}
            <div className="md:hidden flex    ">
                <Image src={'/logo1.png'} alt="logo" width={170} height={80} />
                <button onClick={toggleMenu}>
                    <Menu size={32} />
                </button>
            </div>

            {/* Sidebar */}
            <div className={`md:block ${isOpen ? 'block' : 'hidden'} fixed  bg-white p-10  h-screen`}>
                <Image src={'/logo1.png'} alt="logo" width={170} height={80} className="sm:hidden md:block" />

                {/* Menu list */}
                <div>
                    {
                        menu.map((item) =>item.auth && (
                            <Link href={item.path}>
                            <div key={item.id} className={` group flex items-center space-x-2 p-4 mt-2 hover:bg-primary hover:text-white rounded-md transition-all ease-in-out duration-200 cursor-pointer ${path.includes(item.path)&& 'bg-primary text-white'}` }>
                                <item.icon className="group-hover:animate-bounce" />
                                <h2>{item.name}</h2>
                            </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SideNav




