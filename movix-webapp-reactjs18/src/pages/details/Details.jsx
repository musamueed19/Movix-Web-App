import "./style.scss";
import useFetch from "../../hooks/useFetch";

// import useParams
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";

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
      </div>
      {/* )} */}
    </>
  );
};

export default Details;
