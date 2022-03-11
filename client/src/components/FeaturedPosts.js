import React, { useEffect, useState, useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {Link} from 'react-router-dom';

function FeaturedPosts(props) {
  const { posts } = props;

  const [featured, setFeatured] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const slideRef = useRef();

  let count = currentIndex;
  let slideInterval;

  const nextSlide = () => {
    if (count === featured.length - 1) {
      count = 0;
      setCurrentIndex(count);
    } else {
      count += 1;
      setCurrentIndex(count);
    }
    slideRef.current.classList.add("fade");
  };

  const previousSlide = () => {
    if (count === 0) {
      count = featured.length - 1;
      setCurrentIndex(count);
    } else {
      count -= 1;
      setCurrentIndex(count);
    }
    slideRef.current.classList.add("fade");
  };

  const startSlider = () => {
    slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const removeAnimation = () => {
    slideRef.current.classList.remove("fade");
  };

  useEffect(() => {
    const featuredList = posts.filter((post) => post.featured);
    setFeatured(featuredList);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      slideRef.current.addEventListener("animationend", removeAnimation);
      slideRef.current.addEventListener("mouseenter", pauseSlider);
      slideRef.current.addEventListener("mouseleave", startSlider);
      startSlider();
    }

    return () => {
      pauseSlider(slideInterval);
    };
  }, [loading]);

  if (loading) return <div />;

  return (
    <div ref={slideRef} className="w-full select-none relative h-96 shadow-md">
      <div
        className="flex p-8 h-full w-full justify-center items-center gap-4 bg-local bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${featured[currentIndex].bannerImg})`,
          backgroundColor: "grey",
          backgroundBlendMode: "screen",
        }}
      >
        <div className="flex w-3/4 h-4/5 p-3 rounded bg-gray-600 justify-between shadow-md text-white">
          <img
            src={featured[currentIndex].bannerImg}
            alt="featured-img"
            className="hidden lg:block h-full rounded"
          />
          <div className="h-full rounded p-4 flex flex-col justify-evenly">
            <h2 className="text-4xl font-medium">
              {featured[currentIndex].title}
            </h2>
            <p className="line-clamp-4 text-ellipsis">
              {featured[currentIndex].body}
            </p>
            <div className="underline underline-offset-1">
              <Link to={`/posts/${featured[currentIndex]._id}`}>Read More</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
        <button onClick={previousSlide}>
          <AiOutlineLeft size={30} color="black" />
        </button>
        <button onClick={nextSlide}>
          <AiOutlineRight size={30} color="black" />
        </button>
      </div>
    </div>
  );
}

export default FeaturedPosts;
