import React from "react";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "../utils/supabase/server";
import { LogOut } from "lucide-react";
import ActionsButton from "./ActionsButton";

export default async function SignoutButton() {
  const logout = async () => {
    "use server";

    const supabase = createClient();

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    revalidatePath("/", "layout");
    redirect("/login");
  };

  return (
    <form action={logout}>
      <ActionsButton icon={<LogOut size={25} />} />
    </form>
  );
}
