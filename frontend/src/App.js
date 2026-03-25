import React, { useState, useEffect } from "react";
import "@/App.css";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ===== ASSETS =====
const LOGO = "https://customer-assets.emergentagent.com/job_langue-learn-11/artifacts/irtl89ow_1000038881.png";
// Photo noir et blanc au bar - sans logo intégré
const HERO_IMAGE = "https://customer-assets.emergentagent.com/job_langue-learn-11/artifacts/s5a1hur6_1000033522.jpg";
// Photo des dos avec les patchs - parfaite pour la section About
const ABOUT_IMAGE = "https://customer-assets.emergentagent.com/job_langue-learn-11/artifacts/5g0f3xyb_1000036951.jpg";

const GALLERY_IMAGES = [
  { id: 1, src: "https://customer-assets.emergentagent.com/job_langue-learn-11/artifacts/5lse2d11_1000032644.jpg", alt: "GAULS BASTARDS - Le club avec le logo", category: "club" },
  { id: 2, src: "https://customer-assets.emergentagent.com/job_langue-learn-11/artifacts/pzfv1w3g_1000036950.jpg", alt: "GAULS BASTARDS - Rassemblement moto Marseille", category: "rides" },
  { id: 3, src: "https://customer-assets.emergentagent.com/job_langue-learn-11/artifacts/26z17tle_1000039803.jpg", alt: "GAULS BASTARDS - Le groupe au complet", category: "club" },
  { id: 4, src: "https://customer-assets.emergentagent.com/job_langue-learn-11/artifacts/s5a1hur6_1000033522.jpg", alt: "GAULS BASTARDS - Soirée de Noël", category: "events" },
  { id: 5, src: "https://customer-assets.emergentagent.com/job_langue-learn-11/artifacts/1768cv1x_1000036969.jpg", alt: "GAULS BASTARDS - Soirée au bar avec moto", category: "events" },
  { id: 6, src: "https://customer-assets.emergentagent.com/job_langue-learn-11/artifacts/my2b0py7_1000039773.jpg", alt: "GAULS BASTARDS - Membres avec le patch", category: "club" },
  { id: 7, src: "https://customer-assets.emergentagent.com/job_langue-learn-11/artifacts/3ujsh6c1_1000039797.jpg", alt: "GAULS BASTARDS - Fraternité", category: "club" },
  { id: 8, src: "https://customer-assets.emergentagent.com/job_langue-learn-11/artifacts/r6sbdvop_1000038988.jpg", alt: "GAULS BASTARDS - Saint Patrick", category: "events" },
  { id: 9, src: "https://customer-assets.emergentagent.com/job_langue-learn-11/artifacts/pahd3cki_1000030883.jpg", alt: "GAULS BASTARDS - Soirée entre amis", category: "events" },
  { id: 10, src: "https://customer-assets.emergentagent.com/job_langue-learn-11/artifacts/n7fmbdxz_1000036545.jpg", alt: "GAULS BASTARDS - Bras de fer", category: "events" },
  { id: 11, src: "https://customer-assets.emergentagent.com/job_langue-learn-11/artifacts/sapwt1ig_1000039815.jpg", alt: "GAULS BASTARDS - Réunion du club", category: "club" },
  { id: 12, src: "https://customer-assets.emergentagent.com/job_langue-learn-11/artifacts/jbfsqjcs_1000036972.jpg", alt: "GAULS BASTARDS - Terrasse avec les motos", category: "rides" },
  { id: 13, src: "https://customer-assets.emergentagent.com/job_langue-learn-11/artifacts/5g0f3xyb_1000036951.jpg", alt: "GAULS BASTARDS - Les patchs du club", category: "club" },
];

const EVENTS = [
  { id: 1, title: "Balade Côte Bleue", date: "Février 2026", location: "Départ Marseille", description: "Parcours côtier jusqu'à Martigues" },
  { id: 2, title: "Sortie Sainte-Victoire", date: "Mars 2026", location: "Aix-en-Provence", description: "Tour de la montagne Sainte-Victoire" },
  { id: 3, title: "Concentre Annuel", date: "Avril 2026", location: "Cassis", description: "Rassemblement annuel du club" },
  { id: 4, title: "Balade Calanques", date: "Mai 2026", location: "Marseille - Cassis", description: "Route des Crêtes et Calanques" },
];

const VALUES = [
  { icon: "🤝", title: "Fraternité", description: "Une famille de passionnés soudés" },
  { icon: "🏍️", title: "Passion", description: "L'amour du custom avant tout" },
  { icon: "🌊", title: "Liberté", description: "Ni pression, ni prise de tête" },
  { icon: "🔥", title: "Respect", description: "Entre nous et sur la route" },
];

// ===== ICONS (SVG) =====
const Icons = {
  Facebook: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Instagram: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  TikTok: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
    </svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  ),
  Close: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  ChevronDown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  ),
  Calendar: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  Send: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  ),
};

