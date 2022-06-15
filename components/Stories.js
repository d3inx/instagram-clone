import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { PlusIcon } from "@heroicons/react/outline";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const stories = [...Array(20)].map((_, i) => ({
      id: i,
      username: faker.internet.userName(),
      profile: faker.image.avatar(),
    }));
    setStories(stories);
  }, []);
  return (
    <div className="flex overflow-x-scroll  scrollbar-hide md:scrollbar-default scrollbar-thumb-zinc-800 scrollbar-track-transparent scrollbar-thin shadow-md md:shadow-lg border-2 rounded-none md:rounded-3xl p-4 space-x-4">
      <div
          className="flex flex-col items-center justify-between py-2 hover:scale-125 transform duration-200 w-20"
        >
            <div className="relative inline-block min-w-max">
                <img src={session.user.image} className='rounded-3xl w-16 h-16' alt='' />
                <PlusIcon className="absolute bottom-0 right-0 inline-block w-6 h-6 bg-blue-500 text-white border-2 border-white rounded-full p-[2px]" />
            </div>
            <div className="w-full truncate text-xs mt-2 text-center">{session?.user?.username}</div>
        </div>
      {stories.map((story) => (
        <div
          key={story.id}
          className="flex flex-col items-center justify-between py-2 hover:scale-125 transform duration-200 w-20"
        >
            <div className="relative rounded-3xl w-16 h-16 p-2  ring-2 border-2 border-transparent ring-fuchsia-500">
                <Image src={story.profile} className='rounded-3xl ' alt='' layout="fill" />
            </div>
            <div className="w-full truncate text-xs mt-2 text-center">{story.username}</div>
        </div>
      ))}
    </div>
  );
};

export default Stories;
