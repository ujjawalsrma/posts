"use client";

import { useState } from "react";
import { useSession , signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const { data: session , status } = useSession();
  const router = useRouter();
  if(status === "loading"){
    return<></>
  }
  if (status === "unauthenticated")
  {
    // signIn();
    router.push("/");
  }else{

 
    
 

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    post.prompt = post.prompt.replaceAll('"', "'");
    post.tag = post.tag.replaceAll('"', "'");
    

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );

  }
};

export default CreatePrompt;
