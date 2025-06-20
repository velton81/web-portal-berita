import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const Home = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [banners, setBanners] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch semua data secara parallel
                const [newsRes, bannersRes, categoriesRes] = await Promise.all([
                    axios.get("http://localhost:8000/api/news"),
                    axios.get("http://localhost:8000/api/banner"),
                    axios.get("http://localhost:8000/api/news-categories"),
                ]);

                setNews(newsRes.data);
                setBanners(bannersRes.data);
                setCategories(categoriesRes.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Gagal memuat data");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <>
            <div className="berita-header">
                <div className="container">
                    <h2>BERITA TERKINI</h2>
                </div>
            </div>
            <div className="home-page">
                <div className="container">
                    {/* Banner Section */}
                    {banners && banners.length > 0 && (
                        <div className="banner-slider">
                            <Swiper
                                modules={[Pagination, Autoplay]}
                                pagination={{ clickable: true }}
                                autoplay={{
                                    delay: 3500,
                                    disableOnInteraction: false,
                                }}
                                loop={true}
                                style={{ borderRadius: "18px" }}
                            >
                                {banners.map((banner, index) => (
                                    <SwiperSlide key={index}>
                                        <Link to={`/berita/${banner.news_id}`}>
                                            <img
                                                src={
                                                    banner.image
                                                        ? `http://localhost:8000/storage/${banner.image}`
                                                        : "/images/no-image.svg"
                                                }
                                                alt={banner.title || "Banner"}
                                                className="banner-image"
                                                onError={(e) => {
                                                    e.target.src =
                                                        "/images/no-image.svg";
                                                    e.target.onerror = null;
                                                }}
                                            />
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}

                    <div className="content-grid">
                        {/* Sidebar Categories */}
                        <aside className="sidebar">
                            <div className="popular-topics">
                                <h3>KATEGORI BERITA</h3>
                                <ul className="topic-list">
                                    {categories.map((cat) => (
                                        <li key={cat.id}>
                                            <Link to={`/category/${cat.slug}`}>
                                                #{cat.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>

                        {/* News Grid Section */}
                        <section className="news-section">
                            <div className="news-grid">
                                {Array.isArray(news) && news.length > 0 ? (
                                    news.map((item) => (
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
                                                    e.target.src =
                                                        "/images/no-image.svg";
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
                                    ))
                                ) : (
                                    <p className="no-news">Tidak ada berita</p>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
