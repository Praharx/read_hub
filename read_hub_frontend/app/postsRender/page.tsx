"use client"

import React,{ useState } from "react"
import Router, { useRouter } from "next/navigation"
import AllPosts from "../components/AllPosts";


export default function postsRender(){
  const router = useRouter();
  return(
    <>
     <div className="m-0 p-0 flex flex-col">
     <div className="flex items-center justify-between mt-4">
        <div className="flex justify-start ml-10 font-semibold text-2xl">Read_Hub</div>
        <button onClick={()=>router.push("/createPost")} className="border p-2 mr-4">Add New Blog</button>
      </div>

      <div className="flex items-center justify-center mt-20 text-2xl">
        Dummy Blog Site
      </div>
      
      <div>
        <AllPosts />
      </div>
     </div>
    </>
  )
}