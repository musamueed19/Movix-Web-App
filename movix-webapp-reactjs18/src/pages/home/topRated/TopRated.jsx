import { useState } from "react";

// import custom comps
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";

// custom hooks
import useFetch from "../../../hooks/useFetch";

const TopRated = () => {
  // state for Api call - storing Time Window for Filter - Day or week
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/top_rated`);

  // filter tabs - handler
  function onTabChange(tab) {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  }

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default TopRated;
