"use client";
import React, { useState } from "react";
import { createClient } from "@/app/utils/supabase/client";
import toast from "react-hot-toast";
import { Ellipsis, ChevronsLeftRightEllipsis } from "lucide-react";

interface UpdateButton {
  article_id: string;
  comment: string;
  onUpdate: boolean;
}

export default function UpdateButton(props: UpdateButton) {
  const { onUpdate, article_id, comment } = props;
  const supabase = createClient();
  const [isUpdate, setIsUpdate] = useState<string>("");
  const [isUpdateBox, setIsUpdateBox] = useState<boolean>(onUpdate);

  const updateComment = async (comment: string) => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .update({ comment: isUpdate })
        .eq("article_id", article_id);

      if (error) {
        console.log(error);
        toast.error(error as any);
        return;
      }

      toast.success("Commentaire modifié !");
    } catch (error) {
      console.log("err delete com");
    }
  };

  return (
    <>
      {isUpdateBox ? (
        <div className="block mx-2">
          <div className="my-4">
            <ChevronsLeftRightEllipsis
              size={25}
              className="text-white rotate-90 w-fit h-fit mx-auto"
            />
          </div>

          <form
            action={async () => {
              await updateComment(comment);
            }}
          >
            <textarea
              rows={4}
              className="w-full bg-white/10 rounded-lg outline-none p-2 caret-white text-white
            placeholder:text-zinc-500 hover:bg-white/15"
              placeholder="Modifier votre commentaire..."
              onChange={(e) => setIsUpdate(e.target.value)}
            />
            <button
              disabled={!isUpdate}
              type="submit"
              className="bg-white/10 hover:bg-white/15 text-white p-2 rounded-lg disabled:cursor-not-allowed 
        disabled:text-zinc-500 cursor-pointer"
            >
              Modifier
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
