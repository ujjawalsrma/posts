"use client"
import Form from "@components/Form";

// import { useRouter } from "next/router";
import { useRouter , useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

const UpdatePrompt = () => {
   
    const { data: session , status } = useSession();
  const router = useRouter();
  if(status === "loading"){
    return<></>
  }
  if (status === "unauthenticated")
  {
    
    router.push("/");
  }else{

    const searchParams = useSearchParams();
    const idofdoc = searchParams.get("id");
   
    const [submitting, setIsSubmitting] = useState(false);

    const a = localStorage.getItem('Name');

    const b = JSON.parse(a)

    const [post, setPost] = useState({ prompt: b.prompt, tag: b.tag });

    const updatePrompt = async (e) => {
        e.preventDefault();
        post.prompt = post.prompt.replaceAll('"', "'");
        post.tag = post.tag.replaceAll('"', "'");
        setIsSubmitting(true);
        try {
            let res = await fetch(`/api/prompt/${idofdoc}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,
                })
            });
            if(res.ok){
                router.back();
            }


        } catch (error) {
            console.log(error);
        }
        finally{
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <Form
                type='Update'
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={updatePrompt}
               
            />
        </>
    )}
}

export default UpdatePrompt
