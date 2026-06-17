// Be žalos footer — cream card with newsletter pill, links, social, copyright.

function Footer() {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <footer className="bz-footer" data-screen-label="Footer">
      <div className="bz-container bz-footer-inner">
        <h3 className="bz-footer-title">
          <span>Keliaujam į ilgalaikius&nbsp;</span><span>pokyčius kartu?</span>
        </h3>
        <p className="bz-footer-text">
          Gauk palaikymą ir mokslu grįstą informaciją, kaip pagaliau pasiekti
          ilgalaikių rezultatų su meile ir be žalos
        </p>

        <form className="bz-newsletter" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <input
            type="email" required
            value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Tavo el. paštas"
            className={submitted ? 'valid' : ''} />
          <button type="submit" disabled={!email}>
            {submitted ? 'Ačiū!' : 'Užsisakyti naujienas'}
          </button>
        </form>

        <div className="bz-footer-meta">
          <a className="bz-footer-logo" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img src="../../assets/logo/be-zalos-logo.svg" alt="be žalos" />
          </a>
          <div className="bz-footer-links">
            <a>Kontaktai</a>
            <a>Pirkimo taisyklės</a>
            <a>Privatumo politika</a>
          </div>
          <div className="bz-footer-social">
            <img src="../../assets/icons/social/facebook.svg" alt="Facebook" />
            <img src="../../assets/icons/social/instagram.svg" alt="Instagram" />
            <img src="../../assets/icons/social/envelope.svg" alt="Email" />
          </div>
        </div>

        <div className="bz-footer-divider" />
        <div className="bz-footer-copy"><span>©</span><span>2025 Be žalos</span></div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
