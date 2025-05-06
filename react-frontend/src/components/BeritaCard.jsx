import React from "react";

const BeritaCard = ({ berita, baseURL }) => (
  <div className="berita-card">
    <img src={baseURL + berita.thumbnail} alt={berita.title} />
    <div className="berita-info">
      <p className="berita-title">{berita.title}</p>
      <p className="berita-desc">
        {berita.content.replace(/<[^>]+>/g, "").slice(0, 80)}...
      </p>
    </div>
  </div>
);

export default BeritaCard;
