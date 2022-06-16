import Stories from "./Stories";
import dynamic from "next/dynamic";
import { useSession,  signIn } from "next-auth/react";
import MiniProfile from "./MiniProfile";
const Posts = dynamic(() => import("./Posts"), {
  ssr: false,
});



const Feed = () => {
  const { data: session } = useSession();
  return (
    <div className="container mx-auto md:mt-16 flex justify-center">
      {session ? (
        <>
          <div className="w-full md:w-4/5 lg:w-5/12">
            <Stories />
            <Posts />
          </div>
          <div className="hidden lg:inline-block lg:w-4/12">
            <MiniProfile />
          </div>
        </>
      ) : (
        <button onClick={signIn} className="p-4 w-52 mt-28 text-white bg-blue-500 rounded-2xl">
          Sign In
        </button>
      )}
    </div>
  );
};

export default Feed;
