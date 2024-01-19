import React, { useEffect, useState } from 'react'
import "./style.scss"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import Img from "../../../components/lazyLoadImg/Img" 
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"

function HeroBanner() {
 
const [background, setbackground] = useState('');
const [query, setquery] = useState('');
const navigate = useNavigate();

const {url} = useSelector((state)=> state.home);

const {data,loading} = useFetch("/movie/upcoming");

useEffect(()=>{
  const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)].backdrop_path; 
  setbackground(bg);
},[data])

const searchQueryHandler = (e)=>{
    if(e.key === "Enter" && query.length > 0){
           navigate(`/search/${query}`);
    }
}


  return (
    <div className='heroBanner'>
      {!loading && (<div className="backdrop-img">
       <Img src={background} className="lazy-load-image-background" />
      </div> )}
      

      <div className="opacity-layer"></div>
     <ContentWrapper>
     
         <div className='heroBannerContent'>
            <span className='title'>Welcome </span>
            <span className='subTitle'>Millions of Movies,Tv shows and people to discover. Explore Now</span>
            <div className="searchInput">
               <input type="text" onKeyUp={searchQueryHandler} onChange={(e)=> setquery(e.target.value)} placeholder='Search for Movies or Tv shows ..' />
               <button>Search</button>
            </div>
         </div>
      

     </ContentWrapper>    
    </div>
  )
}

export default HeroBanner