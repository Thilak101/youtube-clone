import React, { useEffect, useState } from "react";
import "./video.css";
import { Link, useParams } from "react-router-dom";
import { addDoc, collection, doc, onSnapshot, query } from "firebase/firestore";
import { auth, db, timestamp } from "../../firebase";
import { AiFillLike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { HiDotsHorizontal, HiDownload } from "react-icons/hi";
import { MdOutlineSort } from "react-icons/md";
import { BiSolidDislike } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "../../slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { Comment, RecommendVideo } from "../../components";
import { CategoryItems } from "../../static/data";

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [data, setData] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(getUser);


  useEffect(() => {
    if (id) {
      const q = query(doc(db, "videos", id));
      onSnapshot(q, (snapshot) => {
        setData(snapshot.data());
      });
      const commentQuery = query(collection(db, "videos", id, "comments"));
      onSnapshot(commentQuery, (snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    }
  }, [id]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
  });

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

  const addComment = async (e) => {
    e.preventDefault();
    let userComment = {
      image: user.photoURL,
      name: user.displayName,
      comment: comment,
    };
    if (id) {
      await addDoc(collection(db, "videos", id, "comments"), userComment);
      setComment("");
    }
  };

  return (
    <div className="py-20 px-9 bg-yt-black flex flex-row w-full justify-between">
      <div className="flex flex-col">
        <div className="left">
          <iframe
            src={`https://www.youtube.com/embed/${data?.link}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-[800px] h-[400px] flex-1"
          ></iframe>
        </div>
        <h2 className="text-yt-white text-lg font-semibold mb-1">
          {data?.name}
        </h2>
        <div className="flex">
          <div className="flex items-center">
            <img
              src={data?.logo}
              alt={data?.channel}
              className="rounded-full w-10 h-10"
            />
          </div>
          <div className="px-3">
            <h3 className="font-medium text-yt-white text-base">
              {data?.channel && data?.channel.length <= 25
                ? data?.channel
                : `${data?.channel.substr(0, 20)}...`}
            </h3>
            <p className="text-sm text-yt-gray">
              {data?.subscribers} Subscribers
            </p>
          </div>
          <button className="bg-yt-red px-3 py-2 rounded-lg text-sm text-yt-white font-medium ml-3">
            Subscribe
          </button>
          <div className="flex pl-28 items-center">
            <div className="flex bg-yt-light-black items-center rounded-2xl h-10 mx-1 hover:bg-yt-light-1">
              <div className="flex px-3 items-center border-r-yt-light-1 cursor-pointer">
                <AiFillLike className="text-yt-white text-2xl" />
                <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                  300k
                </p>
              </div>
              <div className="cursor-pointer pl-4 pr-5">
                <BiSolidDislike className="text-yt-white text-2xl" />
              </div>
            </div>
            <div
              className="
          flex 
          bg-yt-light-black 
          items-center 
          rounded-2xl 
          h-10 
          mx-1 
          cursor-pointer 
          hover:bg-yt-light-1"
            >
              <div className="flex px-3 items-center rounded-2xl h-10 mx-1 cursor-pointer">
                <RiShareForwardLine className="text-yt-white text-2xl font-thin" />
                <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                  Share
                </p>
              </div>
            </div>
            <div className="flex px-3 bg-yt-light-1 items-center rounded-2xl h-10 mx-1 cursor-pointer">
              <HiDownload className="text-yt-white text-2xl font-thin" />
              <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                Download
              </p>
            </div>
            <div
              className="
        flex 
        bg-yt-light-black 
        hover:bg-yt-light-1 
        cursor-pointer 
        items-center 
        rounded-full 
        justify-center
        w-10
        h-10
        text-yt-white
        justify-center"
            >
              <HiDotsHorizontal />
            </div>
          </div>
        </div>
        <div className="max-w-4xl bg-yt-light-black mt-4 rounded-2xl text-sm p-3 text-yt-white">
          <p className="text-yt-white  py-2 text-sm  font-semibold">
            {`${data?.views}`}
            <span> Views</span>
            <span className="font-medium pl-3 py-2">{data?.uploadTime}</span>
          </p>
          <span className="text-center font-medium">{data?.description}</span>
        </div>

        <div className="text-yt-white mt-5 flex">
          <h1>
            {`${comments.length} `}
            Comments
          </h1>
          <div className="flex items-center mx-10">
            <MdOutlineSort size={30} className="mx-3" />
            <h4 className="flex items-center">Sort by</h4>
          </div>
        </div>
        {user && (
          <form
            onSubmit={addComment}
            className="flex w-[800px] pt-4 items-start"
          >
            <img
              src={user.photoURL}
              alt="profile"
              className="rounded-full mr-3 h-10 w-10"
            />
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="bg-[transparent] border-b text-yt-white border-b-yt-light-black outline-none text-sm p-1 w-full"
            />
          </form>
        )}
        <div className="mt-4">
          {comments.map((item, i) => {
            return <Comment key={i} {...item} />;
          })}
        </div>
      </div>

      <div className="right px-3 w-[600px] scrollbar-hide overflow-y-hidden">
        <div>
          <div className="flex  flex-row scrollbar-hide  px-3 overflow-x-scroll relative scrollbar-hide">
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
        <div className="pt-8">
          {videos.map((video, i) => {
            if (video.id !== id) {
              return (
                <Link key={i} to={`/video/${video.id}`}>
                  <RecommendVideo {...video} />
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Video;
