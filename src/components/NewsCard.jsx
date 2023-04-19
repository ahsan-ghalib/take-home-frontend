import newsImage from "../assets/news-image.png";
import React from "react";

const NewsCard = (prop) => {
    return (
        <div className={'news-card'}>
            <div className={'news-card-image'} style={{
                backgroundImage: "url(" + newsImage + ")", backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
            </div>
            <div className={'d-flex fw-bold fs-4 mb-41'}>
                {prop.news.author} - {prop.news.published_at}
            </div>
            <div className={'d-flex fw-bold fs-2'}>
                {prop.news.title.split(' ').slice(0, 20).join(' ')}...
            </div>
        </div>
    );
}

export default NewsCard;