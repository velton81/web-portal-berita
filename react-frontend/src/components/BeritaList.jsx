import React from "react";
import BeritaCard from "./BeritaCard";

const BeritaList = ({ berita, baseURL }) => (
  <section className="berita-list">
    <h3>BERITA LAINYA</h3>
    <div className="berita-grid">
      {berita.map((item) => (
        <BeritaCard key={item.id} berita={item} baseURL={baseURL} />
      ))}
    </div>
  </section>
);

export default BeritaList;
