import React from 'react'

import Carousel from '../../../components/carousel/Carousel'
import useFetch from '../../../hooks/useFetch'

const Recommendation = ({ mediaType, id }) => {
    
    const { data, loading, error } = useFetch(`/${mediaType}/${id}/recommendations`);

    const title = "Recommendations"

  return (
      <Carousel
          title={title}
          data={data?.results}
          loading={loading}
          endpoint={mediaType}
    
      />
  )
}

export default Recommendation