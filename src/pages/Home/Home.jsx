
import React from 'react'
import "./style.scss"
import HeroBanner from "../Home/HeroBanner/HeroBanner"
import Trending from './trending/Trending'
import Popular from "./popular/Popular"
import TopRated from './topRated/TopRated'

function Home() {
  return (
    <>
    <div className='homePage'>
    <HeroBanner/>
    <div className='me'>
      <a href="https://github.com/SudhanshuDTU" target='_blank' className='me1'> <span className='me2'>Created By - Sudhanshu Jha</span></a>
    </div>
    
    <Trending/>
    <Popular/>
    <TopRated/>
    
    </div>
    
    </>
  )
}

export default Home