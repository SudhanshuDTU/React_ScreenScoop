import { useState,useEffect } from 'react'
import './App.css'
import { fetchDataFromApi } from './utils/api';
import { useSelector,useDispatch } from 'react-redux';
import { getApiConfiguration,getGenres } from './store/homeSlice';

import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from './pages/Home/Home';
import Details from "./pages/Details/Details"
import SearchResult from "./pages/SearchResult/SearchResult"
import Explore from "./pages/Explore/Explore"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import PageNotFound from './pages/404/PageNotFound';


function App() {

  const dispatch = useDispatch();
  const {url} = useSelector((state)=> state.home);
  console.log(url);
  
  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[]);
  const fetchApiConfig = ()=>{
    fetchDataFromApi("/configuration").then((response)=>{
      console.log(response);
      const imgurl = {
        backdrop : response.images.secure_base_url + "original",
        poster : response.images.secure_base_url + "original",
        profile : response.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(imgurl));
    } );
  }
  const genresCall = async ()=>{
      let promises = [];
      let endpoint = ["tv","movie"]
      let allGenres = {}
      endpoint.forEach((item) => {
        promises.push(fetchDataFromApi(`/genre/${item}/list`)) 
      });

      const data = await Promise.all(promises);
      data.map(({genres})=>{
        return genres.map((item)=> (allGenres[item.id] = item));
      });
      dispatch(getGenres(allGenres));
  }



  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/:mediaType/:id' element = {<Details/>}/>
      <Route path='/search/:query' element = {<SearchResult/>}/>
      <Route path='/explore/:mediaType' element = {<Explore/>}/>
      <Route path='*' element = {<PageNotFound/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
