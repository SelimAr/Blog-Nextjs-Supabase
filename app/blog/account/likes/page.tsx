import React from "react";
import { createClient } from "@/app/utils/supabase/server";
import BlurredSkeleton from "@/app/components/BlurredSkeleton";
import UserRender from "@/app/components/UserRender";

export default async function page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <>{!user ? <BlurredSkeleton /> : <UserRender user={user} />}</>;
}
