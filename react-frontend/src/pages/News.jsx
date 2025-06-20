import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/news.css";

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/news"
                );
                setNews(response.data);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("Gagal memuat berita");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="news-container-grid">
            <h1>Semua Berita</h1>
            <div className="news-grid">
                {news.map((item) => (
                    <Link
                        to={`/berita/${item.id}`}
                        className="news-card"
                        key={item.id}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <img
                            src={
                                item.thumbnail
                                    ? `http://localhost:8000/storage/${item.thumbnail}`
                                    : item.image
                                    ? `http://localhost:8000/storage/${item.image}`
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
                            <span className="news-category"></span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default News;
