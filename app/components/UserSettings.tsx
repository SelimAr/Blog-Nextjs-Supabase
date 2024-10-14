import React from "react";
import { LogIn, Heart, MessageCircleMore, Bookmark, House } from "lucide-react";
import ActionsButton from "./ActionsButton";
import { createClient } from "../utils/supabase/server";
import SignoutButton from "./SignoutButton";

export default async function UserSettings() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const btnArray = [
    {
      id: 1,
      btn: <ActionsButton onLink="blog" icon={<House size={25} />} />,
    },
    {
      id: 2,
      btn: (
        <ActionsButton onLink="blog/account/likes" icon={<Heart size={25} />} />
      ),
    },
    {
      id: 3,
      btn: (
        <ActionsButton
          onLink="blog/account/comments"
          icon={<MessageCircleMore size={25} />}
        />
      ),
    },
    {
      id: 4,
      btn: (
        <ActionsButton
          onLink="blog/account/saved"
          icon={<Bookmark size={25} />}
        />
      ),
    },
  ];

  return (
    <div className="block px-2 space-y-4 w-fit max-w-20 h-fit relative">
      {btnArray.map((button) => (
        <div className="rounded-full" key={button.id}>
          {button.btn}
        </div>
      ))}
      <span
        className={`absolute w-2 h-2 rounded-full right-1.5 ${
          user ? "bg-green-500" : "bg-red-500"
        }`}
      ></span>
      {user ? (
        <SignoutButton />
      ) : (
        <ActionsButton icon={<LogIn size={25} />} onLink="login" />
      )}
    </div>
  );
}
