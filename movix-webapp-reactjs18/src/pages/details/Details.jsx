import "./style.scss";
import useFetch from "../../hooks/useFetch";

// import useParams
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";

const Details = () => {
  useParams;
  const { mediaType, id } = useParams();

  // useFetch custom hook
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <>
      {/* {!loading && !creditsLoading && ( */}
      <div>
        <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
        {/* now, we need to call 2 APIs, - for Videos section */}
        {/* - for Casts Section */}


        {/* Now, we will show cast section here */}
        <Cast casts={credits?.cast} loading={creditsLoading} />


        {/* now videos section */}
        <VideosSection videos={data} loading={loading} />

        {/* now similar videos, carousel */}
        <Similar mediaType={mediaType} id={id} />

        {/* now recommendation videos, carousel */}
        <Recommendation mediaType={mediaType} id={id} />

      </div>
      {/* )} */}
    </>
  );
};

export default Details;
