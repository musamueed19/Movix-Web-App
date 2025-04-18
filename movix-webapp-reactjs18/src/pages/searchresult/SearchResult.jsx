import { useEffect, useState } from "react";

// params to get query user input for serach
import { useParams } from "react-router-dom";

import { fetchDataFromAPI } from "../../utils/api";

import "./style.scss";

import Spinner from "../../components/spinner/Spinner";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

// infinite scroll
import InfiniteScroll from "react-infinite-scroll-component"

import MovieCard from "../../components/movieCard/MovieCard"

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { query } = useParams();

  const InitialDataFetch = () => {
    setLoading(true);
    fetchDataFromAPI(`/search/multi?query=${query}&page=${page}`).then(
      (res) => {
        setData(res);
        setPage((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromAPI(`/search/multi?query=${query}&page=${page}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res?.results],
          });
        } else {
          setData(res);
        }
        setPage((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPage(1);
    InitialDataFetch();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>

              {/*  */}
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={page <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item?.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Result Not Found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
