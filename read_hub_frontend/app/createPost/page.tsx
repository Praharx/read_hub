"use client"

import axios from 'axios';
import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';

export default function createPost(){
    const router = useRouter();
    const [form, setForm] = useState<{title: string, content: string}>({
        title:'',
        content:''
    })

    async function handleSubmit(e:any){
        e.preventDefault();
        if(!(form.title || form.content)){
            alert("You cant send an empty post.");
            return;
        }
        try{
            const response = await axios.post("http://localhost:8787/api/post",form,{
            withCredentials: true
        })
        
        if(!response.data.success){
            alert("Post not created successfully!")
            return;
        }else{
            router.push('/postsRender')
        }
        }catch(err){
            console.log(err);
        }
        
    }
    return(
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Create New Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                            Title
                        </label>
                        <input
                            onChange={(e)=>setForm({...form, title: e.target.value})}
                            type="text"
                            id="title"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
                            Content
                        </label>
                        <textarea
                        onChange={(e)=>setForm({...form, content: e.target.value})}
                            id="content"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}