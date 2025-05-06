import React from "react";
import Sidebar from "../components/Sidebar";
import BeritaList from "../components/BeritaList";

const Home = ({ berita, baseURL }) => (
  <div className="home-layout">
    <Sidebar />
    <BeritaList berita={berita} baseURL={baseURL} />
  </div>
);

export default Home;
