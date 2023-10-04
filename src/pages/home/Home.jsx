import React, { useEffect, useState } from "react";
import "./home.css";
import { Sidebar, Video } from "../../components";
import { CategoryItems } from "../../static/data";
import { collection, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "videos"));

    onSnapshot(q, (snapshot) => {
      setVideos(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="w-[calc(100%-240px)] h-[calc(100%-53px)] pt-16 bg-yt-black ml-60">
        <div
          className="
        flex
        flex-row
        px-3
        overflow-x-scroll
        relative
        scrollbar-hide"
        >
          {CategoryItems.map((item, index) => {
            return (
              <div
                className="
              text-yt-white 
              bg-yt-black 
              font-normal 
              text-sm 
              py-2 
              px-4
              break-keep 
              whitespace-nowrap
              my-3
              cursor-pointer
              scrollbar-hide
              rounded-lg
              mr-5
              hover:bg-yt-light-1"
                key={index}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-12 px-5 grid grid-cols-4 gap-x-3 gap-y-8 ml-[240px] bg-yt-black">
        {videos.length === 0 ? (
          <>
            <div className="h-[86vh]">Videos not found</div>
          </>
        ) : (
          videos.map((video, i) => {
            return (
              <Link to={`/video/${video.id}`} key={i}>
                <Video {...video} />
              </Link>
            );
          })
        )}
      </div>

      <div className="pt-12 px-5 grid grid-cols-yt gap-3 "></div>
    </div>
  );
};

export default Home;
