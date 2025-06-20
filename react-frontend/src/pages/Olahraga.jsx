import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/News.css";

const Olahraga = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/news?page=olahraga"
                );
                setNews(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("Gagal memuat berita");
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="news-container-grid">
            <h1>Berita Olahraga</h1>
            <div className="news-grid">
                {news.map((item) => (
                    <Link
                        to={`/berita/${item.id}`}
                        className="news-card"
                        key={item.id}
                    >
                        <img
                           src={
                               item.thumbnail
                                   ? `http://localhost:8000/storage/${item.thumbnail}`
                                   : item.image
                                   ? `http://localhost:8000/storage/${item.image}`
                                   : item.thumbnail_url
                                   ? item.thumbnail_url
                                   : "/images/no-image.svg"
                                }
                            alt={item.title}
                            className="news-thumbnail"
                            onError={(e) => {
                                e.target.src = "/images/no-image.svg";
                                e.target.onerror = null;
                            }}
                        />
                        <div className="news-info">
                            <h2>{item.title}</h2>
                            {item.category && (
                                <span className="news-category">
                                    #{item.category.name}
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Olahraga;
