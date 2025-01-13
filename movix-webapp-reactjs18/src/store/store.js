import { configureStore } from "@reduxjs/toolkit";

import homeSlice from './homeSlice'

export const store = configureStore({
    reducer: {
      home: homeSlice,
  },
});


// If we want to create a slice for each page.
// We can create a separate file for each page and import them here.
// For example, we can create a file called 'homeSlice.js' and import it here.

// Matlab, Home page se related all Gloabl states, will be in one object.

// Movies, TV Shows, & Search - in each object