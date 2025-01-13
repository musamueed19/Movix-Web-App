// Third party imports
import {useSelector, useDispatch} from 'react-redux'

import { useEffect, useState } from 'react'

// importing BrowserRouter from react-router-dom
import {BrowserRouter, Routes, Route} from "react-router-dom"

import { fetchDataFromAPI } from "./utils/api"


// redux-actions homeSLice
import { getApiConfiguration, getGenres } from './store/homeSlice'

// importing our (components & pages)
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import Details from "./pages/details/Details"
import SearchResult from "./pages/searchresult/SearchResult"
import NotFound from "./pages/404/NotFound"
import Explore from "./pages/explore/Explore"


function App() {
	const { url, genres } = useSelector(state => state.home);
	const dispatch = useDispatch();

	// Testing my api, fetcher function
	function apiTesting() {
		fetchDataFromAPI('/movie/popular')
			.then(res => {
				console.log(res);
				dispatch(getApiConfiguration(res));
		})
	}


	// calling my defined function in useEffect
	useEffect(() => {
		apiTesting();
	}, [])

	return (
		// This BrowserRouter acts as a wrapper for our App.jsx - all Routes will nested inside this
		<BrowserRouter>
			
			{/* All the routes will be defined here */}
			<Routes>
				<Route path={"/"} element={<Home />} />
				<Route path={"/:mediaType/:id"} element={<Details />} />
				<Route path={"/search/:query"} element={<SearchResult />} />
				<Route path={"/explore/:mediaType"} element={<Explore />} />
				<Route  path={"*"} element={<NotFound />} />
		</Routes>
		</BrowserRouter>
	);
}

export default App;
