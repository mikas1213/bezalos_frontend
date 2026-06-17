// App shell — manages route state, scroll state, video modal, promo banner.
const { useState: useStateApp, useEffect: useEffectApp } = React;

function App() {
  const [route, setRoute] = useStateApp('home');
  const [scrollY, setScrollY] = useStateApp(0);
  const [bannerOpen, setBannerOpen] = useStateApp(false);
  const [videoToast, setVideoToast] = useStateApp(null);
  const [article, setArticle] = useStateApp(null);

  useEffectApp(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffectApp(() => {
    // Show banner after a short delay on first visit
    if (sessionStorage.getItem('bz_bannerShown')) return;
    const t = setTimeout(() => { setBannerOpen(true); sessionStorage.setItem('bz_bannerShown', '1'); }, 1500);
    return () => clearTimeout(t);
  }, []);

  function navigate(to) {
    setRoute(to);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function openVideo(v) {
    setVideoToast(v);
    setTimeout(() => setVideoToast(null), 3500);
  }

  function openArticle(a) {
    setArticle(a);
    setRoute('article');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  return (
    <>
      <Navbar
        page={route === 'home' ? 'home' : 'default'}
        currentRoute={route}
        onNavigate={navigate}
        onLogin={() => setBannerOpen(true)}
        scrollY={scrollY} />

      {route === 'home'       && <HomePage onNavigate={navigate} />}
      {route === 'virtuve'    && <VirtuvePage onOpenVideo={openVideo} />}
      {route === 'straipsniai' && <StraipsniaiPage onOpenArticle={openArticle} />}
      {route === 'article' && article && (
        <ArticlePage article={article} onBack={() => navigate('straipsniai')} onOpenArticle={openArticle} />
      )}
      {route !== 'home' && route !== 'virtuve' && route !== 'straipsniai' && route !== 'article' && (
        <main className="bz-soon" data-screen-label={route}>
          <div className="bz-container">
            <h1>Pasimatom netrukus</h1>
            <p>Šis puslapis – „{route}" – kuriamas. Šiame UI kit'e išsami yra
               tik <a onClick={() => navigate('home')}>pradžia</a>,
               <a onClick={() => navigate('virtuve')}> Virtuvė</a> ir
               <a onClick={() => navigate('straipsniai')}> Straipsniai</a>.</p>
          </div>
        </main>
      )}

      <Footer />

      {bannerOpen && (
        <Banner
          onClose={() => setBannerOpen(false)}
          onCta={() => { setBannerOpen(false); navigate('virtuve'); }} />
      )}

      {videoToast && (
        <div className="bz-toast">
          <img src={videoToast.img} alt="" />
          <div>
            <div className="bz-toast-cat">{videoToast.cat}</div>
            <div className="bz-toast-title">{videoToast.title}</div>
            <div className="bz-toast-hint">{videoToast.hint || 'Video grotuvas šiame prototipe neįjungtas.'}</div>
          </div>
        </div>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
