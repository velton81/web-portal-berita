import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "../styles/News.css";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
    const query = useQuery();
    const q = query.get("q");
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const searchNews = async () => {
            if (!q) return;

            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(
                    `http://localhost:8000/api/news/search?q=${encodeURIComponent(
                        q
                    )}`
                );
                setNews(response.data);
            } catch (err) {
                console.error("Search error:", err);
                setError("Gagal mencari berita. Silakan coba lagi.");
            } finally {
                setLoading(false);
            }
        };

        searchNews();
    }, [q]);

    if (!q)
        return <div className="no-query">Masukkan kata kunci pencarian</div>;
    if (loading) return <div className="loading">Mencari berita...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="news-container-grid">
            <h2>Hasil pencarian: {q}</h2>
            {news.length === 0 ? (
                <div className="no-results">
                    Tidak ada berita yang sesuai dengan kata kunci "{q}"
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

export default SearchPage;
