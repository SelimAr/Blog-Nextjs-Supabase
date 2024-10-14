import { createClient } from "@/app/utils/supabase/server";
import UserRender from "@/app/components/UserRender";
import BlurredSkeleton from "@/app/components/BlurredSkeleton";

export default async function page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <>{!user ? <BlurredSkeleton /> : <UserRender user={user} />}</>;
}
