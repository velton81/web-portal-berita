import React from "react";

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">seruhipipo.com</div>
    <input
      className="search"
      type="text"
      placeholder="mencari berita tentang apa ?"
    />
    <button className="filter">filter ⬇</button>
    <button className="search-btn">CARI</button>
    <div className="menu">
      <button className="active">HOME</button>
      <button>NEWS</button>
      <button>olahraga</button>
      <button>Terkini</button>
      <button>LIFESTYLE</button>
      <button>BUSINESS</button>
    </div>
  </nav>
);

export default Navbar;
