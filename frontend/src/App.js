import React from "react";

const LOGO = "/logo.png";

const GALLERY_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70" },
  { id: 2, src: "https://images.unsplash.com/photo-1517841905240-472988babdf9" },
  { id: 3, src: "https://images.unsplash.com/photo-1493238792000-8113da705763" },
  { id: 4, src: "https://images.unsplash.com/photo-1518655048521-f130df041f66" }
];

const linkStyle = {
  margin: "0 10px",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold"
};

const iconStyle = {
  margin: "0 5px",
  color: "#fff"
};

export default function App() {
  return (
    <div style={{ background: "#111", color: "#fff", fontFamily: "Arial" }}>

      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px",
        background: "#000"
      }}>
        <img src={LOGO} alt="logo" style={{ height: "50px" }} />

        <div>
          <a href="#" style={linkStyle}>ACCUEIL</a>
          <a href="#" style={linkStyle}>LE CLUB</a>
          <a href="#" style={linkStyle}>ÉVÉNEMENTS</a>
          <a href="#" style={linkStyle}>GALERIE</a>
          <a href="#" style={linkStyle}>CONTACT</a>
        </div>

        <div>
          <a href="https://facebook.com" target="_blank" style={iconStyle}>FB</a>
          <a href="https://instagram.com" target="_blank" style={iconStyle}>IG</a>
          <a href="https://www.youtube.com/@gaulsbastardscrew" target="_blank" style={iconStyle}>YT</a>
          <a href="https://tiktok.com" target="_blank" style={iconStyle}>TT</a>
        </div>
      </nav>

      <section style={{
        textAlign: "center",
        padding: "80px 20px"
      }}>
        <img src={LOGO} alt="logo" style={{ height: "120px", marginBottom: "20px" }} />

        <h1 style={{
          fontSize: "80px",
          fontFamily: "Georgia, serif",
          margin: "20px 0"
        }}>
          GAULS BASTARDS
        </h1>

        <h2 style={{ color: "#ff3c00", letterSpacing: "4px" }}>
          RIDE CUSTOM
        </h2>

        <p style={{ marginTop: "20px" }}>
          Une moto, une route, des amis, un club pour nous unir, une passion pour nous rassembler
        </p>
      </section>

      <section style={{ padding: "40px", textAlign: "center" }}>
        <h2>CLUB MOTO À MARSEILLE</h2>
        <p>
          GAULS BASTARDS est un club moto basé à Marseille, actif dans tout le département des Bouches-du-Rhône.
        </p>

        <h2>ASSOCIATION DE MOTARDS</h2>
        <p>
          Nous organisons des balades, événements et rassemblements de motards dans toute la région.
        </p>
      </section>

      <section style={{ textAlign: "center", padding: "50px" }}>
        <h2>NOTRE CHAÎNE YOUTUBE</h2>

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed?listType=user_uploads&list=gaulsbastardscrew"
          title="YouTube"
          frameBorder="0"
          allowFullScreen
          style={{ borderRadius: "10px", maxWidth: "100%" }}
        ></iframe>
      </section>

      <section style={{ padding: "40px" }}>
        <h2 style={{ textAlign: "center" }}>GALERIE</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px"
        }}>
          {GALLERY_IMAGES.map((img) => (
            <img key={img.id} src={img.src} alt="" style={{ width: "100%" }} />
          ))}
        </div>
      </section>

    </div>
  );
}
