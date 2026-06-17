// Article reading page — header, cover, prose body, like + share actions,
// and a comments section. State (like, comments) persists per-article in
// localStorage so the prototype survives reloads.
const { useState: useStateA, useEffect: useEffectA, useMemo: useMemoA } = React;

function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || '').join('').toUpperCase();
}

function ArticlePage({ article, onBack, onOpenArticle }) {
  const D = window.BZ_DATA;
  const a = article;

  // ── Like ────────────────────────────────────────────────────────
  const likeKey = `bz_like_${a.id}`;
  const [liked, setLiked] = useStateA(() => localStorage.getItem(likeKey) === '1');
  useEffectA(() => { localStorage.setItem(likeKey, liked ? '1' : '0'); }, [liked]);
  const likeCount = (a.likes || 0) + (liked ? 1 : 0);

  // ── Share ───────────────────────────────────────────────────────
  const [shareOpen, setShareOpen] = useStateA(false);
  const [copied, setCopied] = useStateA(false);
  function copyLink() {
    const url = window.location.href;
    if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  // ── Comments ─────────────────────────────────────────────────────
  const cmtKey = `bz_comments_${a.id}`;
  const [comments, setComments] = useStateA(() => {
    try {
      const saved = localStorage.getItem(cmtKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return D.seedComments.map((c, i) => ({ ...c, id: `seed-${i}`, likedByMe: false }));
  });
  useEffectA(() => { localStorage.setItem(cmtKey, JSON.stringify(comments)); }, [comments]);

  const [name, setName] = useStateA('');
  const [text, setText] = useStateA('');

  function todayStr() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()} ${p(d.getMonth() + 1)} ${p(d.getDate())}`;
  }
  function submitComment(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const c = {
      id: `c-${Date.now()}`,
      name: name.trim() || 'Anonimė',
      date: todayStr(),
      text: text.trim(),
      likes: 0,
      likedByMe: false,
      mine: true,
    };
    setComments([c, ...comments]);
    setText(''); setName('');
  }
  function toggleCmtLike(id) {
    setComments(comments.map((c) => c.id === id
      ? { ...c, likedByMe: !c.likedByMe, likes: c.likes + (c.likedByMe ? -1 : 1) }
      : c));
  }

  // ── Related ──────────────────────────────────────────────────────
  const related = useMemoA(
    () => D.articles.filter((x) => x.id !== a.id).slice(0, 3),
    [a.id]
  );

  // ── Table of contents (from heading blocks) + scroll-spy ─────────
  const toc = useMemoA(
    () => (a.body || []).map((b, i) => ({ ...b, i })).filter((b) => b.t === 'h'),
    [a.id]
  );
  const [activeId, setActiveId] = useStateA(null);
  useEffectA(() => {
    const ids = toc.map((b) => `sec-${b.i}`);
    if (!ids.length) return;
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [a.id]);

  function goToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    const before = window.scrollY;
    window.scrollTo({ top: y, behavior: 'smooth' });
    // Fallback for contexts where smooth scroll is a no-op (e.g. sandboxed
    // iframes with paused rAF): if nothing moved, jump instantly.
    setTimeout(() => { if (window.scrollY === before) window.scrollTo(0, y); }, 60);
  }

  return (
    <main className="bz-article" data-screen-label="Straipsnis">
      <div className="bz-container bz-article-layout">
        <article className="bz-article-inner">
        <button className="bz-article-back" onClick={onBack}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          <span>Visi straipsniai</span>
        </button>

        <header className="bz-article-head">
          <div className="bz-art-cat">{a.cat}</div>
          <h1 className="bz-article-title">{a.title}</h1>
          <div className="bz-article-byline">
            <div className="bz-avatar">{initials(a.author)}</div>
            <div className="bz-byline-meta">
              <span className="bz-byline-name">{a.author}</span>
              <span className="bz-byline-sub">{a.date} · {a.readTime} skaitymo</span>
            </div>
          </div>
        </header>

        <div className="bz-article-cover">
          <img src={a.img} alt={a.title} />
        </div>

        {/* Actions */}
        <div className="bz-article-actions">
          <button className={`bz-like ${liked ? 'on' : ''}`} onClick={() => setLiked(!liked)}
                  aria-pressed={liked}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
            <span>{liked ? 'Patinka' : 'Patinka'}</span>
            <span className="bz-like-count">{likeCount}</span>
          </button>

          <div className="bz-share-wrap">
            <button className={`bz-share-btn ${shareOpen ? 'on' : ''}`} onClick={() => setShareOpen(!shareOpen)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>
              <span>Dalintis</span>
            </button>
            {shareOpen && (
              <div className="bz-share-menu">
                <button className="bz-share-item" onClick={copyLink}>
                  <span className="bz-share-ico">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/></svg>
                  </span>
                  <span>{copied ? 'Nuoroda nukopijuota!' : 'Kopijuoti nuorodą'}</span>
                </button>
                <a className="bz-share-item" href="#" onClick={(e) => e.preventDefault()}>
                  <span className="bz-share-ico"><img src="../../assets/icons/social/facebook.svg" alt="" /></span>
                  <span>Facebook</span>
                </a>
                <a className="bz-share-item" href="#" onClick={(e) => e.preventDefault()}>
                  <span className="bz-share-ico"><img src="../../assets/icons/social/instagram.svg" alt="" /></span>
                  <span>Instagram</span>
                </a>
                <a className="bz-share-item" href="#" onClick={(e) => e.preventDefault()}>
                  <span className="bz-share-ico"><img src="../../assets/icons/social/envelope.svg" alt="" /></span>
                  <span>El. paštu</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Prose */}
        <div className="bz-prose">
          <p className="bz-prose-lead">{a.excerpt}</p>
          {a.body && a.body.map((b, i) => {
            if (b.t === 'h') return <h2 key={i} id={`sec-${i}`} className="bz-prose-h2">{b.x}</h2>;
            if (b.t === 'q') return <blockquote key={i} className="bz-prose-quote">{b.x}</blockquote>;
            return <p key={i}>{b.x}</p>;
          })}
        </div>

        {/* Author bio */}
        <div className="bz-author-card">
          <div className="bz-author-avatar">{initials(a.author)}</div>
          <div className="bz-author-body">
            <span className="bz-author-eyebrow">Autorė</span>
            <h4 className="bz-author-name">{a.author}</h4>
            <p className="bz-author-text">Mitybos specialistė ir „Be žalos" bendruomenės įkūrėja. Padeda atkurti ramų, sąmoningą santykį su maistu — su meile ir be žalos.</p>
          </div>
        </div>

        {/* Comments */}
        <section className="bz-comments">
          <h3 className="bz-comments-title">Komentarai <span>({comments.length})</span></h3>

          <form className="bz-comment-form" onSubmit={submitComment}>
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="bz-comment-name" placeholder="Tavo vardas (nebūtina)" />
            <textarea
              value={text} onChange={(e) => setText(e.target.value)}
              className="bz-comment-text" rows="3"
              placeholder="Pasidalink mintimis švelniai ir su pagarba…" />
            <div className="bz-comment-actions">
              <button type="submit" className="bz-comment-submit" disabled={!text.trim()}>Komentuoti</button>
            </div>
          </form>

          <ul className="bz-comment-list">
            {comments.map((c) => (
              <li key={c.id} className="bz-comment">
                <div className="bz-avatar bz-comment-avatar">{initials(c.name)}</div>
                <div className="bz-comment-main">
                  <div className="bz-comment-head">
                    <span className="bz-comment-author">{c.name}</span>
                    {c.mine && <span className="bz-comment-badge">Tu</span>}
                    <span className="bz-comment-date">{c.date}</span>
                  </div>
                  <p className="bz-comment-body">{c.text}</p>
                  <button className={`bz-comment-like ${c.likedByMe ? 'on' : ''}`} onClick={() => toggleCmtLike(c.id)}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill={c.likedByMe ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
                    <span>{c.likes > 0 ? c.likes : 'Patinka'}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
        </article>

        {toc.length > 0 && (
          <aside className="bz-toc">
            <nav className="bz-toc-inner">
              <span className="bz-toc-title">Turinys</span>
              <ul className="bz-toc-list">
                {toc.map((b) => (
                  <li key={b.i}>
                    <button
                      className={`bz-toc-link${activeId === `sec-${b.i}` ? ' active' : ''}`}
                      onClick={() => goToSection(`sec-${b.i}`)}>
                      {b.x}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>

      {/* Related */}
      <section className="bz-container bz-related">
        <h3 className="bz-related-title">Skaityk toliau</h3>
        <div className="bz-art-grid">
          {related.map((r) => (
            <button key={r.id} className="bz-art-card" onClick={() => onOpenArticle && onOpenArticle(r)}>
              <div className="bz-art-card-media">
                <img src={r.img} alt={r.title} loading="lazy" />
                <span className="bz-art-card-cat">{r.cat}</span>
              </div>
              <div className="bz-art-card-body">
                <h3 className="bz-art-card-title">{r.title}</h3>
                <p className="bz-art-card-excerpt">{r.excerpt}</p>
                <div className="bz-art-meta">
                  <span>{r.date}</span><span className="bz-art-dot" /><span>{r.readTime}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { ArticlePage });
