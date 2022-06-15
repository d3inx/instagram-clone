import {
  BookmarkIcon,
  ChatIcon,
  DotsVerticalIcon,
  EyeIcon,
  EyeOffIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { lazy, useEffect, useState } from "react";
import { db } from "../firebase";
import Comment from "./Comment";

const Post = ({ id, profile, username, image, caption, timestamp }) => {
  const { data: session } = useSession();
  const [hasContent , setHasContent] = useState(true);
  const [myComment, setMyComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLikes, setHasLikes] = useState();


  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db]
  );
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [db]
  );
  useEffect(
    () =>
      setHasLikes(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLikes) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes",session.user.uid), {
        username: session.user.username,
      });
    }

  };
  const sentComment = async (e) => {
    e.preventDefault();
    if (myComment.length === 0) return;

    const commentToSend = myComment.trim();
    setMyComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };
  return (
    <div className="md:border-2 rounded-none md:rounded-3xl shadow-md md:shadow-lg py-4 px-6">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="relative rounded-full w-10 h-10">
            <Image
              src={profile}
              className="rounded-full"
              alt=""
              layout="fill"
            />
          </div>
          <div className="truncate text-sm pl-4">{username}</div>
        </div>
        <DotsVerticalIcon className="w-8 h-8" />
      </div>
      <div className="flex flex-col  rounded-3xl w-full h-full mt-8 pb-4 bg-cover">
        <div className="relative">
          <img
            src={image}
            className="rounded-3xl shadow-2xl"
            loading={lazy}
            alt=""
          />
          <div className={` flex absolute bottom-[10%]  justify-center transform transition-all duration-200  w-full ${hasContent ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex bg-white/50 backdrop-blur-xl p-3 rounded-full shadow-2xl w-2/3 mt-4">
              <div className="flex w-full justify-evenly">
                {hasLikes ? (
                  <HeartIconSolid
                    onClick={likePost}
                    className="w-5 h-5 md:w-7 md:h-7 cursor-pointer text-red-500"
                  />
                ) : (
                  <HeartIcon
                    onClick={likePost}
                    className="w-5 h-5 md:w-7 md:h-7 cursor-pointer"
                  />
                )}
                <ChatIcon className="w-5 h-5 md:w-7 md:h-7 cursor-pointer" />
                <PaperAirplaneIcon className="w-5 h-5 md:w-7 md:h-7 cursor-pointer" />

                <BookmarkIcon className="w-5 h-5 md:w-7 md:h-7 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
       <div className="flex justify-end">
       {
          hasContent ? (
            <EyeOffIcon onClick={() => setHasContent(!hasContent)} className="w-6 h-6 md:w-8 md:h-8 cursor-pointer" />
          ) : (
            <EyeIcon onClick={() => setHasContent(!hasContent)} className="w-6 h-6 md:w-8 md:h-8 cursor-pointer" />
          )
        }
       </div>
        <div className="font-bold mt-4">{`${likes.length} likes`}</div>
        <div className="">
          <span className="font-bold">{username}</span> {caption}
        </div>
        <div className="max-h-28 my-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent pr-6">
          {comments.map((comment) => (
            <Comment
              key={comment.data().id}
              comment={comment.data().comment}
              username={comment.data().username}
              userImage={comment.data().userImage}
              timestamp={comment.data().timestamp}
            />
          ))}
        </div>
        <form className="flex items-center w-full">
          <input
            type="text"
            value={myComment}
            onChange={(e) => setMyComment(e.target.value)}
            className="w-full py-4 focus:outline-none"
            placeholder="Add a Comment..."
          />
          <button
            type="submit"
            onClick={sentComment}
            disabled={!myComment.trim()}
            className="text-blue-500 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
