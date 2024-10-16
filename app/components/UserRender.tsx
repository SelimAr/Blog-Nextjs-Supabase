"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/app/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import RenderComments from "./RenderComments";
import RenderLikes from "./RenderLikes";
import RenderSaved from "./RenderSaved";
import { CommentsType, LikesType, SavedType } from "@/type";

export default function UserRender({ user }: { user: User | null }) {
  const supabase = createClient();
  const pathname = usePathname();
  const [isComments, setIsComments] = useState<CommentsType[]>([]);
  const [isLikes, setIsLikes] = useState<LikesType[]>([]);
  const [isSaved, setIsSaved] = useState<SavedType[]>([]);

  const getComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("comment, article_id, created_at")
        .eq("user_id", user?.id);

      if (data) {
        setIsComments(data);
      } else if (error) {
        console.log(error);
      }
    } catch (error) {
      throw Error;
    }
  };

  const getLikes = async () => {
    try {
      const { data, error } = await supabase
        .from("likes")
        .select("like, article_id, created_at")
        .eq("user_id", user?.id);

      if (data) {
        setIsLikes(data);
      } else if (error) {
        console.log(error);
      }
    } catch (error) {
      throw Error;
    }
  };

  useEffect(() => {
    getComments();
    getLikes();
  }, [user, getComments, getLikes]);

  return (
    <>
      {pathname === "/blog/account/comments"
        ? isComments?.map((com) => (
            <RenderComments key={com.id} {...com} user={user} />
          ))
        : pathname === "/blog/account/likes"
        ? isLikes?.map((like) => (
            <RenderLikes key={like.id} {...like} user={user} />
          ))
        : pathname === "/blog/account/saved"
        ? isSaved?.map((saved) => <RenderSaved key={saved.id} {...saved} />)
        : null}
    </>
  );
}
