"use client"

import React,{ useState } from "react"
import Router, { useRouter } from "next/navigation"
import AllPosts from "./components/AllPosts";
import { url } from "inspector";


export default function Home(){
  const router = useRouter();
  return(
    <>
     <div className="m-0 p-0 flex flex-col bg-custom bg-cover bg-center min-h-screen text-white">
  <div className="flex items-center justify-between mt-4">
    <div className="flex justify-start ml-10 font-semibold text-3xl">Read_Hub</div>
    <div className="flex gap-5 justify-end mr-10 mt-2">
      <button 
        onClick={() => router.push('/signup')} 
        className="border border-white p-2 hover:bg-white hover:text-black transition-colors duration-300"
      >
        Sign-up
      </button>
      <button 
        onClick={() => router.push('/signin')} 
        className="border border-white p-2 hover:bg-white hover:text-black transition-colors duration-300"
      >
        Login
      </button>
    </div>
  </div>

  <div className="flex flex-col items-center justify-center flex-grow">
    <div className="mt-20 text-3xl text-center px-10">
      Fuel your curiosity and cultivate self-taught knowledge with
    </div>
    <div className="mt-4 text-5xl font-bold text-black text-center">
      Read_Hub
    </div>
    <div className="mt-10 text-lg text-center px-10 max-w-2xl">
      At Read_Hub, we believe that knowledge is power. Dive into a vast collection of resources, 
      join a community of like-minded learners, and take your self-learning to the next level.
    </div>
  </div>
        <div className="mt-10 mb-10 flex justify-center">
          <button
            onClick={() => router.push('/signup')}
            className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            Explore Now
          </button>
        </div>
      </div>
    </>
  )
}