import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./App.css";

axios.defaults.baseURL = "http://127.0.0.1:8000";
const baseURL = "http://127.0.0.1:8000/storage/";

function App() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/berita").then((res) => {
      setBerita(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Home berita={berita} baseURL={baseURL} />
      <Footer />
    </>
  );
}

export default App;
