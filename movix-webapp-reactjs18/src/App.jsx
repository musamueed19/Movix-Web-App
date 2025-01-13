import {useEffect} from 'react'
import { fetchDataFromAPI } from "./utils/api"

function App() {

	// Testing my api, fetcher function
	function apiTesting() {
		fetchDataFromAPI('/movie/popular')
			.then(res => {
				console.log(res);
		})
	}


	// calling my defined function in useEffect
	useEffect(() => {
		apiTesting();
	}, [])

  return <div className="App">Hello, Musa</div>;
}

export default App;
