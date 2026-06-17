/* @ds-bundle: {"format":3,"namespace":"BeAlosDesignSystem_036fb4","components":[],"sourceHashes":{"ui_kits/marketing-site/App.jsx":"192930ca2a3a","ui_kits/marketing-site/ArticlePage.jsx":"436227d7d7a2","ui_kits/marketing-site/Banner.jsx":"ac9a3e2ff7a9","ui_kits/marketing-site/Footer.jsx":"fd04e540604c","ui_kits/marketing-site/HomePage.jsx":"96664a5a4204","ui_kits/marketing-site/Navbar.jsx":"5140cb72e879","ui_kits/marketing-site/StraipsniaiPage.jsx":"a4992ef2df78","ui_kits/marketing-site/VirtuvePage.jsx":"1920dbab591f","ui_kits/marketing-site/data.js":"6c3dfe0bd067"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BeAlosDesignSystem_036fb4 = window.BeAlosDesignSystem_036fb4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/marketing-site/App.jsx
try { (() => {
// App shell — manages route state, scroll state, video modal, promo banner.
const {
  useState: useStateApp,
  useEffect: useEffectApp
} = React;
function App() {
  const [route, setRoute] = useStateApp('home');
  const [scrollY, setScrollY] = useStateApp(0);
  const [bannerOpen, setBannerOpen] = useStateApp(false);
  const [videoToast, setVideoToast] = useStateApp(null);
  const [article, setArticle] = useStateApp(null);
  useEffectApp(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffectApp(() => {
    // Show banner after a short delay on first visit
    if (sessionStorage.getItem('bz_bannerShown')) return;
    const t = setTimeout(() => {
      setBannerOpen(true);
      sessionStorage.setItem('bz_bannerShown', '1');
    }, 1500);
    return () => clearTimeout(t);
  }, []);
  function navigate(to) {
    setRoute(to);
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }
  function openVideo(v) {
    setVideoToast(v);
    setTimeout(() => setVideoToast(null), 3500);
  }
  function openArticle(a) {
    setArticle(a);
    setRoute('article');
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navbar, {
    page: route === 'home' ? 'home' : 'default',
    currentRoute: route,
    onNavigate: navigate,
    onLogin: () => setBannerOpen(true),
    scrollY: scrollY
  }), route === 'home' && /*#__PURE__*/React.createElement(HomePage, {
    onNavigate: navigate
  }), route === 'virtuve' && /*#__PURE__*/React.createElement(VirtuvePage, {
    onOpenVideo: openVideo
  }), route === 'straipsniai' && /*#__PURE__*/React.createElement(StraipsniaiPage, {
    onOpenArticle: openArticle
  }), route === 'article' && article && /*#__PURE__*/React.createElement(ArticlePage, {
    article: article,
    onBack: () => navigate('straipsniai'),
    onOpenArticle: openArticle
  }), route !== 'home' && route !== 'virtuve' && route !== 'straipsniai' && route !== 'article' && /*#__PURE__*/React.createElement("main", {
    className: "bz-soon",
    "data-screen-label": route
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-container"
  }, /*#__PURE__*/React.createElement("h1", null, "Pasimatom netrukus"), /*#__PURE__*/React.createElement("p", null, "\u0160is puslapis \u2013 \u201E", route, "\" \u2013 kuriamas. \u0160iame UI kit'e i\u0161sami yra tik ", /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate('home')
  }, "prad\u017Eia"), ",", /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate('virtuve')
  }, " Virtuv\u0117"), " ir", /*#__PURE__*/React.createElement("a", {
    onClick: () => navigate('straipsniai')
  }, " Straipsniai"), "."))), /*#__PURE__*/React.createElement(Footer, null), bannerOpen && /*#__PURE__*/React.createElement(Banner, {
    onClose: () => setBannerOpen(false),
    onCta: () => {
      setBannerOpen(false);
      navigate('virtuve');
    }
  }), videoToast && /*#__PURE__*/React.createElement("div", {
    className: "bz-toast"
  }, /*#__PURE__*/React.createElement("img", {
    src: videoToast.img,
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "bz-toast-cat"
  }, videoToast.cat), /*#__PURE__*/React.createElement("div", {
    className: "bz-toast-title"
  }, videoToast.title), /*#__PURE__*/React.createElement("div", {
    className: "bz-toast-hint"
  }, videoToast.hint || 'Video grotuvas šiame prototipe neįjungtas.'))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/ArticlePage.jsx
