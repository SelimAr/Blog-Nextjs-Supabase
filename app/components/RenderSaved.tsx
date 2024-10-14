import React from "react";
import testArticle from "@/public/testArticles.jpg";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function RenderSaved() {
  const text =
    "La série raconte le quotidien de la famille de Malcolm, troisième fils d'une fratrie de quatre garçons au début de la série. Il vit dans une famille américaine moyenne composée de Lois, sa mère autoritaire et déjantée, de Hal, son père, immature employé de bureau n'ayant aucun sens des responsabilités, et de ses trois frères, Francis, Reese et Dewey et d'un cinquième fils, Jamie, qui complétera la famille à partir de la quatrième saison.";
  return (
    <div className="block bg-white/5 rounded-lg p-2 m-2 w-full h-fit space-y-3 hover:bg-white/10">
      <div className="flex space-x-2">
        <button className="">
          <Trash2 size={25} className="text-red-500" />
        </button>
        <Image
          src={testArticle}
          alt="article"
          width={200}
          height={100}
          className="rounded-lg"
        />
        <div className="text-white leading-5 text-md line-clamp-6">{text}</div>
      </div>
    </div>
  );
}
