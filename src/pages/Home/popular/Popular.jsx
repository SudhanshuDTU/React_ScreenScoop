import React, { useEffect, useState } from 'react'
import useFetch from "../../../hooks/useFetch"
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import Carousel from '../../../components/carousel/Carousel';

function Popular() {
  const [endpoint,setEndpoint] = useState("movie");
  const {data,loading} = useFetch(`/${endpoint}/popular`);

useEffect(()=>{},[])

const onTabChange = (tab)=>{
setEndpoint(tab === "Movies" ? "movie" : "tv");
}
  return (
    
      <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">What's Popular</span>
            <SwitchTabs data={["Movies","Tv Shows"]} onTabChange = {onTabChange}/>
        </ContentWrapper>
        <Carousel data = {data?.results} loading = {loading} />
      </div>
   
  )
}

export default Popular