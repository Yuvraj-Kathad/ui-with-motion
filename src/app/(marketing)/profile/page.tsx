import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Profile | UX With Motion",
  description: "User profile.",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const userName = user.user_metadata?.full_name || user.user_metadata?.name || "User";

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-[70px] py-16">
      <h1 className="font-sans font-medium text-[32px] text-black mb-4">
        Profile
      </h1>
      <div className="p-8 bg-white border border-[#E7E7E7] rounded-2xl max-w-2xl">
        <p className="font-sans text-[16px] text-[#454545] mb-4">
          Welcome to your profile, <strong className="text-black">{userName}</strong>.
        </p>
        <p className="font-sans text-[16px] text-[#454545]">
          This is a placeholder for the future profile settings and management page.
        </p>
      </div>
    </div>
  );
}
