// https://api.themoviedb.org/3
import axios from 'axios'


// API's BAse url & token - storing in const variables
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

// defining general Header obj for FETCH (axios)
const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
}

export async function fetchDataFromAPI(url, params) {
    try {

        // passing "url" & "axios configuration" to the axios.get()
        // after that destructuring the object {data}
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        }); // passing params as empty obj

        return data;

    } catch (err) {
        console.log(err);
        return err;
    }
} 