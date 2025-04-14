import React, { useState } from "react";
import { useSelector } from "react-redux";

// styles
import "./style.scss"

const Genre = ({ genreId }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <div className="genres">
      {
        genreId?.map((id) => {
          if (!genres[id]) return;
          return <div key={id} className="genre">{genres[id]}</div>;
        })
      }
    </div>
  );
};

export default Genre;
