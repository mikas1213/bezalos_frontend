
// Be žalos navbar — floating, centered pill that lives at the top of the page.
// Single size. Scroll behaviour:
//   • Scrolling up, or near the top → visible
//   • Scrolling down past half a viewport → slides up out of view
const { useState: useStateNav, useEffect: useEffectNav, useRef: useRefNav } = React;

function Navbar({ currentRoute, onNavigate, onLogin }) {
  const [hidden, setHidden] = useStateNav(false);
  const [menuOpen, setMenuOpen] = useStateNav(false);
  const lastY = useRefNav(0);

  // Mobile menu — lock page scroll while open; close on Escape and on
  // resize back to desktop widths.
  useEffectNav(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    const onResize = () => { if (window.innerWidth > 1024) setMenuOpen(false); };
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
        setHidden(false);                       // near the top → always show
      } else if (dy < -4) {
        setHidden(false);                       // scrolling up → reveal
      } else if (dy > 4 && y > window.innerHeight * 0.5) {
        setHidden(true);                         // hide only after ≥ half a screen
      }

      if (Math.abs(dy) > 2) lastY.current = y;   // ignore sub-pixel jitter
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [currentRoute]);

  const items = [
    { to: 'atlik-testa',  label: 'Atlik testą' },
    { to: 'virtuve',      label: 'Virtuvė' },
    { to: 'receptai',     label: 'Receptai' },
    { to: 'straipsniai',  label: 'Straipsniai' },
    { to: 'paslaugos',    label: 'Paslaugos' },
    { to: 'naryste',      label: 'Narystė' },
  ];

  const go = (to) => { setMenuOpen(false); onNavigate(to); };

  return (
    <div className={`bz-nav ${hidden && !menuOpen ? 'is-hidden' : ''} ${menuOpen ? 'is-open' : ''}`}>
      <nav className="bz-nav-pill">
        <a className="bz-nav-brand" onClick={() => onNavigate('home')}>
          <span className="bz-nav-badge" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <path d="M25.5 5.5C13.2 5.5 7 12.7 7 20.8c0 2.1.5 4.1 1.5 5.8C15.1 18.6 20.3 14.6 24.4 12.6c-4.2 3-9.3 7.1-13.1 14.7 1.9 1.1 4.1 1.7 6.5 1.4 8.1-1 11.6-12.8 7.7-23.2Z" fill="#fff"/>
            </svg>
          </span>
          <span className="bz-nav-word">BE ŽALOS</span>
        </a>

        <span className="bz-nav-divider" aria-hidden="true"></span>

        <div className="bz-nav-items">
          {items.map((it) => (
            <a key={it.to}
               className={`bz-nav-item ${currentRoute === it.to ? 'active' : ''}`}
               onClick={() => onNavigate(it.to)}>
              <span>{it.label}</span>
              <div className="bz-nav-indicator"></div>
            </a>
          ))}
        </div>

        <button className="bz-nav-login" onClick={() => { setMenuOpen(false); onLogin(); }}>Prisijungti</button>

        <button
          className={`bz-nav-burger ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Uždaryti meniu' : 'Atidaryti meniu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
        </button>
      </nav>

      {menuOpen && (
        <div className="bz-nav-menu-backdrop" onClick={() => setMenuOpen(false)}></div>
      )}

      {menuOpen && (
        <div className="bz-nav-menu">
          <div className="bz-nav-menu-items">
            {items.map((it, i) => (
              <a key={it.to}
                 className={`bz-nav-menu-item ${currentRoute === it.to ? 'active' : ''}`}
                 style={{ animationDelay: `${0.05 + i * 0.035}s` }}
                 onClick={() => go(it.to)}>
                <span>{it.label}</span>
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            ))}
          </div>
          <div className="bz-nav-menu-divider"></div>
          <button className="bz-nav-menu-login" onClick={() => { setMenuOpen(false); onLogin(); }}>
            Prisijungti
          </button>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Navbar });
