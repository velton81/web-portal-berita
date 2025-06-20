import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/BeritaDetail.css";

const BeritaDetail = () => {
    const { id } = useParams();
    const [berita, setBerita] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBerita = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/news/${id}`
                );
                setBerita(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBerita();
    }, [id]);

    if (loading)
        return <div className="berita-detail-container">Loading...</div>;
    if (error)
        return <div className="berita-detail-container">Error: {error}</div>;
    if (!berita)
        return (
            <div className="berita-detail-container">
                Berita tidak ditemukan
            </div>
        );

    const tanggal = new Date(berita.created_at).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="berita-detail-container">
            <div className="berita-header">
                <h1 className="berita-title">{berita.title}</h1>
                <div className="berita-meta">
                    <span>Penulis: {berita.author?.name || "Admin"}</span>
                    <span> • </span>
                    <span>{tanggal}</span>
                </div>
            </div>
            {berita.thumbnail || berita.image ? (
                <img
                    src={
                        berita.thumbnail && berita.thumbnail.startsWith("http")
                            ? berita.thumbnail
                            : berita.thumbnail
                            ? `http://localhost:8000/storage/${berita.thumbnail.replace(
                                  "public/",
                                  ""
                              )}`
                            : berita.image && berita.image.startsWith("http")
                            ? berita.image
                            : berita.image
                            ? `http://localhost:8000/storage/${berita.image.replace(
                                  "public/",
                                  ""
                              )}`
                            : "/images/no-image.svg"
                    }
                    alt={berita.title}
                    className="berita-image"
                    onError={(e) => {
                        e.target.src = "/images/no-image.svg";
                        e.target.onerror = null;
                    }}
                />
            ) : (
                <img
                    src="/images/no-image.svg"
                    alt="Gambar Tidak Tersedia"
                    className="berita-image"
                />
            )}
            <div
                className="berita-content"
                dangerouslySetInnerHTML={{ __html: berita.content }}
            />
            {berita.newsCategory && (
                <div className="berita-tags">
                    <span className="berita-tag">
                        #{berita.newsCategory.name}
                    </span>
                </div>
            )}
        </div>
    );
};

export default BeritaDetail;
