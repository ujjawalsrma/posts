"use client"
import Profile from "@components/Profile";
import { useEffect } from "react"
import { useState } from "react"
import {  useSearchParams } from "next/navigation"
// import { useSession } from "next-auth/react"
const OtherProfile = ({params}) => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [myPosts, setMyPosts] = useState([]);
  
  const getdata = async () => {
    const res = await fetch( `/api/users/${params.id}/posts`);
     const data = await res.json();
      setMyPosts(data);
  }


   useEffect(  () => {
     getdata();
   },[])


  return (
    <Profile
    name={`${name}'s`}
    desc={`Welcome to the  profile page of Mr ${name}. see his exceptional prompts and get inspired  by the power of his imagination`}
    data={myPosts}
   
  />
  
  )
}

export default OtherProfile