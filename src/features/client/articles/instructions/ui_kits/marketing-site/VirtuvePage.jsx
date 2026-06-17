// Virtuvė video library — grid of 5:7 photo cards with bottom gradient.
const { useState: useStateV } = React;

function VirtuvePage({ onOpenVideo }) {
  const D = window.BZ_DATA;
  const [cat, setCat] = useStateV('Visos');
  const filtered = cat === 'Visos' ? D.videos : D.videos.filter((v) => v.cat === cat);

  return (
    <main className="bz-virtuve" data-screen-label="Virtuve">
      <section className="bz-virtuve-header">
        <div className="bz-container">
          <h1>Virtuvė</h1>
          <p>Video įrašai apie sveikatai palankią mitybą, emocinį valgymą ir
             santykį su maistu — su Sandra Jatulyte.</p>
        </div>
      </section>

      <section className="bz-virtuve-body">
        <div className="bz-container">
          <div className="bz-chiprow">
            {D.categories.map((c) => (
              <button key={c}
                      className={`bz-chip ${cat === c ? 'active' : ''}`}
                      onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>

          <div className="bz-video-grid">
            {filtered.map((v, i) => (
              <button key={i} className="bz-video-card" onClick={() => onOpenVideo(v)}>
                <img src={v.img} alt={v.title} loading="lazy" />
                <div className="bz-video-overlay" />
                {v.isNew && <div className="bz-video-new">Nauja</div>}
                <div className="bz-video-content">
                  <div className="bz-video-cat">{v.cat}</div>
                  <div className="bz-video-title">{v.title}</div>
                  <div className="bz-video-tags">
                    {v.tags.map((t) => <span key={t} className="bz-video-tag">{t}</span>)}
                  </div>
                  <div className="bz-video-social">
                    <span className="bz-video-stat">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z"/></svg>
                      <span>{v.likes}</span>
                    </span>
                    <span className="bz-video-stat">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/></svg>
                      <span>12</span>
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { VirtuvePage });
