// imports
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

const CircularRating = ({ rating }) => {
  const maxRate = 10;

  return (
    <div className="circleRating">
      <CircularProgressbar
        value={rating}
        maxValue={maxRate}
        text={rating}
        styles={buildStyles({
          pathColor: rating < maxRate * 50 / 100 ? "red" : rating < maxRate * 70 / 100 ? "orange" : "green",
        })}
      />
    </div>
  );
};

export default CircularRating;
