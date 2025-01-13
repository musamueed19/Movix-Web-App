import { createSlice } from "@reduxjs/toolkit";


export const homeSlice = createSlice({
  name: "home",
    initialState: {
    //   All the images, files, posters PATHS - used in the homePage
        url: {},
        // bcz in movies "categories" are named as "genres" - these have some ids or information, which will be stored here.
        // we will save all the data called from the "Genres API".
        // Then we will never call the API of genres again (in throughout the Application)
        genres: {},
  },
    reducers: {

        // In defining "reducrers" - basically these are the function which are taking 2 params
        // 1) "State" is same as we have defined above - the initial States
        // 2) and "Action" are those which we passed them - when we call these "reducer functions"
        getApiConfiguration: (state, action) => {
            // "state" is same as our "initialStates"
            // "action" is the payload which we passed when we called this function
            // "Here we are updating in our state the - url (object)"

            // When we get "data" from the "Configuration API" - this will be passed as "action"  in the "getApiConfiguration" function, and in action we have value in the "payload" - which we will use to update our "url" object

            state.url = action.payload;
        },
        getGenres: (state, action) => {
            state.genres = action.payload;

        }

  },
});

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
