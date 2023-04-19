import HeaderComponent from "../components/layout/HeaderComponent.jsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import NewsCard from "../components/NewsCard.jsx";

const NewsPage = () => {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    const [news, setNews] = useState([]);
    const {newsCategory} = useParams();
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);

    const initialState = {
        keyword: '',
        category: '',
        source: '',
        date_from: '',
        date_to: ''
    };

    const [searchNews, setSearchNews] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        axios.post(baseUrl + '/search-news', {category: newsCategory})
            .then((response) => {
                setNews(response.data.data.data);
            })
            .catch((error) => {
                console.log(error)
            });
        axios.get(baseUrl + '/dropdowns')
            .then((response) => {
                setCategories(response.data.data.categories);
                setSources(response.data.data.sources);
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        setSearchNews((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = (event) => {
      event.preventDefault();
        axios.post(baseUrl + '/search-news', searchNews)
            .then((response) => {
                setNews(response.data.data.data);
            })
            .catch((error) => {
                console.log(error.response.status)
                if(error.response.status === 404) {
                    setNews([]);
                    setErrorMessage(error.response.data.message)
                }
            });
    }
    return (
        <div className={'container mt-5'}>
            <HeaderComponent/>
            <form onSubmit={handleSubmit}>
                <div className={'row'}>
                    <div className={'col-md-8'}>
                        <div className="mb-3">
                            <input className="form-control form-control-lg"
                                   type="text"
                                   name={'keyword'}
                                   placeholder="Keyword"
                                   value={searchNews.keyword}
                                   onChange={handleChange}
                                   aria-label=".form-control-lg example"/>
                        </div>
                    </div>
                    <div className={'col-md-4'}>
                        <div className="mb-3">
                            <select defaultValue={''}
                                className="form-select form-select-lg mb-3"
                                    value={searchNews.category}
                                    name={'category'}
                                    onChange={handleChange}
                                    aria-label=".form-select-lg example">
                                <option>Select - Categories</option>
                                {Object.entries(categories).map((category, index) => (
                                    <option value={categories[index]} key={index}>{categories[index]}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={'col-md-3'}>
                        <div className="mb-3">
                            <select defaultValue={''}
                                    className="form-select form-select-lg mb-3"
                                    name={'source'}
                                    value={searchNews.source}
                                    onChange={handleChange}
                                    aria-label=".form-select-lg example">
                                <option>Select - Source</option>
                                {Object.entries(sources).map((source, index) => (
                                    <option value={sources[index]} key={index}>{sources[index]}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={'col-md-7'}>
                        <div className="input-group mb-3">
                            <input type="date"
                                   className="form-control form-control-lg"
                                   placeholder="Date from"
                                   name={'date_from'}
                                   value={searchNews.date_from}
                                   onChange={handleChange}
                                   aria-describedby="basic-addon1"/>
                            <input type="date"
                                   className="form-control form-control-lg"
                                   placeholder="Date To"
                                   name={'date_to'}
                                   value={searchNews.date_to}
                                   onChange={handleChange}
                                   aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div className={'col-md-2'}>
                        <button type="submit" className="btn btn-dark btn-lg">Search</button>
                    </div>
                </div>
            </form>

            <div className={'row'}>
                {Object.entries(news).map((news, index) => (
                    <div className={'col-md-4 col-sm-12'} key={index}>
                        <NewsCard news={news[1]}/>
                    </div>
                ))}
                {news.length === 0 ? (
                    <div className="alert alert-secondary" role="alert">
                        {errorMessage}
                    </div>
                ) : ''}
            </div>
        </div>
    );
}
export default NewsPage