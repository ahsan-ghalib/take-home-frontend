import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import NewsFeedsPage from "./pages/NewsFeedsPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/news/:newsCategory" element={<NewsPage />}/>
          <Route path="/news-feeds" element={<NewsFeedsPage />}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
