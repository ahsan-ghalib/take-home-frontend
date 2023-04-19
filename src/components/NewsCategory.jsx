import newsImage from "../assets/news-image.svg";
import React, {useState} from "react";
import NewsCard from "./NewsCard.jsx";
import {Link} from "react-router-dom";

const NewsCategory = (props) => {
    const news = props?.news ?? [];
    return (
        <section>
            <div className={'container'}>
                {Object.keys(news).map((key, index) => (
                    <>
                        <div className={'row mb-5'} key={index}>
                            <div className={'col-12'}>
                                <div id={key}>
                                    <h1 className={'display-1'}><strong>{key}</strong></h1>
                                </div>
                            </div>
                            {Object.entries(news[key]).map((news, index) => (
                                <>
                                    {index === 0 ? (
                                        <>
                                            <div className={'col-md-6 col-sm-12 mb-5'}>
                                                <div className={'d-flex fw-bold fs-3 mb-4'}>
                                                    {news[1].author} - {news[1].published_at}
                                                </div>
                                                <div className={'d-flex fw-bold fs-1'}>
                                                    {news[1].title}
                                                </div>
                                            </div>
                                            <div className={'col-md-6 col-sm-12 mb-5'}>
                                                <img src={newsImage} style={{width: '620px'}} alt={'first image'}/>
                                            </div>
                                        </>
                                    ) : (
                                        <div className={'col-md-4'}>
                                            <NewsCard news={news[1]}/>
                                        </div>
                                    )}

                                </>
                            ))}
                        </div>
                        <div className={'row my-5 justify-content-center'}>
                            <div className={'col-4 text-center'}>
                                <Link className={'fw-bold fs-2 text-dark'} to={'news/' + key} >
                                    View More
                                </Link>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </section>
    );
}
export default NewsCategory;