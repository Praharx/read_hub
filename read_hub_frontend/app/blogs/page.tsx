"use client"

import React, {useEffect, useState} from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import SkeletonCard from '../components/SkeletonCard';


const BlogPost: React.FC = () => {
    const [post, setPost] = useState<{title: string, content: string, authorId: string}>()
    const [currUser, setCurrUser] = useState<string>('');
   
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');

    useEffect(()=>{
      (async function fetchData(){
        try{
          const response = await axios.get(`http://localhost:8787/api/post/blog/${id}`,{
            withCredentials:true
        })
        if(!response.data.success){
          alert("Couldn't fetch from db.");
          return;
        }
        setPost(response.data.post)
        setCurrUser(response.data.userId)
       
        }catch(err){
          console.log(err);
        }
      })()
    },[])

    function handleEdit(){
      router.push(`/editPost?id=${id}`)
    }

  return (
    <>
    {
        !(post) ? <SkeletonCard key={1} />
          :
          <div className="relative max-w-xl mx-auto p-6 bg-white border rounded-lg shadow-md my-4">
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-800 mb-4">{post.content}</p>
            {/* <p className="text-gray-800 mb-4">Blog by: {authorName}</p> */}
            {
              (post.authorId === currUser)?
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none" onClick={handleEdit}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
            </button>:
            ''
            }
          </div>
    }
    </>
  );
};

export default BlogPost;
