import { History, Link2, User } from "lucide-react";
import { PopoverContent, PopoverTrigger, Popover } from "./ui/popover";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie"
import { useEffect, useState } from "react";
import { getProfile } from "@/lib/userApi";

export type Profile = {
  username: string;
  email: string;
};

export default function NavigationBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>({email: "user@gmail.com", username: "username"})
  const handleLogout = () => {
    Cookies.remove("token")
    router.push('/login')
  };
  useEffect(() => {

    const getProfileData = async () => {
      const profiledata = await getProfile();
      setProfile(profiledata.user);
    };

    getProfileData();
  }, []);
  return (
    <div className="absolute top-6 md:top-10 right-6 md:right-28 flex items-center gap-4">
      {/* History Button */}
      <button
        onClick={() => router.push("/")}
        className={`flex items-center gap-2 hover:text-[#22d3ee] transition cursor-pointer ${pathname == "/" ? "text-[#22d3ee]" : "text-[#c7d2fe]"}`}
      >
        <Link2 size={18} />
        <span className="hidden md:block">Links</span>
      </button>
      <button
        onClick={() => router.push("/history")}
        className={`flex items-center gap-2 hover:text-[#22d3ee] transition cursor-pointer ${pathname == "/history" ? "text-[#22d3ee]" : "text-[#c7d2fe]"}`}
      >
        <History size={18} />
        <span className="hidden md:block">History</span>
      </button>

      {/* Profile Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="text-[#c7d2fe] hover:text-[#22d3ee] transition">
            <User size={20} />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-44 p-2 bg-[#0f172a] border border-[#1e293b]">
          <div className="flex flex-col">
            <p className="text-[hsl(0,0%,80%)] px-3 py-1">{profile.username}</p>
            <p className="text-[hsl(0,0%,80%)] px-3 py-1 pb-3">{profile.email}</p>

            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm rounded-md hover:bg-[#1e293b] text-left text-red-400"
            >
              Logout
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
