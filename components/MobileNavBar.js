import {
  GlobeAltIcon,
  HeartIcon,
  HomeIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalState";

const MobileNavBar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div className="fixed flex items-center justify-between bottom-0 w-full p-4 bg-gray-400/60 rounded-t-3xl backdrop-blur">
      <HomeIcon className="h-7 w-7 cursor-pointer hover:scale-125 transform duration-200" />
      <GlobeAltIcon className="h-7 w-7 cursor-pointer hover:scale-125 transform duration-200" />
      <PlusCircleIcon
        onClick={() => setOpen(true)}
        className="h-7 w-7 cursor-pointer hover:scale-125 transform duration-200"
      />
      <HeartIcon className="h-7 w-7 cursor-pointer hover:scale-125 transform duration-200" />
      <div
        onClick={signOut}
        className="relative w-7 h-7 cursor-pointer hover:scale-125 transform duration-200"
      >
        <img src={session?.user?.image} className="rounded-full" alt="" />
      </div>
    </div>
  );
};

export default MobileNavBar;
