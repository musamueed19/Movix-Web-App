import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import CircularRating from "../../../components/circularRating/CircularRating.jsx";
import Genre from "../../../components/genre/Genre.jsx";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
// playbtn
import PlayBtn from "../PlayBtn.jsx";

const DetailsBanner = ({ video, crew }) => {
  // normally, we get "Time Duration of Movies". This function will format into desired for us.
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  useParams;
  const { mediaType, id } = useParams();

  // useFetch custom hook
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  // now, we need to show movie poster img, so we use, "url" from redux store
  const { url } = useSelector((state) => state.home);

  // we are getting, genresArray as both {id, name}, we need only id, so, we'll create a variable to do this
  const _genres = data?.genres?.map((item) => item.id);

  // we don't want to see all crews, so. we will filter from crews array
  const director = crew?.filter((crew) => crew.job === "Director");
  const writer = crew?.filter(
    (crew) =>
      crew.job === "Writer" || crew.job === "Screenplay" || crew.job === "Story"
  );

  console.log(writer)
  return (
    <div className="detailsBanner">
      {/* when we get content from server, then show this */}
      {!loading ? (
        <>
          {/* if we have value in data, if yes, data will become false, and then become true */}
          {/* if data is undefined, then !data is set to true, after !(!data) is set to back false, and then our code will not execute */}
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url?.backdrop + data?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        src={url?.poster + data?.poster_path}
                        className="posterImg"
                      />
                    ) : (
                      <Img src={PosterFallback} className="posterImg" />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {/* "name" in case of TV SHows - "title" in case of Movies */}
                      {data?.name || data?.title}
                      <span className="originCountry">
                        ({data?.origin_country.join(",")})
                      </span>
                      {`(${dayjs(
                        data?.release_date || data?.first_air_date
                      ).format("YYYY")})`}
                    </div>

                    {/* now, we will add tagline in the subtitle */}
                    <div className="subtitle">
                      {data?.tagline || data?.name}
                    </div>

                    {/* now, we will list generes related to the movie */}
                    <div className="genres">
                      <Genre genreIds={_genres} />
                    </div>

                    {/* circleRating, PlayButton */}
                    <div className="row">
                      <CircularRating rating={data?.vote_average.toFixed(1)} />
                      {/* now, we will use Play btn */}
                      <div
                        className="playbtn"
                        onClick={(e) => {
                          console.log("playbtn is clicked....");
                        }}
                      >
                        <PlayBtn />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>

                    {/* now, we will made an overview section */}

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data?.overview}</div>
                      <div className="circleRating"></div>
                    </div>

                    {/* now, we will made "info" element */}
                    <div className="info">
                      {/* Release Status */}
                      {data?.status && (
                        <div className="infoItem">
                          <span className="text bold">Status:</span>
                          <span className="text">{data?.status}</span>
                        </div>
                      )}

                      {/* Release Data */}
                      {data?.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date:</span>
                          {/* format("MMM D, YYYY") */}
                          <span className="text">
                            {dayjs(data?.release_date).format("DD/MMM/YYYY")}
                          </span>
                        </div>
                      )}

                      {/* Total Duration */}
                      {data?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime:</span>
                          <span className="text">
                            {toHoursAndMinutes(data?.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* now, we will list directors first, but check, if directors eixts - which is immpossible for shows */}

                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {director.map((item, index) => (
                            <span key={index}>
                              {item?.name}
                              {director.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {/* now, time for writers */}
                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {writer.map((item, index) => (
                            <span key={index}>
                              {item?.name}
                              {writer.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {/* now, if we have animated shows, we have creator, instead of director */}
                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator:</span>
                        <span className="text">
                          {data?.created_by?.map((item, index) => (
                            <span key={index}>
                              {item?.name}
                              {data?.created_by?.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {/* end of Right section */}
                  </div>
                </div>
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        // otherwise, show this
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
