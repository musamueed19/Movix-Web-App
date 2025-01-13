import { useEffect, useState } from "react"
// importing useNavigate from react-router-dom
import {useNavigate} from "react-router-dom"

// using useSelector for backdrop
import { useSelector } from "react-redux"

// importing our builtin-lazyLoad Image comp
import Img from "../../../components/lazyLoadImage/Img"

// importing our builtin-ContentWrapper comp
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"


import "./style.scss"

import useFetch from "../../../hooks/useFetch"

const HeroBanner = () => {

  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Now we need to create some COMPONENTS & A "custom HOOK"
  const { data, loading } = useFetch("/movie/upcoming");


  // using base_image_url
  const { url } = useSelector(state => state.home); // getting backdrop url from state



  // Choosing random movie from the data
  useEffect(() => {
    // Normally in data from servers, we need to use "Optional Chaining", bcz if we do this, the preceeding code will not execute, "until - it's value is UNDEFINED"

      const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
      setBackground(bg);
  }, [data, url.backdrop])


  function searchQueryHandler(e) {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }

  }

  return (
    <div className="heroBanner">
      {!loading && <div className="backdrop">
        <Img src={background} />
      </div>}

      {/* We will add another div called "oppacity-layer - to show merging effect" */}
      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome,</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          {/* search input */}
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for movies or TV shows..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button type="button">Search</button>
          </div>
          {background}
        </div>
              </ContentWrapper>
    </div>
  );
}

export default HeroBanner