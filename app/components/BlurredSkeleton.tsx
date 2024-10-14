import React from "react";
import testArticle from "@/public/testArticles.jpg";
import Image from "next/image";
import ActionsButton from "./ActionsButton";
import { Trash2, Pen } from "lucide-react";

export default function BlurredSkeleton() {
  const text1 =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada dolor et mi vulputate tristique. Sed vulputate eros ligula. Proin";
  const textPara =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada dolor et mi vulputate tristique. Sed vulputate eros ligula. Proin fermentum, arcu quis consequat condimentum, dolor dolor tincidunt metus, nec fringilla tortor dui ac neque. Cras mauris lacus, suscipit in erat placerat, gravida dignissim justo. Praesent lacinia, eros in feugiat cursus, nunc metus fermentum tortor, sed rhoncus eros metus at augue. Nam aliquam mollis consectetur. Aenean id congue sem, et laoreet nibh. Phasellus tellus elit, suscipit vitae auctor in, elementum nec tortor. Quisque rhoncus enim libero, ac feugiat purus eleifend congue. Donec at ipsum ullamcorper, eleifend elit nec, venenatis ligula. Duis lobortis aliquet augue et imperdiet. Aenean libero augue, faucibus non nisi eu, maximus porttitor dolor. Duis auctor enim libero, ac venenatis dui mattis non.";

  return (
    <div className="w-full text-white m-2 block relative z-20 p-4">
      <div className="flex space-x-2">
        <Image
          src={testArticle}
          alt="img"
          width={500}
          height={500}
          className="rounded-full h-24 w-24"
        />
        <p className="text-lg leading-5 italic line-clamp-4">{textPara}</p>
      </div>
      <div className="flex space-x-2 items-start my-5">
        <Image
          src={testArticle}
          alt="img"
          width={300}
          height={200}
          className="rounded-xl"
        />
        <div className="block space-y-2">
          <p className="text-xl line-clamp-1">{text1}</p>
          <p className="text-lg line-clamp-3">{textPara}</p>
          <div className="flex justify-start space-x-5">
            <Pen size={25} className="text-white" />
            <Trash2 size={25} className="text-red-500" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 m-auto w-full h-full z-30 backdrop-blur">
        <ActionsButton
          name="Connectez vous pour accéder à cette fonctionnalité"
          className="bg-white/20 absolute inset-0 m-auto h-fit w-fit"
          onLink="login"
        />
      </div>
    </div>
  );
}
