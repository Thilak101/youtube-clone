import React from "react";
import { BiLike, BiDislike } from "react-icons/bi";

const Comment = ({ name, image, comment }) => {
  return (
    <div className="flex flex-row mb-3 text-yt-white">
      <img
        src={image}
        alt="profile"
        className="w-10  mr-3 h-10 rounded-full"
      />
      <div>
        <div className="flex items-center">
          <p className="text-sm font-medium pr-2 text-yt-white">{name}</p>
        </div>
        <p className="text-base pt-4">{comment}</p>
        <div className="flex py-3 justify-between w-36">
            <div className="flex">
                <BiLike size={20} className="cursor-pointer" />
                <p className="text-sm px-2 text-yt-gray">24</p>
            </div>
            <BiDislike size={20} className="cursor-pointer" />
            <p className="text-sm">Replay</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
