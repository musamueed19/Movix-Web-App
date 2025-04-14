import "./style.scss";
import useFetch from "../../hooks/useFetch";

// import useParams
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";

const Details = () => {
  // useParams
  // const { mediaType, id } = useParams();

  // // useFetch custom hook
  // const { data, loading } = useFetch(`/${mediaType}/${id}`);

  return <div>
    <DetailsBanner />
  </div>;
};

export default Details;
