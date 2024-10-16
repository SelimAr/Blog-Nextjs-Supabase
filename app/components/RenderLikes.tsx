import React from "react";
import testArticle from "@/public/testArticles.jpg";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { type User } from "@supabase/supabase-js";
import { setName, setDate } from "../utils/functions";

export default function RenderLikes({
  user,
  id,
  like,
  article_id,
  created_at,
}: {
  user: User | null | undefined;
  id?: number;
  like: boolean;
  article_id: string;
  created_at: string;
}) {
  const text =
    "La série raconte le quotidien de la famille de Malcolm, troisième fils d'une fratrie de quatre garçons au début de la série. Il vit dans une famille américaine moyenne composée de Lois, sa mère autoritaire et déjantée, de Hal, son père, immature employé de bureau n'ayant aucun sens des responsabilités, et de ses trois frères, Francis, Reese et Dewey et d'un cinquième fils, Jamie, qui complétera la famille à partir de la quatrième saison.";
  return (
    <div className="block bg-white/5 rounded-lg p-2 m-2 w-full h-fit space-y-3 hover:bg-white/10">
      <div className="flex items-center justify-between">
        <div className="">
          <p className="text-white text-md font-semibold line-clamp-1">
            {setName(user?.email)}
          </p>
          <p className="text-zinc-500 text-sm">{setDate(created_at)}</p>
        </div>

        <div className="w-2/5 flex items-center space-x-2">
          <button className="cursor-pointer">
            <Trash2 className="text-red-500" size={25} />
          </button>
          <div className="text-white leading-5 text-md break-words">
            fetch {article_id}
          </div>
        </div>
      </div>
    </div>
  );
}
