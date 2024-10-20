"use client"

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GlobalApi from "./_utils/GlobalApi";

export default function Home() {
  const router= useRouter();
  const{user,isLoaded}= useUser();



  useEffect(()=>{
    // means user login
    if(user){  
      router.push("/dashboard")
    }
    else{
      isLoaded&&router.push("/courses")
    }
  },[user])




  

  return (
    <div>

    {/* <Button >this me</Button> */}
    <UserButton/>
    </div>
    
   
    
  );
}