try { (() => {
// Article reading page — header, cover, prose body, like + share actions,
// and a comments section. State (like, comments) persists per-article in
// localStorage so the prototype survives reloads.
const {
  useState: useStateA,
  useEffect: useEffectA,
  useMemo: useMemoA
} = React;
function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
}
function ArticlePage({
  article,
  onBack,
  onOpenArticle
}) {
  const D = window.BZ_DATA;
  const a = article;

  // ── Like ────────────────────────────────────────────────────────
  const likeKey = `bz_like_${a.id}`;
  const [liked, setLiked] = useStateA(() => localStorage.getItem(likeKey) === '1');
  useEffectA(() => {
    localStorage.setItem(likeKey, liked ? '1' : '0');
  }, [liked]);
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
    return D.seedComments.map((c, i) => ({
      ...c,
      id: `seed-${i}`,
      likedByMe: false
    }));
  });
  useEffectA(() => {
    localStorage.setItem(cmtKey, JSON.stringify(comments));
  }, [comments]);
  const [name, setName] = useStateA('');
  const [text, setText] = useStateA('');
  function todayStr() {
    const d = new Date();
    const p = n => String(n).padStart(2, '0');
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
      mine: true
    };
    setComments([c, ...comments]);
    setText('');
    setName('');
  }
  function toggleCmtLike(id) {
    setComments(comments.map(c => c.id === id ? {
      ...c,
      likedByMe: !c.likedByMe,
      likes: c.likes + (c.likedByMe ? -1 : 1)
    } : c));
  }

  // ── Related ──────────────────────────────────────────────────────
  const related = useMemoA(() => D.articles.filter(x => x.id !== a.id).slice(0, 3), [a.id]);

  // ── Table of contents (from heading blocks) + scroll-spy ─────────
  const toc = useMemoA(() => (a.body || []).map((b, i) => ({
    ...b,
    i
  })).filter(b => b.t === 'h'), [a.id]);
  const [activeId, setActiveId] = useStateA(null);
  useEffectA(() => {
    const ids = toc.map(b => `sec-${b.i}`);
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
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, [a.id]);
  function goToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    const before = window.scrollY;
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
    // Fallback for contexts where smooth scroll is a no-op (e.g. sandboxed
    // iframes with paused rAF): if nothing moved, jump instantly.
    setTimeout(() => {
      if (window.scrollY === before) window.scrollTo(0, y);
    }, 60);
  }
  return /*#__PURE__*/React.createElement("main", {
    className: "bz-article",
    "data-screen-label": "Straipsnis"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-container bz-article-layout"
  }, /*#__PURE__*/React.createElement("article", {
    className: "bz-article-inner"
  }, /*#__PURE__*/React.createElement("button", {
    className: "bz-article-back",
    onClick: onBack
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 12H5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 19l-7-7 7-7"
  })), /*#__PURE__*/React.createElement("span", null, "Visi straipsniai")), /*#__PURE__*/React.createElement("header", {
    className: "bz-article-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-art-cat"
  }, a.cat), /*#__PURE__*/React.createElement("h1", {
    className: "bz-article-title"
  }, a.title), /*#__PURE__*/React.createElement("div", {
    className: "bz-article-byline"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-avatar"
  }, initials(a.author)), /*#__PURE__*/React.createElement("div", {
    className: "bz-byline-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bz-byline-name"
  }, a.author), /*#__PURE__*/React.createElement("span", {
    className: "bz-byline-sub"
  }, a.date, " \xB7 ", a.readTime, " skaitymo")))), /*#__PURE__*/React.createElement("div", {
    className: "bz-article-cover"
  }, /*#__PURE__*/React.createElement("img", {
    src: a.img,
    alt: a.title
  })), /*#__PURE__*/React.createElement("div", {
    className: "bz-article-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: `bz-like ${liked ? 'on' : ''}`,
    onClick: () => setLiked(!liked),
    "aria-pressed": liked
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: liked ? 'currentColor' : 'none',
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"
  })), /*#__PURE__*/React.createElement("span", null, liked ? 'Patinka' : 'Patinka'), /*#__PURE__*/React.createElement("span", {
    className: "bz-like-count"
  }, likeCount)), /*#__PURE__*/React.createElement("div", {
    className: "bz-share-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    className: `bz-share-btn ${shareOpen ? 'on' : ''}`,
    onClick: () => setShareOpen(!shareOpen)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "5",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "19",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"
  })), /*#__PURE__*/React.createElement("span", null, "Dalintis")), shareOpen && /*#__PURE__*/React.createElement("div", {
    className: "bz-share-menu"
  }, /*#__PURE__*/React.createElement("button", {
    className: "bz-share-item",
    onClick: copyLink
  }, /*#__PURE__*/React.createElement("span", {
    className: "bz-share-ico"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"
  }))), /*#__PURE__*/React.createElement("span", null, copied ? 'Nuoroda nukopijuota!' : 'Kopijuoti nuorodą')), /*#__PURE__*/React.createElement("a", {
    className: "bz-share-item",
    href: "#",
    onClick: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("span", {
    className: "bz-share-ico"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/social/facebook.svg",
    alt: ""
  })), /*#__PURE__*/React.createElement("span", null, "Facebook")), /*#__PURE__*/React.createElement("a", {
    className: "bz-share-item",
    href: "#",
    onClick: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("span", {
    className: "bz-share-ico"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/social/instagram.svg",
    alt: ""
  })), /*#__PURE__*/React.createElement("span", null, "Instagram")), /*#__PURE__*/React.createElement("a", {
    className: "bz-share-item",
    href: "#",
    onClick: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("span", {
    className: "bz-share-ico"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/social/envelope.svg",
    alt: ""
  })), /*#__PURE__*/React.createElement("span", null, "El. pa\u0161tu"))))), /*#__PURE__*/React.createElement("div", {
    className: "bz-prose"
  }, /*#__PURE__*/React.createElement("p", {
    className: "bz-prose-lead"
  }, a.excerpt), a.body && a.body.map((b, i) => {
    if (b.t === 'h') return /*#__PURE__*/React.createElement("h2", {
      key: i,
      id: `sec-${i}`,
      className: "bz-prose-h2"
    }, b.x);
    if (b.t === 'q') return /*#__PURE__*/React.createElement("blockquote", {
      key: i,
      className: "bz-prose-quote"
    }, b.x);
    return /*#__PURE__*/React.createElement("p", {
      key: i
    }, b.x);
  })), /*#__PURE__*/React.createElement("div", {
    className: "bz-author-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-author-avatar"
  }, initials(a.author)), /*#__PURE__*/React.createElement("div", {
    className: "bz-author-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bz-author-eyebrow"
  }, "Autor\u0117"), /*#__PURE__*/React.createElement("h4", {
    className: "bz-author-name"
  }, a.author), /*#__PURE__*/React.createElement("p", {
    className: "bz-author-text"
  }, "Mitybos specialist\u0117 ir \u201EBe \u017Ealos\" bendruomen\u0117s \u012Fk\u016Br\u0117ja. Padeda atkurti ram\u0173, s\u0105moning\u0105 santyk\u012F su maistu \u2014 su meile ir be \u017Ealos."))), /*#__PURE__*/React.createElement("section", {
    className: "bz-comments"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "bz-comments-title"
  }, "Komentarai ", /*#__PURE__*/React.createElement("span", null, "(", comments.length, ")")), /*#__PURE__*/React.createElement("form", {
    className: "bz-comment-form",
    onSubmit: submitComment
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: name,
    onChange: e => setName(e.target.value),
    className: "bz-comment-name",
    placeholder: "Tavo vardas (neb\u016Btina)"
  }), /*#__PURE__*/React.createElement("textarea", {
    value: text,
    onChange: e => setText(e.target.value),
    className: "bz-comment-text",
    rows: "3",
    placeholder: "Pasidalink mintimis \u0161velniai ir su pagarba\u2026"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bz-comment-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "bz-comment-submit",
    disabled: !text.trim()
  }, "Komentuoti"))), /*#__PURE__*/React.createElement("ul", {
    className: "bz-comment-list"
  }, comments.map(c => /*#__PURE__*/React.createElement("li", {
    key: c.id,
    className: "bz-comment"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-avatar bz-comment-avatar"
  }, initials(c.name)), /*#__PURE__*/React.createElement("div", {
    className: "bz-comment-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-comment-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bz-comment-author"
  }, c.name), c.mine && /*#__PURE__*/React.createElement("span", {
    className: "bz-comment-badge"
  }, "Tu"), /*#__PURE__*/React.createElement("span", {
    className: "bz-comment-date"
  }, c.date)), /*#__PURE__*/React.createElement("p", {
    className: "bz-comment-body"
  }, c.text), /*#__PURE__*/React.createElement("button", {
    className: `bz-comment-like ${c.likedByMe ? 'on' : ''}`,
    onClick: () => toggleCmtLike(c.id)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: c.likedByMe ? 'currentColor' : 'none',
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"
  })), /*#__PURE__*/React.createElement("span", null, c.likes > 0 ? c.likes : 'Patinka')))))))), toc.length > 0 && /*#__PURE__*/React.createElement("aside", {
    className: "bz-toc"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "bz-toc-inner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bz-toc-title"
  }, "Turinys"), /*#__PURE__*/React.createElement("ul", {
    className: "bz-toc-list"
  }, toc.map(b => /*#__PURE__*/React.createElement("li", {
    key: b.i
  }, /*#__PURE__*/React.createElement("button", {
    className: `bz-toc-link${activeId === `sec-${b.i}` ? ' active' : ''}`,
    onClick: () => goToSection(`sec-${b.i}`)
  }, b.x))))))), /*#__PURE__*/React.createElement("section", {
    className: "bz-container bz-related"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "bz-related-title"
  }, "Skaityk toliau"), /*#__PURE__*/React.createElement("div", {
    className: "bz-art-grid"
  }, related.map(r => /*#__PURE__*/React.createElement("button", {
    key: r.id,
    className: "bz-art-card",
    onClick: () => onOpenArticle && onOpenArticle(r)
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-art-card-media"
  }, /*#__PURE__*/React.createElement("img", {
    src: r.img,
    alt: r.title,
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("span", {
    className: "bz-art-card-cat"
  }, r.cat)), /*#__PURE__*/React.createElement("div", {
    className: "bz-art-card-body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "bz-art-card-title"
  }, r.title), /*#__PURE__*/React.createElement("p", {
    className: "bz-art-card-excerpt"
  }, r.excerpt), /*#__PURE__*/React.createElement("div", {
    className: "bz-art-meta"
  }, /*#__PURE__*/React.createElement("span", null, r.date), /*#__PURE__*/React.createElement("span", {
    className: "bz-art-dot"
  }), /*#__PURE__*/React.createElement("span", null, r.readTime))))))));
}
Object.assign(window, {
  ArticlePage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/ArticlePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Banner.jsx
try { (() => {
// Promo modal — matches Banner.tsx (cream card, photo-side layout, lime CTA).

function Banner({
  onClose,
  onCta
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "bz-banner-backdrop",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-banner-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    className: "bz-banner-close",
    onClick: onClose,
    "aria-label": "U\u017Everti"
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    className: "bz-banner-photo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/pasimatom-netrukus.webp",
    onError: e => {
      e.currentTarget.src = '../../assets/images/author.webp';
    },
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "bz-banner-fade"
  })), /*#__PURE__*/React.createElement("div", {
    className: "bz-banner-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-banner-eyebrow"
  }, "\u2014 I\u0160BANDYK NEMOKAMAI"), /*#__PURE__*/React.createElement("h2", {
    className: "bz-banner-title"
  }, "\u017Di\u016Br\u0117k video \u012Fra\u0161\u0173 i\u0161traukas\xA0", /*#__PURE__*/React.createElement("em", null, "nemokamai")), /*#__PURE__*/React.createElement("p", {
    className: "bz-banner-body"
  }, "Pokalbiai apie emocin\u012F valgym\u0105, santyk\u012F su maistu ir vidin\u012F nuovarg\u012F."), /*#__PURE__*/React.createElement("div", {
    className: "bz-banner-cta-area"
  }, /*#__PURE__*/React.createElement("button", {
    className: "bz-banner-cta",
    onClick: onCta
  }, "\u017DI\u016AR\u0116TI DABAR"), /*#__PURE__*/React.createElement("div", {
    className: "bz-banner-trust"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11V7a5 5 0 0 1 10 0v4"
  })), /*#__PURE__*/React.createElement("span", null, "Joki\u0173 \u012Fsipareigojim\u0173"))))));
}
Object.assign(window, {
  Banner
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Banner.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Footer.jsx
try { (() => {
// Be žalos footer — cream card with newsletter pill, links, social, copyright.

function Footer() {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  return /*#__PURE__*/React.createElement("footer", {
    className: "bz-footer",
    "data-screen-label": "Footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-container bz-footer-inner"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "bz-footer-title"
  }, /*#__PURE__*/React.createElement("span", null, "Keliaujam \u012F ilgalaikius\xA0"), /*#__PURE__*/React.createElement("span", null, "poky\u010Dius kartu?")), /*#__PURE__*/React.createElement("p", {
    className: "bz-footer-text"
  }, "Gauk palaikym\u0105 ir mokslu gr\u012Fst\u0105 informacij\u0105, kaip pagaliau pasiekti ilgalaiki\u0173 rezultat\u0173 su meile ir be \u017Ealos"), /*#__PURE__*/React.createElement("form", {
    className: "bz-newsletter",
    onSubmit: e => {
      e.preventDefault();
      setSubmitted(true);
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    required: true,
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "Tavo el. pa\u0161tas",
    className: submitted ? 'valid' : ''
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: !email
  }, submitted ? 'Ačiū!' : 'Užsisakyti naujienas')), /*#__PURE__*/React.createElement("div", {
    className: "bz-footer-meta"
  }, /*#__PURE__*/React.createElement("a", {
    className: "bz-footer-logo",
    href: "#",
    onClick: e => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/be-zalos-logo.svg",
    alt: "be \u017Ealos"
  })), /*#__PURE__*/React.createElement("div", {
    className: "bz-footer-links"
  }, /*#__PURE__*/React.createElement("a", null, "Kontaktai"), /*#__PURE__*/React.createElement("a", null, "Pirkimo taisykl\u0117s"), /*#__PURE__*/React.createElement("a", null, "Privatumo politika")), /*#__PURE__*/React.createElement("div", {
    className: "bz-footer-social"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/social/facebook.svg",
    alt: "Facebook"
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/social/instagram.svg",
    alt: "Instagram"
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/social/envelope.svg",
    alt: "Email"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bz-footer-divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bz-footer-copy"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9"), /*#__PURE__*/React.createElement("span", null, "2025 Be \u017Ealos"))));
}
Object.assign(window, {
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/HomePage.jsx
try { (() => {
// Be žalos homepage — Hero, Experience stats, About, Education, Offers,
// Interactive Plan, Reviews. Mirrors HomePage.tsx in frontend/src.
const {
  useState,
  useEffect,
  useMemo
} = React;
function HomePage({
  onNavigate
}) {
  const D = window.BZ_DATA;

  // Hero photo rotation (mirrors HeroSection.tsx + localStorage)
  const heroIdx = useMemo(() => {
    const saved = localStorage.getItem('bz_heroIdx');
    let n;
    if (saved !== null) n = (parseInt(saved, 10) + 1) % D.meals.length;else n = Math.floor(Math.random() * D.meals.length);
    localStorage.setItem('bz_heroIdx', String(n));
    return n;
  }, []);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);
  return /*#__PURE__*/React.createElement("main", {
    className: "bz-home",
    "data-screen-label": "Home"
  }, /*#__PURE__*/React.createElement("section", {
    className: "bz-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-container bz-hero-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: `bz-hero-left ${mounted ? 'mounted' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-hero-title"
  }, /*#__PURE__*/React.createElement("h1", null, "Tavo ", /*#__PURE__*/React.createElement("span", null, "ilgalaiki\u0173")), /*#__PURE__*/React.createElement("h1", null, "mitybos poky\u010Di\u0173"), /*#__PURE__*/React.createElement("h1", null, "garantas")), /*#__PURE__*/React.createElement("p", {
    className: "bz-hero-sub"
  }, "\u010Cia i\u0161moksi sveikatai palankios mitybos pagrind\u0173, tapsi bendruomen\u0117s nare. Juk drauge \u012Fpro\u010Dius formuoti lengviau!"), /*#__PURE__*/React.createElement("button", {
    className: "bz-btn-outline-lime",
    onClick: () => onNavigate('virtuve')
  }, "Virtuv\u0117")), /*#__PURE__*/React.createElement("div", {
    className: `bz-hero-right ${mounted ? 'mounted' : ''}`
  }, /*#__PURE__*/React.createElement("img", {
    src: D.meals[heroIdx],
    alt: "meal"
  })))), /*#__PURE__*/React.createElement("section", {
    className: "bz-experience"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-container bz-experience-grid"
  }, D.experience.map(e => /*#__PURE__*/React.createElement("div", {
    key: e.value,
    className: "bz-stat"
  }, /*#__PURE__*/React.createElement("h3", null, e.value), /*#__PURE__*/React.createElement("h4", null, e.desc))))), /*#__PURE__*/React.createElement("section", {
    className: "bz-about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-container bz-about-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-about-image"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/author2.webp",
    alt: "Sandra"
  })), /*#__PURE__*/React.createElement("div", {
    className: "bz-about-copy"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "Labas, esu Sandra"), /*#__PURE__*/React.createElement("h2", null, "Pavargai nuolat", /*#__PURE__*/React.createElement("br", null), "m\u0105styti apie", /*#__PURE__*/React.createElement("br", null), "maist\u0105?")), /*#__PURE__*/React.createElement("div", {
    className: "bz-about-paragraphs"
  }, /*#__PURE__*/React.createElement("p", null, "\u010Cia ramyb\u0119 ras tos, kurios pavargo nuo nuolatinio sav\u0119s alinimo vis nauja dieta, ataugan\u010Dio su kaupu svorio ar kit\u0173 sav\u0119s ribojim\u0173. \u0160ioje bendruomen\u0117je i\u0161moksi sveikatai palankios mitybos pagrind\u0173, kurie be ribojimo leis tau atkurti sveik\u0105 santyk\u012F su maistu."), /*#__PURE__*/React.createElement("p", null, "Taip pat pad\u0117siu tau geriau pa\u017Einti save, savo mintis, emocijas ir k\u016Bno poj\u016B\u010Dius, kurie tave atveda \u012F apsivalgymus ar kitus i\u0161\u0161\u016Bkius. Kartu galime \u012Fveikti visus, su valgymu susijusius sunkumus \uD83D\uDC9A")), /*#__PURE__*/React.createElement("img", {
    className: "bz-signature",
    src: "../../assets/images/signature.webp",
    alt: "Sandra"
  })))), /*#__PURE__*/React.createElement("section", {
    className: "bz-education"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-container bz-education-row"
  }, D.education.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.row1,
    className: "bz-edu-item"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "32",
    height: "32",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 10v6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 12.5V17a6 5 0 0 0 12 0v-4.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 10l10-5 10 5-10 5z"
  })), /*#__PURE__*/React.createElement("div", {
    className: "bz-edu-label"
  }, /*#__PURE__*/React.createElement("span", null, it.row1), it.row2 && /*#__PURE__*/React.createElement("span", null, it.row2)))))), /*#__PURE__*/React.createElement("section", {
    className: "bz-offer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-section-header"
  }, /*#__PURE__*/React.createElement("h2", null, "Ne\u017Einai, nuo ko prad\u0117ti?"), /*#__PURE__*/React.createElement("p", null, "\u017Demiau rasi tris skirtingus b\u016Bdus prad\u0117ti \u2013 pasirink t\u0105, kuris \u0161iuo metu tau atrodo artimiausias")), /*#__PURE__*/React.createElement("div", {
    className: "bz-offer-grid"
  }, D.offers.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    className: `bz-offer-card bz-offer-${c.theme}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-offer-icon",
    "aria-hidden": true
  }, c.icon), /*#__PURE__*/React.createElement("div", {
    className: "bz-offer-title"
  }, c.title.map((row, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, row))), /*#__PURE__*/React.createElement("p", {
    className: "bz-offer-body"
  }, c.body), /*#__PURE__*/React.createElement("div", {
    className: "bz-offer-subtitle"
  }, c.subTitle), /*#__PURE__*/React.createElement("div", {
    className: "bz-offer-bullet"
  }, /*#__PURE__*/React.createElement("span", null, "\u2022"), /*#__PURE__*/React.createElement("span", null, c.p1)), /*#__PURE__*/React.createElement("div", {
    className: "bz-offer-bullet"
  }, /*#__PURE__*/React.createElement("span", null, "\u2022"), /*#__PURE__*/React.createElement("span", null, c.p2)), /*#__PURE__*/React.createElement("div", {
    className: "bz-offer-cta"
  }, /*#__PURE__*/React.createElement("button", null, c.btn))))))), /*#__PURE__*/React.createElement("section", {
    className: "bz-feature"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-feature-header"
  }, /*#__PURE__*/React.createElement("h2", null, "Pavargai nuolat pirkti nauj\u0105 plan\u0105?"), /*#__PURE__*/React.createElement("p", null, "Interaktyvus mitybos planas su neribotom galimyb\u0117m keisti produktus, kurti ir skai\u010Diuoti receptus")), /*#__PURE__*/React.createElement("div", {
    className: "bz-feature-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-feature-col"
  }, /*#__PURE__*/React.createElement(FeatureCard, {
    f: D.features[0]
  }), /*#__PURE__*/React.createElement(FeatureCard, {
    f: D.features[1]
  })), /*#__PURE__*/React.createElement("div", {
    className: "bz-feature-phone"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/images/phone-mitybos-planas.webp",
    alt: "phone"
  })), /*#__PURE__*/React.createElement("div", {
    className: "bz-feature-col"
  }, /*#__PURE__*/React.createElement(FeatureCard, {
    f: D.features[2]
  }), /*#__PURE__*/React.createElement(FeatureCard, {
    f: D.features[3]
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bz-feature-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-feature-stat"
  }, /*#__PURE__*/React.createElement("b", null, "+50"), /*#__PURE__*/React.createElement("span", null, "Maisto produkt\u0173")), /*#__PURE__*/React.createElement("div", {
    className: "bz-feature-stat"
  }, /*#__PURE__*/React.createElement("b", null, "180+"), /*#__PURE__*/React.createElement("span", null, "Skirting\u0173 recept\u0173")), /*#__PURE__*/React.createElement("div", {
    className: "bz-feature-stat"
  }, /*#__PURE__*/React.createElement("b", null, "1000+"), /*#__PURE__*/React.createElement("span", null, "Numest\u0173 kilogram\u0173"))))));
}
function FeatureCard({
  f
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `bz-feat-card bz-feat-${f.tone}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-feat-glyph"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "22",
    height: "22",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bz-feat-title"
  }, f.title), /*#__PURE__*/React.createElement("div", {
    className: "bz-feat-body"
  }, f.body));
}
Object.assign(window, {
  HomePage,
  FeatureCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/HomePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Navbar.jsx
try { (() => {
// Be žalos navbar — floating, centered pill that lives at the top of the page.
// Single size. Scroll behaviour:
//   • Scrolling up, or near the top → visible
//   • Scrolling down past half a viewport → slides up out of view
const {
  useState: useStateNav,
  useEffect: useEffectNav,
  useRef: useRefNav
} = React;
function Navbar({
  currentRoute,
  onNavigate,
  onLogin
}) {
  const [hidden, setHidden] = useStateNav(false);
  const [menuOpen, setMenuOpen] = useStateNav(false);
  const lastY = useRefNav(0);

  // Mobile menu — lock page scroll while open; close on Escape and on
  // resize back to desktop widths.
  useEffectNav(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = e => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1024) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);
  useEffectNav(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (y <= 6) {
        setHidden(false); // near the top → always show
      } else if (dy < -4) {
        setHidden(false); // scrolling up → reveal
      } else if (dy > 4 && y > window.innerHeight * 0.5) {
        setHidden(true); // hide only after ≥ half a screen
      }
      if (Math.abs(dy) > 2) lastY.current = y; // ignore sub-pixel jitter
    };
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [currentRoute]);
  const items = [{
    to: 'atlik-testa',
    label: 'Atlik testą'
  }, {
    to: 'virtuve',
    label: 'Virtuvė'
  }, {
    to: 'receptai',
    label: 'Receptai'
  }, {
    to: 'straipsniai',
    label: 'Straipsniai'
  }, {
    to: 'paslaugos',
    label: 'Paslaugos'
  }, {
    to: 'naryste',
    label: 'Narystė'
  }];
  const go = to => {
    setMenuOpen(false);
    onNavigate(to);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `bz-nav ${hidden && !menuOpen ? 'is-hidden' : ''} ${menuOpen ? 'is-open' : ''}`
  }, /*#__PURE__*/React.createElement("nav", {
    className: "bz-nav-pill"
  }, /*#__PURE__*/React.createElement("a", {
    className: "bz-nav-brand",
    onClick: () => onNavigate('home')
  }, /*#__PURE__*/React.createElement("span", {
    className: "bz-nav-badge",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 32 32"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M25.5 5.5C13.2 5.5 7 12.7 7 20.8c0 2.1.5 4.1 1.5 5.8C15.1 18.6 20.3 14.6 24.4 12.6c-4.2 3-9.3 7.1-13.1 14.7 1.9 1.1 4.1 1.7 6.5 1.4 8.1-1 11.6-12.8 7.7-23.2Z",
    fill: "#fff"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "bz-nav-word"
  }, "BE \u017DALOS")), /*#__PURE__*/React.createElement("span", {
    className: "bz-nav-divider",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bz-nav-items"
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.to,
    className: `bz-nav-item ${currentRoute === it.to ? 'active' : ''}`,
    onClick: () => onNavigate(it.to)
  }, /*#__PURE__*/React.createElement("span", null, it.label), /*#__PURE__*/React.createElement("div", {
    className: "bz-nav-indicator"
  })))), /*#__PURE__*/React.createElement("button", {
    className: "bz-nav-login",
    onClick: () => {
      setMenuOpen(false);
      onLogin();
    }
  }, "Prisijungti"), /*#__PURE__*/React.createElement("button", {
    className: `bz-nav-burger ${menuOpen ? 'is-open' : ''}`,
    "aria-label": menuOpen ? 'Uždaryti meniu' : 'Atidaryti meniu',
    "aria-expanded": menuOpen,
    onClick: () => setMenuOpen(!menuOpen)
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "bz-nav-menu-backdrop",
    onClick: () => setMenuOpen(false)
  }), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "bz-nav-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-nav-menu-items"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("a", {
    key: it.to,
    className: `bz-nav-menu-item ${currentRoute === it.to ? 'active' : ''}`,
    style: {
      animationDelay: `${0.05 + i * 0.035}s`
    },
    onClick: () => go(it.to)
  }, /*#__PURE__*/React.createElement("span", null, it.label), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 16 16",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 3.5 10.5 8 6 12.5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "bz-nav-menu-divider"
  }), /*#__PURE__*/React.createElement("button", {
    className: "bz-nav-menu-login",
    onClick: () => {
      setMenuOpen(false);
      onLogin();
    }
  }, "Prisijungti")));
}
Object.assign(window, {
  Navbar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Navbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/StraipsniaiPage.jsx
try { (() => {
// Straipsniai — editorial article index. Gradient "scoop" header (like Virtuvė),
// a large featured article, category chips, then a responsive card grid.
const {
  useState: useStateS
} = React;
function StraipsniaiPage({
  onOpenArticle
}) {
  const D = window.BZ_DATA;
  const [cat, setCat] = useStateS('Visi');
  const featured = D.articles.find(a => a.featured) || D.articles[0];
  const rest = D.articles.filter(a => a.id !== featured.id);
  const filtered = cat === 'Visi' ? rest : rest.filter(a => a.cat === cat);
  const open = a => onOpenArticle && onOpenArticle(a);
  return /*#__PURE__*/React.createElement("main", {
    className: "bz-straipsniai",
    "data-screen-label": "Straipsniai"
  }, /*#__PURE__*/React.createElement("section", {
    className: "bz-art-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-container"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bz-art-eyebrow"
  }, "Be \u017Ealos \u017Eurnalas"), /*#__PURE__*/React.createElement("h1", null, "Straipsniai"), /*#__PURE__*/React.createElement("p", null, "Mokslu gr\u012Fstos \u012F\u017Evalgos apie mityb\u0105, emocin\u012F valgym\u0105 ir santyk\u012F su maistu \u2014 kad poky\u010Diai vykt\u0173 su meile ir be \u017Ealos."))), /*#__PURE__*/React.createElement("div", {
    className: "bz-container"
  }, /*#__PURE__*/React.createElement("button", {
    className: "bz-art-featured",
    onClick: () => open(featured)
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-art-featured-media"
  }, /*#__PURE__*/React.createElement("img", {
    src: featured.img,
    alt: featured.title
  })), /*#__PURE__*/React.createElement("div", {
    className: "bz-art-featured-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-art-cat"
  }, featured.cat), /*#__PURE__*/React.createElement("h2", {
    className: "bz-art-featured-title"
  }, featured.title), /*#__PURE__*/React.createElement("p", {
    className: "bz-art-featured-excerpt"
  }, featured.excerpt), /*#__PURE__*/React.createElement("div", {
    className: "bz-art-meta"
  }, /*#__PURE__*/React.createElement("span", null, featured.author), /*#__PURE__*/React.createElement("span", {
    className: "bz-art-dot"
  }), /*#__PURE__*/React.createElement("span", null, featured.date), /*#__PURE__*/React.createElement("span", {
    className: "bz-art-dot"
  }), /*#__PURE__*/React.createElement("span", null, featured.readTime, " skaitymo")), /*#__PURE__*/React.createElement("span", {
    className: "bz-art-readmore"
  }, "Skaityti straipsn\u012F \u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "bz-chiprow bz-art-chiprow"
  }, D.articleCategories.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    className: `bz-chip ${cat === c ? 'active' : ''}`,
    onClick: () => setCat(c)
  }, c))), /*#__PURE__*/React.createElement("div", {
    className: "bz-art-grid"
  }, filtered.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.id,
    className: "bz-art-card",
    onClick: () => open(a)
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-art-card-media"
  }, /*#__PURE__*/React.createElement("img", {
    src: a.img,
    alt: a.title,
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("span", {
    className: "bz-art-card-cat"
  }, a.cat)), /*#__PURE__*/React.createElement("div", {
    className: "bz-art-card-body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "bz-art-card-title"
  }, a.title), /*#__PURE__*/React.createElement("p", {
    className: "bz-art-card-excerpt"
  }, a.excerpt), /*#__PURE__*/React.createElement("div", {
    className: "bz-art-meta"
  }, /*#__PURE__*/React.createElement("span", null, a.date), /*#__PURE__*/React.createElement("span", {
    className: "bz-art-dot"
  }), /*#__PURE__*/React.createElement("span", null, a.readTime)))))), filtered.length === 0 && /*#__PURE__*/React.createElement("p", {
    className: "bz-art-empty"
  }, "\u0160ioje kategorijoje straipsni\u0173 dar n\u0117ra.")));
}
Object.assign(window, {
  StraipsniaiPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/StraipsniaiPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/VirtuvePage.jsx
try { (() => {
// Virtuvė video library — grid of 5:7 photo cards with bottom gradient.
const {
  useState: useStateV
} = React;
function VirtuvePage({
  onOpenVideo
}) {
  const D = window.BZ_DATA;
  const [cat, setCat] = useStateV('Visos');
  const filtered = cat === 'Visos' ? D.videos : D.videos.filter(v => v.cat === cat);
  return /*#__PURE__*/React.createElement("main", {
    className: "bz-virtuve",
    "data-screen-label": "Virtuve"
  }, /*#__PURE__*/React.createElement("section", {
    className: "bz-virtuve-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-container"
  }, /*#__PURE__*/React.createElement("h1", null, "Virtuv\u0117"), /*#__PURE__*/React.createElement("p", null, "Video \u012Fra\u0161ai apie sveikatai palanki\u0105 mityb\u0105, emocin\u012F valgym\u0105 ir santyk\u012F su maistu \u2014 su Sandra Jatulyte."))), /*#__PURE__*/React.createElement("section", {
    className: "bz-virtuve-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-chiprow"
  }, D.categories.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    className: `bz-chip ${cat === c ? 'active' : ''}`,
    onClick: () => setCat(c)
  }, c))), /*#__PURE__*/React.createElement("div", {
    className: "bz-video-grid"
  }, filtered.map((v, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "bz-video-card",
    onClick: () => onOpenVideo(v)
  }, /*#__PURE__*/React.createElement("img", {
    src: v.img,
    alt: v.title,
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bz-video-overlay"
  }), v.isNew && /*#__PURE__*/React.createElement("div", {
    className: "bz-video-new"
  }, "Nauja"), /*#__PURE__*/React.createElement("div", {
    className: "bz-video-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bz-video-cat"
  }, v.cat), /*#__PURE__*/React.createElement("div", {
    className: "bz-video-title"
  }, v.title), /*#__PURE__*/React.createElement("div", {
    className: "bz-video-tags"
  }, v.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    className: "bz-video-tag"
  }, t))), /*#__PURE__*/React.createElement("div", {
    className: "bz-video-social"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bz-video-stat"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z"
  })), /*#__PURE__*/React.createElement("span", null, v.likes)), /*#__PURE__*/React.createElement("span", {
    className: "bz-video-stat"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"
  })), /*#__PURE__*/React.createElement("span", null, "12"))))))))));
}
Object.assign(window, {
  VirtuvePage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/VirtuvePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/data.js
try { (() => {
// Content used across views. All strings are verbatim from frontend/src or
// generated to match brand tone.

window.BZ_DATA = {
  meals: ['../../assets/images/meal-salad.webp', '../../assets/images/meal-burgeriukas.webp', '../../assets/images/meal-pancakes.webp', '../../assets/images/meal-sandwich.webp', '../../assets/images/meal-vegetables.webp'],
  experience: [{
    value: '9m+',
    desc: 'darbo patirtis'
  }, {
    value: '2,2k+',
    desc: 'laimingų klientų'
  }, {
    value: '105+',
    desc: 'mentorystės istorijos'
  }, {
    value: '1,8k+',
    desc: 'mitybos planų'
  }],
  education: [{
    row1: 'Biomedicinos bakalauras',
    row2: ''
  }, {
    row1: 'VU Psichologija',
    row2: ''
  }, {
    row1: 'Kognityvinės elgesio',
    row2: 'terapijos studijos'
  }, {
    row1: 'Schemų terapijos',
    row2: 'studijos'
  }],
  benefits: [{
    icon: '../../assets/icons/benefits/interaktyvus-mitybos-planas.svg',
    label: 'Interaktyvus mitybos planas'
  }, {
    icon: '../../assets/icons/benefits/emocinio-valgymo-dienorastis.svg',
    label: 'Emocinio valgymo dienoraštis'
  }, {
    icon: '../../assets/icons/benefits/merginu-bendruomene.svg',
    label: 'Merginų bendruomenė'
  }, {
    icon: '../../assets/icons/benefits/pokyciu-statistika.svg',
    label: 'Pokyčių statistika'
  }],
  offers: [{
    id: 'kitchen',
    theme: 'light',
    icon: '🍳',
    title: ['Be žalos', 'virtuvė'],
    body: 'Video įrašai apie sveikatai palankią mitybą, emocinį valgymą ir santykį su maistu.',
    subTitle: 'Žinios, kurios paaiškina, ne uždraudžia.',
    p1: 'Jei tik pradedi domėtis mityba ir nori solidaus pagrindo.',
    p2: 'Tinka, jei vertini gilesnį žinojimą be skubaus „daryk taip“.',
    btn: 'Sužinoti daugiau'
  }, {
    id: 'mealplan',
    theme: 'dark',
    icon: '📋',
    title: ['Mitybos planas', '„Be žalos"'],
    body: 'Asmeniškai tau pritaikytas mitybos planas padedantis suprasti, ką ir kaip valgyti, kad jaustumeisi lengviau, sočiau ir ramiau bei įveiktum mitybos ribojimus.',
    subTitle: 'Struktūra be griežtų taisyklių.',
    p1: 'Jei nori konkretaus, aiškaus plano, bet be griežtų taisyklių ar draudimų.',
    p2: 'Tinka, jei nori struktūros, bet kartu mokytis klausytis savo kūno.',
    btn: 'Pradėti planą'
  }, {
    id: 'mentorship',
    theme: 'light',
    icon: '🌱',
    title: ['Mentorystė', 'su manimi'],
    body: 'Tai individuali kelionė, kurioje gilinamės į tavo santykį su maistu, emocijomis ir saviverte. Čia daugiau nei mityba – tai terapinė pagalba mokantis suprasti save.',
    subTitle: 'Giliau nei mityba.',
    p1: 'Jei jau bandei keistis savarankiškai, bet grįžti prie tų pačių įpročių.',
    p2: 'Tinka, jei nori giliau pažvengti į save ir savo santikį su maistu.',
    btn: 'Susipažinkim'
  }],
  features: [{
    title: 'Produktų keitimas plane',
    body: 'Bet kurį produktą keisk pagal savo pomėgius — sistema perskaičiuoja makrosus už tave.',
    tone: 'active'
  }, {
    title: 'Produktų keitimas',
    body: 'Keisk pavienius produktus realiu laiku iškart receptų sąraše.',
    tone: 'idle'
  }, {
    title: 'Receptų sudarymas',
    body: 'Konstruok receptus iš plano produktų — automatinis kalorijų skaičiavimas.',
    tone: 'idle'
  }, {
    title: 'Mitybos sekimas',
    body: 'Greitas dienos suvedimas — porcijos, jautrumas, savijauta.',
    tone: 'disabled'
  }],
  videos: [{
    img: '../../assets/images/meal-salad.webp',
    cat: 'Sveika mityba',
    title: 'Salotos su kepta gile ir parmezanu',
    tags: ['Vegetariška', '15 min', 'Lengva'],
    isNew: true,
    likes: 124
  }, {
    img: '../../assets/images/meal-pancakes.webp',
    cat: 'Pusryčiai',
    title: 'Varškės blynai be cukraus',
    tags: ['Be cukraus', '20 min'],
    isNew: true,
    likes: 98
  }, {
    img: '../../assets/images/meal-vegetables.webp',
    cat: 'Vakarienė',
    title: 'Pečiuje keptos daržovės su tahini',
    tags: ['Veganiška', '40 min'],
    isNew: false,
    likes: 211
  }, {
    img: '../../assets/images/meal-burgeriukas.webp',
    cat: 'Pietūs',
    title: 'Mažas burgeris su kalakutiena',
    tags: ['Baltymai', '25 min'],
    isNew: false,
    likes: 76
  }, {
    img: '../../assets/images/meal-sandwich.webp',
    cat: 'Užkandžiai',
    title: 'Sumuštinis su avokadu',
    tags: ['Greita', '10 min'],
    isNew: true,
    likes: 44
  }, {
    img: '../../assets/images/meal-salad.webp',
    cat: 'Sveika mityba',
    title: 'Brokolių salotos su sezamais',
    tags: ['Vegetariška', '15 min'],
    isNew: false,
    likes: 33
  }],
  categories: ['Visos', 'Pusryčiai', 'Pietūs', 'Vakarienė', 'Užkandžiai', 'Sveika mityba'],
  articleCategories: ['Visi', 'Mityba', 'Emocinis valgymas', 'Santykis su maistu', 'Įpročiai', 'Istorijos'],
  articles: [{
    id: 'emocinis-valgymas',
    featured: true,
    cat: 'Emocinis valgymas',
    title: 'Kodėl valgome tada, kai iš tikrųjų nesame alkani',
    excerpt: 'Emocinis valgymas dažnai prasideda ne nuo skrandžio, o nuo minčių ir jausmų. Pažvelkim, kaip atpažinti tikrąjį alkį ir švelniai grįžti prie savęs.',
    img: '../../assets/images/article-eating.webp',
    author: 'Sandra Jatulytė',
    date: '2025 05 12',
    readTime: '7 min',
    likes: 184,
    body: [{
      t: 'p',
      x: 'Beveik kiekviena iš mūsų bent kartą atsidūrė prie atidaryto šaldytuvo vėlų vakarą — ne todėl, kad kūnas prašė maisto, o todėl, kad diena buvo per sunki, per tuščia arba tiesiog per daug. Tai nėra silpnumas ar valios stoka. Tai būdas, kuriuo mokomės nuraminti save.'
    }, {
      t: 'h',
      x: 'Kuo skiriasi fizinis ir emocinis alkis'
    }, {
      t: 'p',
      x: 'Fizinis alkis ateina palaipsniui. Jį galima atidėti, jis tenkinasi įvairiu maistu, o pavalgius jaučiamės sotūs ir ramūs. Emocinis alkis dažniausiai užklumpa staiga, reikalauja konkretaus maisto „čia ir dabar“ ir lieka nepasotinamas — net ir po didelės porcijos jaučiame, kad to neužteko.'
    }, {
      t: 'p',
      x: 'Esmė ne tame, kad emocinį valgymą reikia visiškai išnaikinti. Maistas gali būti paguoda, ir tai normalu. Problema kyla tada, kai jis tampa vieninteliu būdu susitvarkyti su jausmais.'
    }, {
      t: 'q',
      x: 'Prieš klausdama „ką noriu suvalgyti?“, pabandyk paklausti savęs: „ko man iš tikrųjų dabar reikia?“'
    }, {
      t: 'h',
      x: 'Dažniausi emocinio valgymo trigeriai'
    }, {
      t: 'p',
      x: 'Stresas, nuovargis, vienatvė, nuobodulys ir net džiaugsmas gali tapti signalu siekti maisto. Dažnai tai įvyksta automatiškai — net nespėjame pastebėti minties, kuri pakišo ranką prie spintelės.'
    }, {
      t: 'p',
      x: 'Naudinga kelias dienas tiesiog pastebėti, kada ranka tiesiasi prie užkandžio be alkio. Be vertinimo, be kaltės — tik įsiklausant. Modeliai, kuriuos pamatysi, papasakos daugiau nei bet kuri dieta.'
    }, {
      t: 'h',
      x: 'Mažas stabtelėjimas vietoje kontrolės'
    }, {
      t: 'p',
      x: 'Vietoje to, kad uždraustum sau, pabandyk įterpti vieną minutę tarp impulso ir veiksmo. Giliai įkvėpk, padėk ranką ant krūtinės ir tiesiog pasitikrink — ar tai alkis, ar nuovargis, vienatvė, įtampa? Kartais atsakymas vis tiek bus „noriu valgyti“, ir tai visiškai gerai. Bet kartais pamatysi, kad iš tiesų reikia poilsio, pokalbio ar tiesiog dešimties minučių sau.'
    }, {
      t: 'p',
      x: 'Šis stabtelėjimas nėra kontrolės įrankis. Tai būdas grįžti į kontaktą su savimi — pasiteirauti, ko nori ne dėl įpročio, o iš tikrųjų.'
    }, {
      t: 'h',
      x: 'Ką daryti, kai noras vis tiek lieka'
    }, {
      t: 'p',
      x: 'Jei stabtelėjus supranti, kad tai emocijos, pabandyk švelnų alternatyvų ritualą: šiltą arbatą, kelias gilias įkvėpimo minutes, žinutę artimam žmogui, trumpą pasivaikščiojimą ar net ašaras, jei jų reikia. Tikslas — ne nuslopinti jausmą, o jį pastebėti ir paguosti kitaip nei tik maistu.'
    }, {
      t: 'p',
      x: 'O jei vis tiek nusprendi pavalgyti — padaryk tai sąmoningai ir be kaltės. Atsisėsk, mėgaukis, leisk sau pajusti skonį. Sąmoningas valgymas dažnai sotina greičiau nei skubotas, kaltės lydimas kąsnis.'
    }, {
      t: 'h',
      x: 'Kaip kalbėtis su savimi švelniau'
    }, {
      t: 'p',
      x: 'Vidinis kritikas retai padeda keistis — dažniausiai jis tik didina įtampą, o įtampa vėl veda prie maisto. Pabandyk su savimi kalbėti taip, kaip kalbėtum su geriausia drauge: be teismo, su supratimu ir kantrybe.'
    }, {
      t: 'q',
      x: 'Tu nesi problema, kurią reikia sutvarkyti. Tu esi žmogus, kuriam reikia rūpesčio.'
    }, {
      t: 'h',
      x: 'Kada verta kreiptis pagalbos'
    }, {
      t: 'p',
      x: 'Jei valgymas tapo pagrindiniu būdu susidoroti su sunkiais jausmais, jei jis lydimas didelės kaltės ar gėdos arba jaučiesi įstrigusi rate, iš kurio nepavyksta išeiti — tai puiki priežastis kreiptis pagalbos. Ne todėl, kad kažkas „negerai su tavimi“, o todėl, kad nusipelnei palaikymo.'
    }, {
      t: 'p',
      x: 'Sąmoningas santykis su maistu kuriamas ne per griežtumą, o per smalsumą ir švelnumą sau. Kiekvienas toks stabtelėjimas — jau pokytis.'
    }]
  }, {
    id: 'pusryciai-baltymai',
    cat: 'Mityba',
    title: 'Sotūs pusryčiai: kiek baltymų iš tiesų reikia ryte',
    excerpt: 'Subalansuoti pusryčiai padeda išvengti popietinio alkio bangų. Štai paprasta formulė, kuri tinka beveik kiekvienai dienai.',
    img: '../../assets/images/article-produce.webp',
    author: 'Sandra Jatulytė',
    date: '2025 04 28',
    readTime: '5 min',
    likes: 96,
    body: [{
      t: 'p',
      x: 'Jei popiet jautiesi išalkusi ir traukia prie saldumynų, atsakymas dažnai slypi ne valios stiprume, o tame, ką valgei ryte. Baltymingi pusryčiai padeda ilgiau išlaikyti sotumą ir stabilesnę energiją per visą dieną.'
    }, {
      t: 'h',
      x: 'Paprasta ryto formulė'
    }, {
      t: 'p',
      x: 'Siek 20–30 g baltymų pusryčiams. Tai gali būti dvi kiaušinienės kiaušiniai su daržovėmis, varškės ar graikiško jogurto porcija su uogomis, arba augaliniai variantai — tofu, ankštinės, baltyminga košė su sėklomis.'
    }, {
      t: 'p',
      x: 'Prie baltymų pridėk skaidulų (daržovių ar vaisių) ir šiek tiek sveikų riebalų — taip patiekalas taps soti ir subalansuota visuma, o ne greitai praeinantis cukraus pakilimas.'
    }, {
      t: 'q',
      x: 'Geri pusryčiai — tai ne taisyklė, kurią reikia ištverti, o investicija į ramesnę dieną.'
    }, {
      t: 'p',
      x: 'Nereikia tobulumo. Net vienas baltymingesnis rytas per savaitę jau yra žingsnis link stabilesnės savijautos.'
    }]
  }, {
    id: 'santykis-su-maistu',
    cat: 'Santykis su maistu',
    title: 'Maistas nėra nei „geras", nei „blogas"',
    excerpt: 'Kai maistą skirstome į leistiną ir draudžiamą, kuriame įtampą. Kalbamės apie tai, kaip atsisakyti kaltės ir valgyti ramiau.',
    img: '../../assets/images/article-hands.webp',
    author: 'Sandra Jatulytė',
    date: '2025 04 15',
    readTime: '6 min',
    likes: 142,
    body: [{
      t: 'p',
      x: 'Kai maistą padalijame į „leistiną“ ir „uždraustą“, nejučia sukuriame įtampą. Draudžiamas produktas tampa dar viliojantis, o suvalgytas — užtraukia kaltės bangą. Taip prasideda ratas, kuris vargina ne kūną, o galvą.'
    }, {
      t: 'h',
      x: 'Kodėl moralinis vertinimas neveikia'
    }, {
      t: 'p',
      x: 'Joks produktas savaime nepadaro tavęs „gera“ ar „bloga“. Tortas gimtadienyje, duona pusryčiams ar šokoladas vakare — tai tiesiog maistas tam tikrame kontekste. Kai atsisakome moralinio ženklinimo, sumažėja ir kaltė, ir kompulsyvus noras prisivalgyti „kol dar galima“.'
    }, {
      t: 'q',
      x: 'Maistas neturi moralės. Tu nesi nei geresnė, nei blogesnė dėl to, ką suvalgei.'
    }, {
      t: 'p',
      x: 'Vietoje „ar man galima?“ pabandyk klausti „ar man dabar to norisi ir kaip jausiuosi po to?“. Šis perėjimas nuo taisyklių prie poreikių grąžina pasirinkimo laisvę ir ramybę.'
    }, {
      t: 'p',
      x: 'Sveikas santykis su maistu — tai ne tobula mityba, o galimybė valgyti be nuolatinio teismo sau.'
    }]
  }, {
    id: 'iprociai-maziems-zingsniams',
    cat: 'Įpročiai',
    title: 'Maži žingsniai, kurie iš tikrųjų išlieka',
    excerpt: 'Ilgalaikiai pokyčiai gimsta ne iš griežtų taisyklių, o iš mažų, pasikartojančių sprendimų. Kaip kurti įpročius be prievartos sau.',
    img: '../../assets/images/article-believe.webp',
    author: 'Sandra Jatulytė',
    date: '2025 03 30',
    readTime: '8 min',
    likes: 118,
    body: [{
      t: 'p',
      x: 'Naujus įpročius dažnai pradedame su dideliu užmoju: nuo pirmadienio viskas keisis. Bet kuo griežtesnis planas, tuo greičiau jis subyra — ne dėl tinginystės, o todėl, kad pernelyg dideli šuoliai mūsų nervų sistemai atrodo grėsmingi.'
    }, {
      t: 'h',
      x: 'Pradėk nuo gėdingai mažo žingsnio'
    }, {
      t: 'p',
      x: 'Vietoje „valgysiu sveikai visą savaitę“ pasirink vieną mažą, lengvai įvykdomą veiksmą: stiklinė vandens prabudus, viena daržovė prie pietų, dešimt minučių pasivaikščiojimo. Toks žingsnis turi būti toks mažas, kad jį atlikti būtų lengviau nei praleisti.'
    }, {
      t: 'q',
      x: 'Įpročiai išlieka ne dėl motyvacijos, o dėl pasikartojimo, kuris nebevargina.'
    }, {
      t: 'p',
      x: 'Kai mažas veiksmas tampa savaime suprantamu, jį natūraliai norisi praplėsti. Taip auga ne tik įprotis, bet ir pasitikėjimas savimi — kiekvienas ištesėtas pažadas sau yra įrodymas, kad gali.'
    }, {
      t: 'p',
      x: 'Pokytis nėra sprintas. Tai švelnus, kantrus judėjimas ta pačia kryptimi — net jei kartais tenka sustoti.'
    }]
  }, {
    id: 'klientes-istorija',
    cat: 'Istorijos',
    title: '„Pirmą kartą nustojau skaičiuoti kalorijas ir atsikvėpiau"',
    excerpt: 'Vienos bendruomenės narės kelionė nuo nuolatinio savęs ribojimo prie ramaus, sąmoningo santykio su maistu ir savimi.',
    img: '../../assets/images/article-kitchen.webp',
    author: 'Be žalos',
    date: '2025 03 18',
    readTime: '9 min',
    likes: 207,
    body: [{
      t: 'p',
      x: 'Kai Ieva atėjo į bendruomenę, ji jau buvo išbandžiusi viską: dešimtis dietų, kalorijų skaičiuokles, savaitgalius be angliavandenių. „Žinojau viską apie maistą, bet nieko nebejaučiau apie save“, — prisimena ji.'
    }, {
      t: 'h',
      x: 'Pokytis prasidėjo ne nuo lėkštės'
    }, {
      t: 'p',
      x: 'Pirmas žingsnis buvo netikėtas — ne naujas planas, o leidimas sustoti. Vietoje skaičiavimo Ieva pradėjo stebėti, kaip jaučiasi prieš ir po valgio. Iš pradžių tai gąsdino: be skaičių atrodė, kad viskas išslys iš rankų.'
    }, {
      t: 'q',
      x: '„Pamažu supratau, kad kūnas pats žino, kada gana — tik buvau pamiršusi jo klausytis.“'
    }, {
      t: 'p',
      x: 'Per kelis mėnesius dingo vakariniai apsivalgymai, o kartu — ir nuolatinė kaltė. „Pirmą kartą per daugelį metų galėjau suvalgyti gabalėlį torto ir tiesiog mėgautis, nesvarstydama, kiek dabar reikės atidirbti“, — sako Ieva.'
    }, {
      t: 'p',
      x: 'Jos istorija nėra apie tobulą mitybą. Ji apie tai, kaip atgauti ramybę ir pasitikėjimą savimi — žingsnis po žingsnio, be žalos.'
    }]
  }, {
    id: 'uzkandziai-be-kaltes',
    cat: 'Mityba',
    title: 'Užkandžiai be kaltės: ką turėti po ranka',
    excerpt: 'Sotus ir paprastas užkandis gali sustabdyti vakarinį apsivalgymą. Keletas idėjų, kurias paruoši per kelias minutes.',
    img: '../../assets/images/article-plate.webp',
    author: 'Sandra Jatulytė',
    date: '2025 03 04',
    readTime: '4 min',
    likes: 73,
    body: [{
      t: 'p',
      x: 'Užkandis nėra „nuodėmė“ tarp valgymų — tai normali kūno poreikio dalis. Kai po ranka turime sotaus ir paprasto maisto, daug rečiau pasiekiame nekontroliuojamą alkį, dėl kurio vėliau prisivalgome.'
    }, {
      t: 'h',
      x: 'Soties trijulė: baltymai, skaidulos, riebalai'
    }, {
      t: 'p',
      x: 'Geras užkandis derina bent du iš trijų: baltymus, skaidulas ir sveikus riebalus. Pavyzdžiui — graikiškas jogurtas su uogomis, kietas kiaušinis, sauja riešutų su vaisiumi arba daržovės su humusu.'
    }, {
      t: 'q',
      x: 'Pasiruošk soties variantą iš anksto — alkanai sau pasirinkti sunku.'
    }, {
      t: 'p',
      x: 'Svarbiausia — neturėti tikslo „kuo mažiau“. Tikslas yra pasisotinti tiek, kad iki kito valgio jaustumeisi rami, o ne išalkusi ir susierzinusi.'
    }]
  }, {
    id: 'apetito-bangos',
    cat: 'Emocinis valgymas',
    title: 'Apetito bangos vakare: iš kur jos kyla',
    excerpt: 'Vakarinis alkis dažnai turi mažiau bendro su maistu, nei atrodo. Kalbamės apie nuovargį, įtampą ir kaip į juos atsiliepti.',
    img: '../../assets/images/article-stress.webp',
    author: 'Sandra Jatulytė',
    date: '2025 02 20',
    readTime: '6 min',
    likes: 89,
    body: [{
      t: 'p',
      x: 'Diena baigta, namai tylūs — ir staiga užplūsta neaiškus noras kažko užkąsti. Vakarinės apetito bangos pažįstamos daugeliui ir dažnai turi mažiau bendro su tikru alkiu, nei atrodo.'
    }, {
      t: 'h',
      x: 'Nuovargis kalba alkio kalba'
    }, {
      t: 'p',
      x: 'Po įtemptos dienos nervų sistema ieško greito nusiraminimo, o maistas — lengviausiai pasiekiamas būdas. Be to, jei dieną valgei per mažai arba praleidai valgymus, vakare kūnas teisėtai reikalauja to, ko trūko.'
    }, {
      t: 'p',
      x: 'Pirmas žingsnis — pasitikrinti pamatus: ar šiandien pakankamai valgiau, miegojau, ilsėjausi? Dažnai vakarinį alkį numalšina ne dar viena porcija, o ankstesnis, sotesnis valgymas dieną.'
    }, {
      t: 'q',
      x: 'Vakaro alkis dažnai yra prašymas pailsėti, ne pavalgyti.'
    }, {
      t: 'p',
      x: 'Jei bangą atpažįsti kaip emocinę, pabandyk švelnų ritualą be maisto: šiltą dušą, arbatą, knygą, kelias gilias įkvėpimo minutes. O jei vis tiek nori užkąsti — padaryk tai ramiai, be kaltės.'
    }]
  }],
  // Seed comments used to populate any article's discussion on first open.
  seedComments: [{
    name: 'Greta',
    date: '2025 05 13',
    text: 'Ačiū už šį tekstą. Pirmą kartą perskaičiau kažką apie valgymą be kaltinimo ir spaudimo. Labai reikėjo.',
    likes: 12
  }, {
    name: 'Monika',
    date: '2025 05 13',
    text: 'Tas stabtelėjimas prieš atidarant šaldytuvą man tikrai padeda. Iš pradžių atrodė keista, dabar — natūralu.',
    likes: 7
  }, {
    name: 'Rūta',
    date: '2025 05 12',
    text: 'Skaitau ir atpažįstu save. Smagu žinoti, kad nesu viena su tokiais vakarais.',
    likes: 4
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/data.js", error: String((e && e.message) || e) }); }

})();
