import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import axios from "axios";
import "./NewsSection.css";

const NewsSection = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "http://localhost:8000/api/berita"
                );
                setNewsItems(response.data);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <div className="loading">Memuat berita...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="news-section">
            <h2>BERITA LAINYA</h2>
            <div className="news-grid">
                {newsItems.map((item) => (
                    <NewsCard
                        key={item.id}
                        id={item.id}
                        image={item.thumbnail}
                        title={item.judul}
                        preview={item.konten?.substring(0, 100) + "..."}
                    />
                ))}
            </div>
        </div>
    );
};

export default NewsSection;
