"use client";
import React, { useState } from "react";
import { Heart, Trash2, Pen, X } from "lucide-react";
import { type User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";
import { setName, setDate } from "../utils/functions";

export default function RenderComments({
  user,
  id,
  comment,
  article_id,
  created_at,
}: {
  user: User | null | undefined;
  id: number;
  comment: string;
  article_id: string;
  created_at: string;
}) {
  const pathname = usePathname();
  const [isUpdateBox, setIsUpdateBox] = useState<boolean>(false);

  return (
    <>
      <div
        key={id}
        className={`${
          pathname === "/blog/account/comments" && "m-2"
        } flex bg-white/5 rounded-lg p-2 w-full h-fit space-y-3 hover:bg-white/10`}
      >
        <div
          className={`${
            pathname === "/blog/account/comments" && "w-3/5"
          } space-y-3 w-full`}
        >
          <div className="flex items-center space-x-2">
            <p className="text-white text-md font-semibold line-clamp-1">
              {setName(user?.email)}
            </p>
            <p className="text-zinc-500 text-sm">{setDate(created_at)}</p>
          </div>
          <div className="text-white leading-5 text-md">{comment}</div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <Heart size={25} className="text-red-500" />
              <p className="text-zinc-500 text-sm">237</p>
            </div>
            <div className="flex space-x-3 w-fit items-baseline">
              <button
                onClick={() => setIsUpdateBox(!isUpdateBox)}
                className="text-white cursor-pointer"
              >
                {isUpdateBox ? <X size={25} /> : <Pen size={25} />}
              </button>
              <DeleteButton
                icon={<Trash2 size={25} />}
                article_id={article_id}
              />
            </div>
          </div>
        </div>

        {pathname === "/blog/account/comments" ? (
          <div className="w-2/5">
            <div className="text-white leading-5 text-md break-words">
              fetch {article_id}
            </div>
          </div>
        ) : null}
      </div>
      {isUpdateBox ? (
        <UpdateButton
          onUpdate={isUpdateBox}
          article_id={article_id}
          comment={comment}
        />
      ) : null}
    </>
  );
}
