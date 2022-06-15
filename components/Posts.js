import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState();
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),

    [db]
  );
  return (
    <div className="md:mt-10 md:space-y-6">
      {posts === undefined
        ? ""
        : posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              profile={post.data().profile}
              username={post.data().username}
              image={post.data().image}
              caption={post.data().caption}
              timestamp={post.data().timestamp}
              />
          ))}
    </div>
  );
};

export default Posts;
