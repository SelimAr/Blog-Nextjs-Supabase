import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { headers } from "next/headers";
import Image from "next/image";
import Google from "@/public/google_logo.jpg";
import ActionsButton from "../components/ActionsButton";

export default async function page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signIn = async () => {
    "use server";
    const supabase = createClient();
    const origin = headers().get("origin");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error);
    } else {
      return redirect(data.url);
    }
  };

  if (user) {
    redirect("/blog");
  }

  return (
    <div className="absolute w-fit h-fit m-auto inset-0 bg-white/10 rounded-md">
      <div className="flex justify-center text-white space-x-2">
        <form action={signIn}>
          <button className="p-2 rounded-md cursor-pointer">
            <Image
              className=""
              src={Google}
              width={90}
              height={90}
              alt="Google"
            />
          </button>
        </form>
        <ActionsButton
          onLink="blog"
          name="Visiteur"
          className="w-fit h-fit my-auto"
        />
        <div
          className={`${
            user ? "bg-green-500" : "bg-red-500"
          } w-5 h-5 rounded-full`}
        ></div>
      </div>
    </div>
  );
}
