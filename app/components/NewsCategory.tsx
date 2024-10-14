"use client";

import React, { useState } from "react";
import { CategoryType } from "@/type";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function NewsCategory({
  categories,
}: {
  categories: CategoryType[];
}) {
  const [isCategories, setIsCategories] = useState<CategoryType[]>(categories);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="block px-1 space-y-3 m-2 w-full max-w-44">
      <p className="leading-4 text-white text-center">
        Selectionnez un thème d'actualité
      </p>

      {isCategories?.map((category: CategoryType) => (
        <button
          key={category.id}
          onClick={() =>
            router.push(
              `/blog/category/${
                category.id
              }?category=${category.category.toLowerCase()}`
            )
          }
          className={`${
            pathname === `/blog/category/${category.id}`
              ? "bg-white/20"
              : "bg-white/5"
          } text-white rounded-full px-2 py-1  hover:bg-white/10 w-fit mx-1`}
        >
          {category.category}
        </button>
      ))}
    </div>
  );
}
