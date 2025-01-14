import {useRef} from "react"

import "./style.scss"

// import icons
import {
BsFillArrowLeftCircleFill,
BsFillArrowRightCircleFill,
} from "react-icons/bs"

// third party imports
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

// import custom comps
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";



const Carousel = ({data, loading}) => {
  // destructuring "url" from redux homeSlice
  const { url } = useSelector(state => state.home);
  const navigate = useNavigate();


  // carousel horizontal scrool 4 cards per scroll
  function navigation(dir) {
    console.log(dir);
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
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />

        {/* now rendering the card for carousel */}
        {!loading ? (
          <div className="carouselItems">
            {data?.map((item, index) => {
              const posterUrl = item?.poster_path
                ? url.poster + item?.poster_path
                : PosterFallback;
              return (
                <div key={item?.id} className="carouselItem">
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                  </div>
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
}

export default Carousel