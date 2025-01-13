// Third party imports
import {useSelector, useDispatch} from 'react-redux'

import { useEffect } from 'react'
import { fetchDataFromAPI } from "./utils/api"


// redux-actions homeSLice
import {getApiConfiguration, getGenres} from './store/homeSlice'


function App() {
	const { url } = useSelector(state => state.home);
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

	return <div className="App">Hello, Musa
	{url?.total_pages}
	</div>;
}

export default App;
