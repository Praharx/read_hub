"use client"

import React, { useEffect, useState } from "react"; 
import axios from "axios"; 
import Card from "./Card";
import SkeletonCard from "./SkeletonCard";


export default function AllPosts(){
    const [posts, setPosts] = useState<{title: string, authorId: string, id: string}[]>([]);
  

    useEffect(()=>{
        allPosts()
    },[])

    const allPosts =  async () =>{
        try{
            const response = await axios.get("http://localhost:8787/api/post",{
                withCredentials:true
            });
        if(!response.data.success){
            alert("Couldn't fetch the posts from db.")

            return;
        }
        console.log(response.data)
        setPosts(response.data.allPosts)
        }catch(err){
            console.log(err)
        }
    }
    return(
        <>
            {
            (!posts.length)?Array(5).fill(null).map((_,index)=><SkeletonCard key={index} />)
                :posts?.map((item, index) => {
                    return (
                        <Card title={item.title} authorId={item.authorId} id={item.id} joker={index} key={index} />
                    )
                })
   
        }
        </>
    )
}



