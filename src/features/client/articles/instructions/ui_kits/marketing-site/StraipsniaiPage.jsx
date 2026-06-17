// Straipsniai — editorial article index. Gradient "scoop" header (like Virtuvė),
// a large featured article, category chips, then a responsive card grid.
const { useState: useStateS } = React;

function StraipsniaiPage({ onOpenArticle }) {
  const D = window.BZ_DATA;
  const [cat, setCat] = useStateS('Visi');

  const featured = D.articles.find((a) => a.featured) || D.articles[0];
  const rest = D.articles.filter((a) => a.id !== featured.id);
  const filtered = cat === 'Visi' ? rest : rest.filter((a) => a.cat === cat);

  const open = (a) => onOpenArticle && onOpenArticle(a);

  return (
    <main className="bz-straipsniai" data-screen-label="Straipsniai">
      <section className="bz-art-header">
        <div className="bz-container">
          <span className="bz-art-eyebrow">Be žalos žurnalas</span>
          <h1>Straipsniai</h1>
          <p>Mokslu grįstos įžvalgos apie mitybą, emocinį valgymą ir santykį
             su maistu — kad pokyčiai vyktų su meile ir be žalos.</p>
        </div>
      </section>

      <div className="bz-container">
        {/* Featured */}
        <button className="bz-art-featured" onClick={() => open(featured)}>
          <div className="bz-art-featured-media">
            <img src={featured.img} alt={featured.title} />
          </div>
          <div className="bz-art-featured-body">
            <div className="bz-art-cat">{featured.cat}</div>
            <h2 className="bz-art-featured-title">{featured.title}</h2>
            <p className="bz-art-featured-excerpt">{featured.excerpt}</p>
            <div className="bz-art-meta">
              <span>{featured.author}</span>
              <span className="bz-art-dot" />
              <span>{featured.date}</span>
              <span className="bz-art-dot" />
              <span>{featured.readTime} skaitymo</span>
            </div>
            <span className="bz-art-readmore">Skaityti straipsnį →</span>
          </div>
        </button>

        {/* Filter chips */}
        <div className="bz-chiprow bz-art-chiprow">
          {D.articleCategories.map((c) => (
            <button key={c}
                    className={`bz-chip ${cat === c ? 'active' : ''}`}
                    onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="bz-art-grid">
          {filtered.map((a) => (
            <button key={a.id} className="bz-art-card" onClick={() => open(a)}>
              <div className="bz-art-card-media">
                <img src={a.img} alt={a.title} loading="lazy" />
                <span className="bz-art-card-cat">{a.cat}</span>
              </div>
              <div className="bz-art-card-body">
                <h3 className="bz-art-card-title">{a.title}</h3>
                <p className="bz-art-card-excerpt">{a.excerpt}</p>
                <div className="bz-art-meta">
                  <span>{a.date}</span>
                  <span className="bz-art-dot" />
                  <span>{a.readTime}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="bz-art-empty">Šioje kategorijoje straipsnių dar nėra.</p>
        )}
      </div>
    </main>
  );
}

Object.assign(window, { StraipsniaiPage });
