import {useRef} from "react"

import "./style.scss"

// import icons
import {
BsFillArrowLeftCircleFill,
BsFillArrowRightCircleFill,
} from "react-icons/bs"

// third party imports
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

// import custom comps
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";


const Carousel = () => {
  return (
    <div>Carousel</div>
  )
}

export default Carousel