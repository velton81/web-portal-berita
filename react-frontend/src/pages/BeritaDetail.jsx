import React from "react";
import { useParams } from "react-router-dom";

const BeritaDetail = ({ berita, baseURL }) => {
  const { id } = useParams();
  const item = berita.find((b) => b.id === parseInt(id));

  if (!item) return <p>Berita tidak ditemukan</p>;

  return (
    <div>
      <h2>{item.title}</h2>
      <img
        src={`${baseURL}${item.thumbnail}`}
        alt={item.title}
        style={{ width: "100%", maxWidth: "300px", marginBottom: "10px" }}
      />
      <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
      <small>
        Dipublikasi: {new Date(item.created_at).toLocaleDateString()}
      </small>
    </div>
  );
};

export default BeritaDetail;