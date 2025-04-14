import React from "react";

const Genre = ({ genreId }) => {
    console.log(genreId.join(","))
  return <div className="genreContainer">{genreId.join(",")}</div>;
};

export default Genre;
