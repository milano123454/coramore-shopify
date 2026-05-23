import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DownloadPage = () => {
  const [themeInfo, setThemeInfo] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    axios.get(`${API}/theme-info`).then(res => setThemeInfo(res.data)).catch(console.error);
  }, []);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await axios.get(`${API}/download-theme`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'coramore-theme.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Download failed:', e);
    }
    setDownloading(false);
  };

  return (
    <div className="theme-page">
      {/* Header */}
      <header className="tp-header">
        <div className="tp-container">
          <span className="tp-logo">Coramore</span>
          <span className="tp-badge">Shopify Theme v1.0</span>
        </div>
      </header>

      {/* Hero */}
      <section className="tp-hero">
        <div className="tp-container">
          <div className="tp-hero-content">
            <span className="tp-hero-label">Tema Shopify Online Store 2.0</span>
            <h1 className="tp-hero-title">Coramore</h1>
            <p className="tp-hero-subtitle">
              Tema premium ad alta conversione per la Borsa 2-in-1 con scomparto termico.
              Pronto per essere caricato su Shopify.
            </p>
            <button
              className="tp-download-btn"
              onClick={handleDownload}
              disabled={downloading}
              data-testid="download-theme-btn"
            >
              {downloading ? (
                <span className="tp-spinner-wrap">
                  <span className="tp-spinner"></span>
                  Download in corso...
                </span>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Scarica coramore-theme.zip
                </>
              )}
            </button>
            <p className="tp-instructions">
              Admin Shopify &rarr; Negozio online &rarr; Temi &rarr; Carica tema &rarr; .zip
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="tp-features">
        <div className="tp-container">
          <h2 className="tp-section-title">Cosa include il tema</h2>
          <div className="tp-features-grid">
            {themeInfo?.features?.map((f, i) => (
              <div className="tp-feature-card" key={i} data-testid={`feature-card-${i}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections List */}
      <section className="tp-sections">
        <div className="tp-container">
          <div className="tp-sections-grid">
            <div className="tp-sections-col">
              <h3 className="tp-col-title">Sezioni ({themeInfo?.sections?.length || 0})</h3>
              <ul className="tp-list">
                {themeInfo?.sections?.map((s, i) => (
                  <li key={i} className="tp-list-item">
                    <span className="tp-list-dot"></span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="tp-sections-col">
              <h3 className="tp-col-title">Template ({themeInfo?.templates?.length || 0})</h3>
              <ul className="tp-list">
                {themeInfo?.templates?.map((t, i) => (
                  <li key={i} className="tp-list-item">
                    <span className="tp-list-dot"></span>
                    {t}.json
                  </li>
                ))}
              </ul>
            </div>
            <div className="tp-sections-col">
              <h3 className="tp-col-title">Specifiche</h3>
              <ul className="tp-list">
                <li className="tp-list-item"><span className="tp-list-dot"></span>Online Store 2.0</li>
                <li className="tp-list-item"><span className="tp-list-dot"></span>Lingua: Italiano</li>
                <li className="tp-list-item"><span className="tp-list-dot"></span>Sezioni JSON</li>
                <li className="tp-list-item"><span className="tp-list-dot"></span>CSS puro (no framework)</li>
                <li className="tp-list-item"><span className="tp-list-dot"></span>Vanilla JS (no jQuery)</li>
                <li className="tp-list-item"><span className="tp-list-dot"></span>Mobile-first responsive</li>
                <li className="tp-list-item"><span className="tp-list-dot"></span>{themeInfo?.file_count || '...'} file totali</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="tp-palette">
        <div className="tp-container">
          <h2 className="tp-section-title">Palette colori</h2>
          <div className="tp-colors">
            {[
              { name: 'Nero primario', hex: '#111111' },
              { name: 'Bianco', hex: '#FFFFFF' },
              { name: 'Beige caldo', hex: '#F5F0EA' },
              { name: 'Grigio soft', hex: '#F2F2F2' },
              { name: 'Oro accento', hex: '#C9A84C' },
              { name: 'Verde scuro', hex: '#1A3A2A' },
              { name: 'Trustpilot', hex: '#00B67A' },
            ].map((c, i) => (
              <div className="tp-color-chip" key={i}>
                <div className="tp-color-swatch" style={{ backgroundColor: c.hex, border: c.hex === '#FFFFFF' ? '1px solid #ddd' : 'none' }}></div>
                <span className="tp-color-name">{c.name}</span>
                <span className="tp-color-hex">{c.hex}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="tp-footer">
        <div className="tp-container">
          <p>Coramore Theme &mdash; Creato per Shopify Online Store 2.0</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DownloadPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
