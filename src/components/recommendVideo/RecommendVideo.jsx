import React from "react";
import { MdVerified } from "react-icons/md";

const RecommendVideo = ({ thumbnail, name, channel, views, uploadTime }) => {
  return (
    <div className="text-yt-white py-2 flex cursor-pointer">
      <img
        src={thumbnail}
        alt=""
        className="h-32 w-52 rounded-2xl object-contain"
      />
      <div className="pl-2">
        <h2 className="text-sm font-medium">
          {name.length <= 50 ? name : `${name.substr(0, 50)}...`}
        </h2>
        <p className="text-xs text-yt-gray pt-2 flex">
          {channel}
          <span className="p-1">
            <MdVerified />
          </span>
        </p>
        <div className="flex">
          <p className="text-xs text-yt-gray ">{`${views} views`}</p>
          <p className="text-xs text-yt-gray ">{`${uploadTime} upload time`}</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendVideo;
