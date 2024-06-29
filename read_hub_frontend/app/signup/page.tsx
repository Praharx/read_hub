"use client"

import React,{ useState } from "react"
import axios from 'axios';
import Router, { useRouter } from "next/navigation"

type FormState = {
    email:string;
    password:string;
    name: string;
  }

export default function signup(){
    const router = useRouter();
    const [form, setForm] = useState<FormState>({
        email:'',
        password:'',
        name: ''
      });
    
      async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        console.log(form)
    
        const response = await axios.post('http://localhost:8787/api/signup',{
          name: form.name,
          email: form.email,
          password: form.password
        })

        if(!response.data.success){
          alert("Invalid Credentials. Please try again!")
        }else{
          alert("You have signed up successfully!!")
          router.push('/postsRender')
        }
      }
    
    return(
        <>
        <div className="flex justify-center items-center h-screen bg-blue-100">
        <div className="w-[25%] bg-blue-200 p-6 rounded-lg">
          <span className="text-2xl font-semibold text-center block mb-3 border-b border-grey">Signup</span>
          <form onSubmit={(e)=>handleSubmit(e)}>
          <div className="flex flex-col justify-center">
            <label htmlFor="email" className="block">Name</label>
            <input placeholder="Enter email" className="border border-white rounded-lg p-2 bg-blue-100" id="name" name="name" type="text" onChange={(e)=>{setForm({...form,name:e.target.value})}} />
          </div>
          <div className="flex flex-col justify-center">
            <label htmlFor="email" className="block">Email</label>
            <input placeholder="Enter email" className="border border-white rounded-lg p-2 bg-blue-100" id="email" name="email" type="text" onChange={(e)=>{setForm({...form,email:e.target.value})}} />
          </div>
          <div className="flex flex-col justify-center">
            <label htmlFor="password" className="block">Password</label>
            <input placeholder="Enter password" className="border border-white rounded-lg p-2 bg-blue-100"  name="password" id="password" type="password" onChange={(e)=>{setForm({...form,password:e.target.value})}} />
          </div>
          <button className="bg-blue-300 font-semibold p-2 flex justify-center mx-auto rounded-lg mt-4">Submit</button>
          </form>
        </div>
        </div>
        </>
    )
}