// ===== NAVIGATION =====
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#accueil", label: "Accueil" },
    { href: "#about", label: "Le Club" },
    { href: "#events", label: "Événements" },
    { href: "#gallery", label: "Galerie" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      data-testid="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/95 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#accueil" className="flex items-center gap-3" data-testid="nav-logo">
          <img src={LOGO} alt="GAULS BASTARDS Logo" className="h-12 w-auto" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={`nav-link-${link.href.slice(1)}`}
              className="text-sm font-medium tracking-wider uppercase hover:text-[var(--color-gold)] transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Icons Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://www.facebook.com/GAULSBASTARDS" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors" data-testid="social-facebook">
            <Icons.Facebook />
          </a>
          <a href="https://www.instagram.com/gauls.bastards" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors" data-testid="social-instagram">
            <Icons.Instagram />
          </a>
          <a href="https://www.tiktok.com/@gauls13" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors" data-testid="social-tiktok">
            <Icons.TikTok />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="mobile-menu-button"
        >
          {isMobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-lg border-t border-[var(--color-charcoal)]" data-testid="mobile-menu">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg font-medium tracking-wider uppercase py-2 hover:text-[var(--color-gold)] transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-6 pt-4 border-t border-[var(--color-charcoal)]">
              <a href="https://www.facebook.com/GAULSBASTARDS" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors">
                <Icons.Facebook />
              </a>
              <a href="https://www.instagram.com/gauls.bastards" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors">
                <Icons.Instagram />
              </a>
              <a href="https://www.tiktok.com/@gauls13" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors">
                <Icons.TikTok />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// ===== HERO SECTION =====
const HeroSection = () => {
  return (
    <section id="accueil" data-testid="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="GAULS BASTARDS - Moto Club Custom Marseille"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <img
          src={LOGO}
          alt="GAULS BASTARDS Logo"
          className="w-40 md:w-56 mx-auto mb-8 animate-fade-in"
          data-testid="hero-logo"
        />
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-fade-in-up"
          style={{ fontFamily: "var(--font-display)" }}
          data-testid="hero-title"
        >
          GAULS BASTARDS
        </h1>
        <p
          className="text-xl md:text-2xl text-[var(--color-gold)] tracking-[0.3em] uppercase mb-8 animate-fade-in-up stagger-1"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Ride Custom
        </p>
        <p className="text-lg md:text-xl text-[var(--color-silver)] max-w-2xl mx-auto mb-12 animate-fade-in-up stagger-2">
          Association de motards custom basée à Marseille.<br />
          La passion, le respect et l'esprit libre avant tout.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
          <a href="#about" className="btn-primary btn-gold" data-testid="hero-cta-discover">
            Découvrir le club
            <Icons.ChevronDown />
          </a>
          <a href="#contact" className="btn-primary" data-testid="hero-cta-contact">
            Nous rejoindre
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icons.ChevronDown />
      </div>
    </section>
  );
};

// ===== ABOUT SECTION =====
const AboutSection = () => {
  return (
    <section id="about" data-testid="about-section" className="section section-dark">
      <div className="container mx-auto">
        <div className="section-title">
          <h2 data-testid="about-title">Qui Sommes-Nous</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed">
              <strong className="text-white">GAULS BASTARDS</strong> est une association de motards custom fondée le <strong className="text-[var(--color-gold)]">1er septembre 2025</strong> à Marseille.
            </p>
            <p className="text-lg leading-relaxed">
              Nous rassemblons des passionnés de motos custom — <strong className="text-white">Harley-Davidson, Indian, Shadow</strong> et autres — autour de balades, événements et soirées conviviales dans tout le département des <strong className="text-white">Bouches-du-Rhône (13)</strong>.
            </p>
            <p className="text-lg leading-relaxed">
              Ici, pas de pression ni de prise de tête. Nous accueillons tout le monde : hommes, femmes, et même les 125cc. Ce qui compte, c'est la passion du ride et le respect mutuel.
            </p>
            <blockquote className="border-l-4 border-[var(--color-gold)] pl-6 py-2 italic text-xl text-white">
              "La passion, le respect et l'esprit libre avant tout."
            </blockquote>
          </div>
          <div className="relative">
            <img
              src={ABOUT_IMAGE}
              alt="GAULS BASTARDS - Les patchs du club"
              className="w-full rounded-sm shadow-2xl"
              data-testid="about-image"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[var(--color-gold)] rounded-sm -z-10"></div>
          </div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="values-grid">
          {VALUES.map((value, index) => (
            <div
              key={value.title}
              className="card p-8 text-center"
              data-testid={`value-card-${index}`}
            >
              <span className="text-4xl mb-4 block">{value.icon}</span>
              <h3 className="text-xl mb-2" style={{ fontFamily: "var(--font-heading)" }}>{value.title}</h3>
              <p className="text-[var(--color-gray-light)] text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== EVENTS SECTION =====
const EventsSection = () => {
  return (
    <section id="events" data-testid="events-section" className="section section-darker">
      <div className="container mx-auto">
        <div className="section-title">
          <h2 data-testid="events-title">Événements & Balades</h2>
          <p className="text-[var(--color-gray-light)] mt-4 max-w-2xl mx-auto">
            Retrouvez nos prochaines sorties dans les Bouches-du-Rhône et alentours
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6" data-testid="events-grid">
          {EVENTS.map((event, index) => (
            <div
              key={event.id}
              className="card p-6 flex gap-6"
              data-testid={`event-card-${index}`}
            >
              <div className="flex-shrink-0 w-20 h-20 bg-[var(--color-gold)] flex flex-col items-center justify-center text-black">
                <span className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  {event.date.split(" ")[0].slice(0, 3)}
                </span>
                <span className="text-xs uppercase">{event.date.split(" ")[1]}</span>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl mb-2" style={{ fontFamily: "var(--font-heading)" }}>{event.title}</h3>
                <div className="flex items-center gap-2 text-[var(--color-gray-light)] text-sm mb-2">
                  <Icons.MapPin />
                  <span>{event.location}</span>
                </div>
                <p className="text-[var(--color-silver)] text-sm">{event.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[var(--color-gray-light)] mb-4">
            Suivez-nous sur les réseaux pour ne rien manquer !
          </p>
          <div className="flex justify-center gap-6">
            <a href="https://www.facebook.com/GAULSBASTARDS" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
              <Icons.Facebook />
              Facebook
            </a>
            <a href="https://www.instagram.com/gauls.bastards" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
              <Icons.Instagram />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ===== GALLERY SECTION =====
const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" data-testid="gallery-section" className="section section-dark">
      <div className="container mx-auto">
        <div className="section-title">
          <h2 data-testid="gallery-title">Galerie</h2>
          <p className="text-[var(--color-gray-light)] mt-4 max-w-2xl mx-auto">
            Balades, soirées et moments de fraternité
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" data-testid="gallery-grid">
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(image)}
              data-testid={`gallery-image-${index}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                  Voir
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          data-testid="gallery-lightbox"
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-[var(--color-gold)] transition-colors"
            onClick={() => setSelectedImage(null)}
            data-testid="lightbox-close"
          >
            <Icons.Close />
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-w-full max-h-[85vh] object-contain"
          />
        </div>
      )}
    </section>
  );
};

// ===== CONTACT SECTION =====
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      if (response.data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="section section-darker">
      <div className="container mx-auto max-w-4xl">
        <div className="section-title">
          <h2 data-testid="contact-title">Contactez-Nous</h2>
          <p className="text-[var(--color-gray-light)] mt-4 max-w-2xl mx-auto">
            Une question ? Envie de nous rejoindre ? Écrivez-nous !
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name">Nom / Pseudo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Votre nom ou pseudo"
                data-testid="contact-input-name"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="votre@email.com"
                data-testid="contact-input-email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone">Téléphone (optionnel)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="06 XX XX XX XX"
              data-testid="contact-input-phone"
            />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Parlez-nous de vous, de votre moto, de ce qui vous motive..."
              data-testid="contact-input-message"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary btn-gold"
              data-testid="contact-submit-button"
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer"}
              <Icons.Send />
            </button>
          </div>

          {submitStatus === "success" && (
            <div className="text-center text-green-400 mt-4" data-testid="contact-success">
              Message envoyé avec succès ! Nous vous répondrons bientôt.
            </div>
          )}
          {submitStatus === "error" && (
            <div className="text-center text-red-400 mt-4" data-testid="contact-error">
              Une erreur est survenue. Veuillez réessayer ou nous contacter sur les réseaux sociaux.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

// ===== FOOTER =====
const Footer = () => {
  return (
    <footer className="bg-[var(--color-black)] border-t border-[var(--color-charcoal)] py-12" data-testid="footer">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <img src={LOGO} alt="GAULS BASTARDS" className="h-16" />
            <div>
              <h3 className="text-xl" style={{ fontFamily: "var(--font-display)" }}>GAULS BASTARDS</h3>
              <p className="text-[var(--color-gold)] text-sm tracking-widest" style={{ fontFamily: "var(--font-heading)" }}>RIDE CUSTOM</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://www.facebook.com/GAULSBASTARDS" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors" data-testid="footer-facebook">
              <Icons.Facebook />
            </a>
            <a href="https://www.instagram.com/gauls.bastards" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors" data-testid="footer-instagram">
              <Icons.Instagram />
            </a>
            <a href="https://www.tiktok.com/@gauls13" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gold)] transition-colors" data-testid="footer-tiktok">
              <Icons.TikTok />
            </a>
          </div>
        </div>

        <div className="divider my-8"></div>

        <div className="text-center text-[var(--color-gray)] text-sm space-y-2">
          <p>Club Moto Custom • Marseille • Bouches-du-Rhône (13) • Aix-en-Provence • Martigues • Salon-de-Provence</p>
          <p>Gardanne • Vitrolles • Association Motards • Harley-Davidson • Indian • Shadow • Custom Bikes</p>
          <p className="pt-4">© {new Date().getFullYear()} GAULS BASTARDS. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

// ===== MAIN APP =====
function App() {
  return (
    <div className="App" data-testid="app-container">
      <div className="grain-overlay"></div>
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
