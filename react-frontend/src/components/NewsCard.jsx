import React from "react";
import { Link } from "react-router-dom";
import "../styles/NewsCard.css";

const NewsCard = ({ news }) => {
    const getImageUrl = (thumbnail) => {
        if (!thumbnail) return "/images/no-image.svg";
        if (thumbnail.startsWith("http")) return thumbnail;
        return `http://localhost:8000/storage/${thumbnail}`;
    };

    // Tentukan status
    const statusLabel =
        news.is_verified === true || news.status === "benar"
            ? "BENAR"
            : news.is_verified === false || news.status === "hoaks"
            ? "HOAKS"
            : "";

    return (
        <Link to={`/berita/${news.id}`} className="news-card">
            <div className="image-container">
                <img
                    src={getImageUrl(news.thumbnail)}
                    alt={news.title}
                    className="news-image"
                    onError={(e) => {
                        e.target.src = "/images/no-image.svg";
                        e.target.onerror = null;
                    }}
                />
                {statusLabel && (
                    <span
                        className={`badge-status ${statusLabel.toLowerCase()}`}
                    >
                        {statusLabel}
                    </span>
                )}
            </div>
            <div className="news-content">
                <h3 className="news-title">{news.title}</h3>
                <div className="news-meta">
                    <span>Penulis: {news.author?.name || "Admin"}</span>
                    <span className="dot">•</span>
                    <span>
                        {new Date(news.created_at).toLocaleDateString("id-ID")}
                    </span>
                </div>
                <p className="news-excerpt">
                    {news.content?.replace(/<[^>]+>/g, "").substring(0, 100)}...
                </p>
            </div>
        </Link>
    );
};

export default NewsCard;
