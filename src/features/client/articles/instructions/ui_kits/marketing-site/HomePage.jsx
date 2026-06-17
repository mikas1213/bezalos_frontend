// Be žalos homepage — Hero, Experience stats, About, Education, Offers,
// Interactive Plan, Reviews. Mirrors HomePage.tsx in frontend/src.
const { useState, useEffect, useMemo } = React;

function HomePage({ onNavigate }) {
  const D = window.BZ_DATA;

  // Hero photo rotation (mirrors HeroSection.tsx + localStorage)
  const heroIdx = useMemo(() => {
    const saved = localStorage.getItem('bz_heroIdx');
    let n;
    if (saved !== null) n = (parseInt(saved, 10) + 1) % D.meals.length;
    else n = Math.floor(Math.random() * D.meals.length);
    localStorage.setItem('bz_heroIdx', String(n));
    return n;
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  return (
    <main className="bz-home" data-screen-label="Home">

      {/* Hero */}
      <section className="bz-hero">
        <div className="bz-container bz-hero-grid">
          <div className={`bz-hero-left ${mounted ? 'mounted' : ''}`}>
            <div className="bz-hero-title">
              <h1>Tavo <span>ilgalaikių</span></h1>
              <h1>mitybos pokyčių</h1>
              <h1>garantas</h1>
            </div>
            <p className="bz-hero-sub">
              Čia išmoksi sveikatai palankios mitybos pagrindų, tapsi
              bendruomenės nare. Juk drauge įpročius formuoti lengviau!
            </p>
            <button className="bz-btn-outline-lime" onClick={() => onNavigate('virtuve')}>
              Virtuvė
            </button>
          </div>
          <div className={`bz-hero-right ${mounted ? 'mounted' : ''}`}>
            <img src={D.meals[heroIdx]} alt="meal" />
          </div>
        </div>
      </section>

      {/* Experience stats */}
      <section className="bz-experience">
        <div className="bz-container bz-experience-grid">
          {D.experience.map((e) => (
            <div key={e.value} className="bz-stat">
              <h3>{e.value}</h3>
              <h4>{e.desc}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* About — Sandra */}
      <section className="bz-about">
        <div className="bz-container bz-about-grid">
          <div className="bz-about-image">
            <img src="../../assets/images/author2.webp" alt="Sandra" />
          </div>
          <div className="bz-about-copy">
            <div>
              <h5>Labas, esu Sandra</h5>
              <h2>Pavargai nuolat<br />mąstyti apie<br />maistą?</h2>
            </div>
            <div className="bz-about-paragraphs">
              <p>Čia ramybę ras tos, kurios pavargo nuo nuolatinio savęs alinimo
                 vis nauja dieta, ataugančio su kaupu svorio ar kitų savęs
                 ribojimų. Šioje bendruomenėje išmoksi sveikatai palankios
                 mitybos pagrindų, kurie be ribojimo leis tau atkurti sveiką
                 santykį su maistu.</p>
              <p>Taip pat padėsiu tau geriau pažinti save, savo mintis,
                 emocijas ir kūno pojūčius, kurie tave atveda į apsivalgymus ar
                 kitus iššūkius. Kartu galime įveikti visus, su valgymu
                 susijusius sunkumus 💚</p>
            </div>
            <img className="bz-signature" src="../../assets/images/signature.webp" alt="Sandra" />
          </div>
        </div>
      </section>

      {/* Education — Sandra's credentials */}
      <section className="bz-education">
        <div className="bz-container bz-education-row">
          {D.education.map((it) => (
            <div key={it.row1} className="bz-edu-item">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6"/>
                <path d="M6 12.5V17a6 5 0 0 0 12 0v-4.5"/>
                <path d="M2 10l10-5 10 5-10 5z"/>
              </svg>
              <div className="bz-edu-label">
                <span>{it.row1}</span>
                {it.row2 && <span>{it.row2}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offer cards */}
      <section className="bz-offer">
        <div className="bz-container">
          <div className="bz-section-header">
            <h2>Nežinai, nuo ko pradėti?</h2>
            <p>Žemiau rasi tris skirtingus būdus pradėti – pasirink tą, kuris
               šiuo metu tau atrodo artimiausias</p>
          </div>
          <div className="bz-offer-grid">
            {D.offers.map((c) => (
              <div key={c.id} className={`bz-offer-card bz-offer-${c.theme}`}>
                <div className="bz-offer-icon" aria-hidden>{c.icon}</div>
                <div className="bz-offer-title">
                  {c.title.map((row, i) => <div key={i}>{row}</div>)}
                </div>
                <p className="bz-offer-body">{c.body}</p>
                <div className="bz-offer-subtitle">{c.subTitle}</div>
                <div className="bz-offer-bullet"><span>•</span><span>{c.p1}</span></div>
                <div className="bz-offer-bullet"><span>•</span><span>{c.p2}</span></div>
                <div className="bz-offer-cta">
                  <button>{c.btn}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive plan feature row */}
      <section className="bz-feature">
        <div className="bz-container">
          <div className="bz-feature-header">
            <h2>Pavargai nuolat pirkti naują planą?</h2>
            <p>Interaktyvus mitybos planas su neribotom galimybėm keisti
               produktus, kurti ir skaičiuoti receptus</p>
          </div>
          <div className="bz-feature-body">
            <div className="bz-feature-col">
              <FeatureCard f={D.features[0]} />
              <FeatureCard f={D.features[1]} />
            </div>
            <div className="bz-feature-phone">
              <img src="../../assets/images/phone-mitybos-planas.webp" alt="phone" />
            </div>
            <div className="bz-feature-col">
              <FeatureCard f={D.features[2]} />
              <FeatureCard f={D.features[3]} />
            </div>
          </div>
          <div className="bz-feature-bottom">
            <div className="bz-feature-stat"><b>+50</b><span>Maisto produktų</span></div>
            <div className="bz-feature-stat"><b>180+</b><span>Skirtingų receptų</span></div>
            <div className="bz-feature-stat"><b>1000+</b><span>Numestų kilogramų</span></div>
          </div>
        </div>
      </section>

    </main>
  );
}

function FeatureCard({ f }) {
  return (
    <div className={`bz-feat-card bz-feat-${f.tone}`}>
      <div className="bz-feat-glyph">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div className="bz-feat-title">{f.title}</div>
      <div className="bz-feat-body">{f.body}</div>
    </div>
  );
}

Object.assign(window, { HomePage, FeatureCard });
