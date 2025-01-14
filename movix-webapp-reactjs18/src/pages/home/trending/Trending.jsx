import {useState} from "react"

// import custom comps
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTabs from "../../../components/switchTabs/SwitchTabs"
import Carousel from "../../../components/carousel/Carousel";

// custom hooks
import useFetch from '../../../hooks/useFetch'

const Trending = () => {

    // state for Api call - storing Time Window for Filter - Day or week
    const [endpoint, setEndpoint] = useState("day");

    const {data, loading} = useFetch('/trending/all/'+endpoint)

    // filter tabs - handler
    function onTabChange(tab) {
        setEndpoint(tab.toLowerCase());
    }

  return (
      <div className="carouselSection">
          <ContentWrapper>
              <span className="carouselTitle">
                  Trending
              </span>
              <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
          </ContentWrapper>
          <Carousel data={data?.results} loading={loading}   />
    </div>
  )
}

export default Trending