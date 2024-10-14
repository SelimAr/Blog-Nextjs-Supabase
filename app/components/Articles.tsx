"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Heart,
  MessageCircleMore,
  Repeat2,
  Bookmark,
  BookmarkCheck,
  BookmarkX,
} from "lucide-react";
import { NewsType } from "@/type";

export default function Articles(props: NewsType) {
  const router = useRouter();
  const { article_id, title, creator, image_url, source_name } = props;

  const actions = [
    { id: 1, icon: <Heart size={25} />, name: "Aimer" },
    { id: 2, icon: <MessageCircleMore size={25} />, name: "Commenter" },
    { id: 3, icon: <Bookmark size={25} />, name: "Enregister" },
    { id: 4, icon: <Repeat2 size={25} />, name: "Partager" },
  ];

  return (
    <div
      key={article_id}
      className="hover:bg-white/10 w-full max-w-72 rounded-md ease-in-out transition duration-150 m-1"
    >
      <div
        onClick={() =>
          router.push(
            `/blog/article/${article_id}?article=${title.toLowerCase()}`
          )
        }
        className="hover:cursor-pointer relative"
      >
        <Image
          src={image_url && image_url}
          alt="###"
          width={1920}
          height={1080}
          className="rounded-t-md h-40 object-cover"
        />

        <div className="p-1 line-clamp-3 leading-[21px] text-white h-[71px] text-pretty">
          {title}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/0 via-gray-900/10 to-black/60 z-30 -translate-y-[71px]" />
      </div>

      <div className="flex justify-between items-center w-full px-1 pt-1 pb-2 space-x-0.5 ">
        <div className="italic line-clamp-1 text-zinc-400 text-sm">
          {(creator === null && source_name) || "Source inconnue"}
        </div>
        <div className="flex w-fit flex-nowrap space-x-2 text-white">
          {actions.map((action) => (
            <div
              key={action.id}
              className={`${
                action.id === 1
                  ? "hover:text-red-500"
                  : action.id === 2
                  ? "hover:text-blue-500"
                  : action.id === 3
                  ? "hover:text-yellow-500"
                  : action.id === 4 && "hover:text-green-500"
              } hover:scale-110 ease-in-out transition duration-50 hover:cursor-pointer`}
            >
              {action.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
