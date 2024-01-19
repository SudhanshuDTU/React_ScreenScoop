import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImg/Img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../playIcon/PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup"

const DetailsBanner = ({ video, crew }) => {

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const [show, setshow] = useState(false);
    const [videoId,setvideoId] = useState(null);

    const director = crew?.filter((f)=> f.job === "Director");
    const writer = crew?.filter((f)=> f.job === "Screenplay" || "Story" || "Writer" );

    const {mediaType,id} = useParams()
    const {data,loading} = useFetch(`/${mediaType}/${id}`);
    const {url} = useSelector((state)=>state.home);

    const _genres = data?.genres?.map((g)=> g.id);


    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                {!!data &&(
                    <React.Fragment>
                        <div>
                    <div className="backdrop-img">
                        <Img src={url.backdrop + data?.backdrop_path}/>
                    </div>
                    <div className="opacity-layer"></div>
                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                                {data.poster_path ? (
                                    <Img className= "posterImg" src={url.backdrop+data.poster_path}/>
                                ): (
                                    <Img className= "posterImg" src={PosterFallback}/>
                                )}
                            </div>
                            <div className="right">
                                <div className="title">{`${data.title || data.name} - ${dayjs(data?.release_date).format("YYYY")}`}</div>
                                <div className="subtitle">{data.tagline}</div>
                                <Genres data={_genres}/>

                                <div className="row">
                                    <CircleRating rating={data.vote_average.toFixed(1)}/>
                                    <div className="playbtn" onClick={()=>{
                                        setshow(true);
                                        setvideoId(video.key);
                                    }}>
                                        <PlayIcon/>
                                        <span className="text">Watch Trailer</span></div>
                                </div>

                                <div className="overview">
                                    <div className="heading">OverView</div>
                                    <div className="description">{data.overview}</div>
                                </div>

                                <div className="info">
                                    {data.status && (
                                        <div className="infoItem"><span className="text bold">Status : {" "}</span> <span className="text">{data.status}</span></div>
                                    )}
                                    
                                    {data.release_date && (
                                        <div className="infoItem"><span className="text bold">Release Date : {" "}</span> <span className="text">{dayjs(data.release_date).format('DD/MM/YYYY')}</span></div>
                                    )}
                                    {data.runtime && (
                                        <div className="infoItem"><span className="text bold">Runtime : {" "}</span> <span className="text">{toHoursAndMinutes(data.runtime)}</span></div>
                                    )}
                                </div>
                                
                                {director?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">Director : {" "}</span>
                                        <span className="text">{director?.map((d,index)=> (
                                            <span key={index}> 
                                             {d.name} {director.length - 1 !== index && ", "}
                                            </span>
                                        ))}</span>
                                    </div>
                                ) }

                                {writer?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">Writer:{" "}</span>
                                        <span className="text">{writer?.map((w,index)=> (
                                            <span key={index}> 
                                             {w.name} {writer.length - 1 !== index && ", "}
                                            </span>
                                        ))}</span>
                                    </div>
                                ) }

                                {data?.created_by?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">Creator:{" "}</span>
                                        <span className="text">{data?.created_by?.map((c,index)=> (
                                            <span key={index}> 
                                             {c.name} {data?.created_by.length - 1 !== index && ", "}
                                            </span>
                                        ))}</span>
                                    </div>
                                ) }



                            </div>
                        </div>
                    </ContentWrapper>
                    <VideoPopup show={show} setShow={setshow} videoId={videoId} setVideoId={setvideoId}/>
                </div>
                    </React.Fragment>
                )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};
export default DetailsBanner;