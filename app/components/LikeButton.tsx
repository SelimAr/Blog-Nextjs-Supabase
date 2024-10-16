import React, { useState, useEffect } from "react";
import { createClient } from "@/app/utils/supabase/client";
import toast from "react-hot-toast";
import { type User } from "@supabase/supabase-js";

interface LikeButton {
  icon: any;
  article_id: string;
  user: User | null | undefined;
  disabled: boolean;
}

export default function LikeButton(props: LikeButton) {
  const { icon, article_id, user, disabled } = props;
  const supabase = createClient();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const postLike = async () => {
    try {
      const { data, error } = await supabase
        .from("likes")
        .insert({
          like: isLiked,
          user_id: user?.id,
          article_id: article_id,
          email: user?.email,
        })
        .eq("article_id", article_id);

      if (error) {
        console.log(error);
        toast.error(error as any);
        return;
      }
    } catch (error) {
      console.log("err like data");
    }
  };

  const getLike = async () => {
    try {
      const { data, error } = await supabase
        .from("likes")
        .select("like")
        .eq("article_id", article_id);

      if (data) {
        setIsLiked(data);
      } else if (error) {
        console.log(error);
      }
    } catch (error) {
      throw Error;
    }
  };

  useEffect(() => {
    getLike();
  }, [getLike]);

  return (
    <form
      action={async () => {
        await postLike();
        setIsLiked(!isLiked);
      }}
    >
      <button
        disabled={disabled}
        type="submit"
        className={`${isLiked ? "text-red-500" : "text-white"} cursor-pointer`}
      >
        {icon}
      </button>
    </form>
  );
}
