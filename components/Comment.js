import Image from "next/image";
import Moment from "react-moment";

const Comment = ({ comment, username, userImage, timestamp }) => {
  return (
    <div className="flex my-4 items-center justify-between">
      <div className="flex items-center">
        <div className="relative w-10 h-10">
          <Image src={userImage} className='rounded-full' layout="fill"  alt="" />
        </div>
        <div className="font-bold pl-2 pr-4">{username}</div>
        <div >{comment}</div>
      </div>
      <Moment className='text-xs' fromNow>
        {timestamp?.toDate()}
      </Moment>
    </div>
  );
};

export default Comment;
