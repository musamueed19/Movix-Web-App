// Third party imports
import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState } from "react";

// importing BrowserRouter from react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { fetchDataFromAPI } from "./utils/api";

// redux-actions homeSLice
import { getApiConfiguration, getGenres } from "./store/homeSlice";

// importing our (components & pages)
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchresult/SearchResult";
import NotFound from "./pages/404/NotFound";
import Explore from "./pages/explore/Explore";

function App() {
  const { url, genres } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  // Testing my api, fetcher function
  function fetchApiConfig() {
    fetchDataFromAPI("/configuration").then((res) => {
      // console.log(res);

      // storing only the required data
      const url = {
        backdrop: res?.images?.secure_base_url + "original",
        poster: res?.images?.secure_base_url + "original",
        profile: res?.images?.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  }

  async function getALlGenres() {
    let promises = [];
    let endPoints = ["movie", "tv"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromAPI(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((item) => {
        allGenres[item?.id] = item?.name;
      });
    });

	  // console.log(allGenres);
	  
	  dispatch(getGenres(allGenres));
  }

  // calling my defined function in useEffect
  useEffect(() => {
    fetchApiConfig();
    getALlGenres();
  }, []);

  return (
    // This BrowserRouter acts as a wrapper for our App.jsx - all Routes will nested inside this
    <BrowserRouter>
      <Header />

      {/* All the routes will be defined here */}
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/:mediaType/:id"} element={<Details />} />
        <Route path={"/search/:query"} element={<SearchResult />} />
        <Route path={"/explore/:mediaType"} element={<Explore />} />
        <Route path={"/movie/:id"} element={<Details />} />
        <Route path={"/tv/:id"} element={<Details />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
