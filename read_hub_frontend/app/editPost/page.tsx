"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";


export default function editPost(){
    const [data, setData] = useState<{title: string, content: string, authorId: string}>({
        title:"",
        content:"",
        authorId:""
    });
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');
    
    useEffect(()=>{
        handleEdit()
    },[])

    async function handleEdit(){
    const response = await axios.get(`http://localhost:8787/api/post/blog/${id}`,{
        withCredentials: true
    })
    if(!response.data.success){
        alert("Couldn't fetch the data from db")
        return;
    }
    setData({
        title: response.data.post.title,
        content: response.data.post.content,
        authorId: response.data.post.authorId
     })
    }

    async function handleSubmit(e:any){
        e.preventDefault()
        setData(data);
        try{
            const response = await axios.put(`http://localhost:8787/api/post/blog/${id}`,data,{
                withCredentials: true
            });
        if(!response.data.success){
            alert("Post Edit wasn't successful.")
            return;
        }
        alert("Your post edit was successful.")
        router.push('/postsRender')
        }catch(err){
            console.log(err)
        }
    }

    return (
        
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                            Title
                        </label>
                        
                        { (!data.title)?
                       <input
                       disabled
                       onChange={(e)=>setData({...data, title: e.target.value})}
                       defaultValue={""}
                       type="text"
                       id="title"
                       className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                   />: <input
                   onChange={(e)=>setData({...data, title: e.target.value})}
                   defaultValue={data.title}
                   type="text"
                   id="title"
                   className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               />
                        }
                        
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
                            Content
                        </label>
                        {
                            (!data.content)?
                            <textarea
                            disabled
                            onChange={(e)=>setData({...data, content: e.target.value})}
                            defaultValue={data.content}
                            id="content"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>:
                        <textarea
                            onChange={(e)=>setData({...data, content: e.target.value})}
                            defaultValue={data.content}
                            id="content"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                        }
                    </div>
                    
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}