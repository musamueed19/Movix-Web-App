import React, { useState } from "react";
import { useSelector } from "react-redux";

// styles
import "./style.scss"

const Genre = ({ genreIds }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <div className="genres">
      {
        genreIds?.map((id) => {
          if (!genres[id]) return;
          return <div key={id} className="genre">{genres[id]}</div>;
        })
      }
    </div>
  );
};

export default Genre;
