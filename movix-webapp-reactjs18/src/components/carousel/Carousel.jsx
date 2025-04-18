import { useRef } from "react";

import "./style.scss";

// import icons
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

// third party imports
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

// import custom comps
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

// circularRating
import CircularRating from "../circularRating/CircularRating";
import Genre from "../genre/Genre";

const Carousel = ({ data, loading, endpoint, title }) => {
  // destructuring "url" from redux homeSlice
  const { url } = useSelector((state) => state.home);

  // handling sliding effect in Desktop
  const carouselContainer = useRef();
  const navigate = useNavigate();

  // carousel horizontal scrool 4 cards per scroll
  function navigation(dir) {
    console.log(dir);
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth"
    })
  }

  // function that return jsx code for skeleton Carousel - card
  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          color="white"
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          color="white"
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />

        {/* now rendering the card for carousel */}
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item, index) => {
              const posterUrl = item?.poster_path
                ? url.poster + item?.poster_path
                : PosterFallback;
              return (
                <div key={item?.id} className="carouselItem"
                onClick={() => navigate(`/${item?.media_type || endpoint}/${item?.id}`)}
                >
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircularRating rating={item?.vote_average.toFixed(1)} />
                  </div>
                  <Genre genreIds={item?.genre_ids?.slice(0, 2)} />
                  <div className="textBlock">
                    <span className="title">{item?.title || item?.name}</span>
                    <span className="date">
                      {dayjs(item?.release_Date || item?.first_air_date).format(
                        "MMM D, YYYY"
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
