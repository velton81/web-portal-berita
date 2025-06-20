import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BeritaDetail from "./pages/BeritaDetail";
import SearchPage from "./pages/SearchPage";
import News from "./pages/News";
import Terkini from "./pages/Terkini";
import Business from "./pages/Business";
import Lifestyle from "./pages/Lifestyle";
import Olahraga from "./pages/Olahraga";
import NewsByCategory from "./pages/NewsByCategory";
import "./App.css";

function App() {
    return (
        <div className="App">
            <div className="app-wrapper">
                <Navbar />
                <main className="app-container">
                    <div className="content-wrapper">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/berita/:id"
                                element={<BeritaDetail />}
                            />
                            <Route path="/news" element={<News />} />
                            <Route path="/business" element={<Business />} />
                            <Route path="/lifestyle" element={<Lifestyle />} />
                            <Route path="/olahraga" element={<Olahraga />} />
                            <Route path="/terkini" element={<Terkini />} />
                            <Route path="/search" element={<SearchPage />} />
                            <Route
                                path="/:categorySlug"
                                element={<NewsByCategory />}
                            />
                        </Routes>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
