"use client";

import React, { useState, useEffect } from "react";
import { NewsType, CommentsType } from "@/type";
import Image from "next/image";
import { createClient } from "@/app/utils/supabase/client";
import {
  Heart,
  Bookmark,
  BookmarkX,
  MessageCircleMore,
  Pen,
  Trash2,
} from "lucide-react";
import ActionsButton from "./ActionsButton";
import RenderComments from "./RenderComments";
import toast from "react-hot-toast";
import { setDate } from "../utils/functions";

export default function ViewArticles(props: NewsType) {
  const {
    user,
    title,
    description,
    link,
    image_url,
    creator,
    source_name,
    pubDate,
    article_id,
  } = props;
  const supabase = createClient();
  const [isCommentBox, setIsCommentBox] = useState<Boolean>(false);
  const [isComment, setIsComment] = useState<string>("");
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isPostComments, setIsPostComments] = useState<CommentsType[]>([]);

  const postComment = async () => {
    try {
      const { data, error } = await supabase.from("comments").insert({
        comment: isComment,
        user_id: user?.id,
        article_id: article_id,
      });

      if (error) {
        console.log(error);
        toast.error(error as any);
        return;
      }

      toast.success("Commentaire envoyé !");
    } catch (error) {
      console.log("err insert data");
    }
  };

  const getPostComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("comment")
        .eq("article_id", article_id);

      if (data) {
        setIsPostComments(data);
      } else if (error) {
        console.log(error);
      }
    } catch (error) {
      throw Error;
    }
  };

  const postLike = async (isLike: boolean) => {
    try {
      const { data, error } = await supabase
        .from("likes")
        .insert({
          like: isLike,
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

  const likeState = () => {
    setIsLike(!isLike);
    postLike(isLike);
  };

  useEffect(() => {
    getPostComments();
  }, [getPostComments]);

  return (
    <div key={article_id} className="m-2 space-y-3">
      <Image
        src={image_url && image_url}
        alt={title}
        width={1920}
        height={1080}
        className="h-72 object-cover object-top rounded-lg"
      />
      <p className="text-white">{setDate(pubDate)}</p>
      <div className="text-white text-pretty text-3xl underline underline-offset-4 decoration-1">
        {title}
      </div>
      <div className="text-white text-pretty text-xl italic">{description}</div>
      <div className="flex justify-start items-center space-x-5">
        <div className="text-zinc-600 text-lg italic">
          {creator === null && source_name}
        </div>
        <button className="text-white bg-white/10 hover:bg-white/15 p-2 rounded-full">
          <a href={link}>Accéder à la source</a>
        </button>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => likeState()}
          disabled={!user}
          className="disabled:cursor-not-allowed"
        >
          <Heart
            size={25}
            className={`${isLike ? "text-red-500" : "text-white"}`}
          />
        </button>
        <button
          disabled={!user}
          onClick={() => setIsCommentBox(!isCommentBox)}
          className="disabled:cursor-not-allowed"
        >
          <MessageCircleMore size={25} className="text-white" />
        </button>
        <button disabled={!user} className="disabled:cursor-not-allowed">
          <Bookmark size={25} className="text-white" />
        </button>
        {!user ? (
          <ActionsButton
            name="Connectez vous pour accéder à ces fonctionnalités"
            className="bg-white/20 h-fit w-fit"
            onLink="login"
          />
        ) : null}
      </div>

      {user && isCommentBox ? (
        <form action={postComment} className="block space-y-3">
          <textarea
            rows={4}
            className="w-full bg-white/10 rounded-lg outline-none p-2 caret-white text-white
            placeholder:text-zinc-500 hover:bg-white/15"
            placeholder="Entrez un commentaire..."
            onChange={(e) => setIsComment(e.target.value)}
          />
          <button
            className="bg-white/10 hover:bg-white/15 text-white p-2 rounded-lg disabled:cursor-not-allowed disabled:text-zinc-500"
            disabled={!isComment}
          >
            Commenter
          </button>
        </form>
      ) : null}

      <div className="text-white space-y-2">
        <div className="">
          {isPostComments.length} commentaire
          {isPostComments.length >= 2 && "s"} sur cet article
        </div>

        {isPostComments?.map((com: CommentsType) => (
          <RenderComments key={com.id} {...com} user={user} />
        ))}
      </div>
    </div>
  );
}
