import { faker } from "@faker-js/faker";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const MiniProfile = () => {
  const [suggestions, setSuggestions] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const suggestion = [...Array(5)].map((_, i) => ({
      id: i,
      username: faker.internet.userName(),
      profile: faker.image.avatar(),
    }));
    setSuggestions(suggestion);
  }, []);
  return (
    <div className="pl-8">
      <div className="flex justify-between">
        <div className="relative w-16 h-16">
          <Image
            src={session?.user?.image}
            className=" rounded-3xl"
            layout="fill"
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="font-bold">{session.user.username}</div>
          <div className="text-neutral-500">Welcome To Instagram</div>
        </div>
        <button className="font-bold text-blue-500 text-xl" onClick={signOut}>Sign Out</button>
      </div>
      <div className="my-8 font-bold text-2xl text-neutral-500">Suggestion For You</div>
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <>
            <div key={suggestion.id} className="flex  w-12 h-12 space-x-8">
              <div className="relative min-w-full min-h-full">
                <Image
                  src={suggestion?.profile}
                  className=" rounded-full"
                  layout="fill"
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="font-bold truncate">{suggestion.username}</div>
                <div className="text-neutral-500 truncate">Suggested For You</div>
              </div>
              <button className=" text-blue-500">
                Follow
              </button>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default MiniProfile;
