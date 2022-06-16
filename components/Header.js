import Image from "next/image";
import { HomeIcon } from "@heroicons/react/solid";
import {
  GlobeAltIcon,
  HeartIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalState";
import Router from "next/router";

const Header = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div className="md:border-b-2 py-2">
      <div className="container  mx-auto px-4 md:px-20 flex justify-between items-center">
        <div className="relative  w-1/3 md:w-28 h-10 ">
          <Image
            onClick={() => Router.push({ pathname: "/" })}
            src="https://www.vectorlogo.zone/logos/instagram/instagram-wordmark.svg"
            className="object-cover cursor-pointer"
            alt="instagram logo"
            layout="fill"
          />
        </div>
        {session ? (
          <>
            <div>
              <input
                type="text"
                className="h-full hidden md:block w-60 rounded-lg p-2 bg-gray-200"
                placeholder="Search..."
              />
            </div>
            <div className="hidden md:flex space-x-4">
              <HomeIcon className="h-7 w-7 cursor-pointer hover:scale-125 transform duration-200" />
              <PaperAirplaneIcon className="h-7 w-7 cursor-pointer hover:scale-125 transform duration-200" />
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="h-7 w-7 cursor-pointer hover:scale-125 transform duration-200"
              />
              <GlobeAltIcon className="h-7 w-7 cursor-pointer hover:scale-125 transform duration-200" />
              <HeartIcon className="h-7 w-7 cursor-pointer hover:scale-125 transform duration-200" />
              <div
                onClick={signOut}
                className="relative w-7 h-7 cursor-pointer hover:scale-125 transform duration-200"
              >
                <Image
                  src={session?.user?.image}
                  className="rounded-full"
                  alt=""
                  layout="fill"
                />
              </div>
            </div>
            <PaperAirplaneIcon className="block md:hidden h-7 w-7 cursor-pointer hover:scale-125 transform duration-200" />
          </>
        ) : (
          <button onClick={signIn} className="font-bold">
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
