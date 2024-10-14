"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ActionsBtn {
  icon?: any;
  onLink?: string;
  name?: string;
  className?: string;
}

export default function ActionsButton(props: ActionsBtn) {
  const router = useRouter();
  const { icon, onLink, name, className } = props;
  return (
    <button
      onClick={() => router.push(`/${onLink}`)}
      className={`text-white hover:scale-105 ease-in-out transition duration-50 hover:cursor-pointer 
      w-fit mx-auto hover:bg-white/10 p-1.5 rounded-full ${className}`}
    >
      {icon} {name}
    </button>
  );
}
