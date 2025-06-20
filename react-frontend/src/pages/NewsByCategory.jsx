import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/news.css";

const NewsByCategory = () => {
    const { categorySlug } = useParams();
    const [news, setNews] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch category info dan berita secara parallel
                const [newsRes, categoryRes] = await Promise.all([
                    axios.get(
                        `http://localhost:8000/api/news?category=${categorySlug}`
                    ),
                    axios.get(
                        `http://localhost:8000/api/news-categories/${categorySlug}`
                    ),
                ]);

                setNews(newsRes.data);
                setCategory(categoryRes.data);
                setLoading(false);
            } catch (err) {
                setError("Gagal memuat berita");
                setLoading(false);
            }
        };

        fetchData();
    }, [categorySlug]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="news-container-grid">
            <h2>
                {category
                    ? `Berita ${category.title}`
                    : `Berita #${categorySlug}`}
            </h2>
            {news.length === 0 ? (
                <div className="no-results">
                    Belum ada berita dalam kategori ini
                </div>
            ) : (
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
                                <h3>{item.title}</h3>
                                {item.category && (
                                    <span className="news-category">
                                        #{item.category.name}
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewsByCategory;
