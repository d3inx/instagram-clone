import { lazy } from "react";
import Moment from "react-moment";

const Comment = ({ comment, username, userImage, timestamp }) => {
  return (
    <div className="flex my-4 items-center justify-between">
      <div className="flex items-center">
        <div>
          <img src={userImage} className='w-10 h-10 rounded-full' loading={lazy} alt="" />
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
