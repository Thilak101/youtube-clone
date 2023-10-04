import React, { useState } from "react";
import "./sidebar.css";
import { SideBarItem } from "../../static/data";

const Sidebar = () => {
  const [active, setActive] = useState("Home");

  return (
    <div
      className="
    yt-scrollbar
    w-60 
    bg-yt-black 
    h-[calc(100vh-53px)] 
    mt-14
    fixed 
    top-0
    left-0
    text-yt-white
    p-3
    overlow-scroll"
    >
      <div className="mb-4">
        {SideBarItem.Top.map((item, index) => {
          return (
            <div
              key={index}
              className={`
              h-10
              flex
              justify-start
              px-3
              rounded-xl
              items-center
              cursor-pointer
              hover:bg-yt-light-black
              my-1
              ${item.name === active ? "bg-yt-light-black" : "bg-yt-black"}
              `}
              onClick={() => setActive(item.name)}
            >
              <span className="mr-5">{item.icon}</span>
              <p className="text-sm p-2 font-medium">{item.name}</p>
            </div>
          );
        })}
      </div>
      <hr className="text-yt-light-black my-2" />
      <div className="mb-4">
        <h2 className="px-3 py-1">Library</h2>
        {SideBarItem.Middle.map((item, index) => {
          return (
            <div
              key={index}
              className={`
              h-10
              flex
              justify-start
              px-3
              rounded-xl
              items-center
              cursor-pointer
              hover:bg-yt-light-black
              my-1
              ${item.name === active ? "bg-yt-light-black" : "bg-yt-black"}
              `}
              onClick={() => setActive(item.name)}
            >
              <span className="mr-5">{item.icon}</span>
              <p className="text-sm p-2 font-medium">{item.name}</p>
            </div>
          );
        })}
      </div>

      <hr className="text-yt-light-black my-2" />

      <div className="mb-4">
        <h2 className="px-3 py-1">Explore</h2>
        {SideBarItem.Explore.map((item, index) => {
          return (
            <div
              key={index}
              className={`
              h-10
              flex
              justify-start
              px-3
              rounded-xl
              items-center
              cursor-pointer
              hover:bg-yt-light-black
              ${item.name === active ? "bg-yt-light-black" : "bg-yt-black"}
              `}
              onClick={() => setActive(item.name)}
            >
              <span className="mr-5">{item.icon}</span>
              <p className="text-sm p-2 font-medium">{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
