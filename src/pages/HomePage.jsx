import React, {useEffect, useState} from 'react';

import HeaderComponent from '../components/layout/HeaderComponent'
import NewsCategoryNavigation from "../components/NewsCategoryNavigation.jsx";
import NewsCategory from "../components/NewsCategory.jsx";
import axios from "axios";

const HomePage = () => {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    const [news, setNews] = useState();
    const [newsCategories, setNewsCategories] = useState();

    useEffect( () => {
        axios.get(baseUrl + '/news')
            .then((response) => {
                setNews(response.data.data.news);
                setNewsCategories(response.data.data.news_categories);
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);
    return (
        <div className={'container mt-5'}>
            <HeaderComponent/>
            <NewsCategoryNavigation categories={newsCategories}/>
            <NewsCategory news={news}/>
        </div>

    );
}

export default HomePage;