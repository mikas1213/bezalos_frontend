// Promo modal — matches Banner.tsx (cream card, photo-side layout, lime CTA).

function Banner({ onClose, onCta }) {
  return (
    <div className="bz-banner-backdrop" onClick={onClose}>
      <div className="bz-banner-modal" onClick={(e) => e.stopPropagation()}>
        <button className="bz-banner-close" onClick={onClose} aria-label="Užverti">×</button>

        <div className="bz-banner-photo">
          <img src="../../assets/images/pasimatom-netrukus.webp"
               onError={(e) => { e.currentTarget.src = '../../assets/images/author.webp'; }}
               alt="" />
          <div className="bz-banner-fade" />
        </div>

        <div className="bz-banner-content">
          <div className="bz-banner-eyebrow">— IŠBANDYK NEMOKAMAI</div>
          <h2 className="bz-banner-title">
            Žiūrėk video įrašų ištraukas&nbsp;
            <em>nemokamai</em>
          </h2>
          <p className="bz-banner-body">
            Pokalbiai apie emocinį valgymą, santykį su maistu ir vidinį nuovargį.
          </p>
          <div className="bz-banner-cta-area">
            <button className="bz-banner-cta" onClick={onCta}>ŽIŪRĖTI DABAR</button>
            <div className="bz-banner-trust">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>Jokių įsipareigojimų</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Banner });
