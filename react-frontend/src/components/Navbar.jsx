import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header className="site-header">
            <div className="top-header">
                <div className="container">
                    <Link to="/" className="logo">
                        seruhipipo.com
                    </Link>
                    <form className="search-form" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="mencari berita tentang apa ?"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                        <button type="button" className="filter-btn">
                            filter
                        </button>
                        <button type="submit" className="search-btn">
                            CARI
                        </button>
                    </form>
                </div>
            </div>

            <nav className="main-nav">
                <div className="container">
                    <ul className="nav-links">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                HOME
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/news"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                NEWS
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/olahraga"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                OLAHRAGA
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/terkini"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                TERKINI
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/lifestyle"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                LIFESTYLE
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/business"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                BUSINESS
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
