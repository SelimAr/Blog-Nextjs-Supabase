import React from "react";
import { createClient } from "@/app/utils/supabase/client";
import toast from "react-hot-toast";

interface DeletingButton {
  icon: any;
  article_id: string;
}

export default function DeleteButton(props: DeletingButton) {
  const { icon, article_id } = props;
  const supabase = createClient();

  const deleteComment = async (article_id: string) => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .delete()
        .eq("article_id", article_id);

      if (error) {
        console.log(error);
        toast.error(error as any);
        return;
      }
    } catch (error) {
      console.log("err delete com");
    }
  };

  return (
    <form
      action={async () => {
        await deleteComment(article_id);
      }}
    >
      <button type="submit" className="text-red-500 cursor-pointer">
        {icon}
      </button>
    </form>
  );
}
