// Receptai — recipe library. Light editorial header w/ search, a compact
// favorites row, a modern grouped filter bar (with macro legend), and a
// clean recipe-card grid.
const { useState: useStateR, useMemo: useMemoR } = React;

/* ── Inline icons ──────────────────────────────────────────────── */
const RIcon = {
	search: (p) => (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
			<circle cx="11" cy="11" r="7" />
			<path d="m20 20-3.2-3.2" />
		</svg>
	),
	clock: (p) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...p}
		>
			<circle cx="12" cy="12" r="9" />
			<path d="M12 7v5l3 2" />
		</svg>
	),
	gauge: (p) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...p}
		>
			<path d="M12 14a4 4 0 0 0 4-4" />
			<path d="M3 16a9 9 0 1 1 18 0" />
			<path d="M12 14 9.5 8.5" />
		</svg>
	),
	star: (p) => (
		<svg viewBox="0 0 24 24" fill="currentColor" {...p}>
			<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />
		</svg>
	),
	heart: (p) => (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" {...p}>
			<path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
		</svg>
	),
	heartFill: (p) => (
		<svg viewBox="0 0 24 24" fill="currentColor" {...p}>
			<path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
		</svg>
	),
	bookmark: (p) => (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" {...p}>
			<path d="M6 4h12v16l-6-4-6 4z" />
		</svg>
	),
	bookmarkFill: (p) => (
		<svg viewBox="0 0 24 24" fill="currentColor" {...p}>
			<path d="M6 4h12v16l-6-4-6 4z" />
		</svg>
	),
	fire: (p) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...p}
		>
			<path d="M12 3c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1.2.4-2 1-2.8C9 10 10 8 12 3z" />
			<path d="M8 13a4 4 0 1 0 8 0c0-1-.5-2-1-2.5" />
		</svg>
	),
	chevron: (p) => (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...p}
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	),
};

// Tweak defaults — second filter-section variant + accent, switchable via Tweaks.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
	filtersStyle: 'Kortelė',
	accent: '#7ed957',
}; /*EDITMODE-END*/

function macroDots(macro) {
	const colors = { A: 'var(--macro-a)', B: 'var(--macro-b)', R: 'var(--macro-r)' };
	return (
		<span className="bz-rcp-macro">
			<span className="bz-rcp-macro-dots">
				{macro.split('+').map((k) => (
					<span key={k} className="bz-rcp-macro-dot" style={{ background: colors[k] }} />
				))}
			</span>
			<span className="bz-rcp-macro-txt">{macro}</span>
		</span>
	);
}

/* ── Recipe card — clean editorial ─────────────────────────────── */
function RecipeCard({ r, saved, liked, onToggleSave, onToggleLike }) {
	return (
		<button className="bz-rcp-card bz-rc1">
			<div className="bz-rc1-media">
				<img src={r.img} alt={r.title} loading="lazy" />
				<span className="bz-rcp-imgpill">{r.cat}</span>
				<span
					className={`bz-rcp-fab ${saved ? 'on' : ''}`}
					role="button"
					onClick={(e) => {
						e.stopPropagation();
						onToggleSave();
					}}
				>
					{saved ? <RIcon.bookmarkFill /> : <RIcon.bookmark />}
				</span>
			</div>
			<div className="bz-rc1-body">
				<div className="bz-rc1-top">
					<span className="bz-rcp-im bz-rcp-star">
						<RIcon.star />
						<b>{r.rating.toFixed(1)}</b>
					</span>
					{macroDots(r.macro)}
				</div>
				<h3 className="bz-rc1-title">{r.title}</h3>
				<div className="bz-rc1-meta">
					<span className="bz-rcp-im">
						<RIcon.clock />
						{r.time} min.
					</span>
					<span className="bz-rcp-im">
						<RIcon.gauge />
						{r.difficulty}
					</span>
				</div>
				<div className="bz-rc1-divider" />
				<div className="bz-rc1-foot">
					<span className="bz-rcp-im">
						<RIcon.fire />
						{r.kcal} kcal
					</span>
					<span
						className={`bz-rc1-like ${liked ? 'on' : ''}`}
						role="button"
						onClick={(e) => {
							e.stopPropagation();
							onToggleLike();
						}}
					>
						{liked ? <RIcon.heartFill width="17" height="17" /> : <RIcon.heart />}
						{r.likes + (liked ? 1 : 0)}
					</span>
				</div>
			</div>
		</button>
	);
}

function ReceptaiPage() {
	const D = window.BZ_DATA;
	const F = D.recipeFilters;
	const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);

	const [cat, setCat] = useStateR('Visi');
	const [q, setQ] = useStateR('');
	const [time, setTime] = useStateR(null);
	const [macro, setMacro] = useStateR(null);
	const [taste, setTaste] = useStateR(null);
	const [saved, setSaved] = useStateR(() => new Set());
	const [liked, setLiked] = useStateR(() => new Set());

	const toggle = (setFn) => (key) =>
		setFn((prev) => {
			const next = new Set(prev);
			next.has(key) ? next.delete(key) : next.add(key);
			return next;
		});
	const toggleSave = toggle(setSaved);
	const toggleLike = toggle(setLiked);

	const inTimeBucket = (t, id) => {
		if (!id) return true;
		if (id === 'lt15') return t <= 15;
		if (id === '15-30') return t > 15 && t <= 30;
		if (id === '30-60') return t > 30 && t <= 60;
		if (id === 'gt60') return t > 60;
		return true;
	};

	const filtered = useMemoR(
		() =>
			D.recipes.filter((r) => {
				const catOk = cat === 'Visi' ? true : cat === 'Be mėsos' ? r.meatless : r.cat === cat;
				return catOk && inTimeBucket(r.time, time) && (!macro || r.macro === macro) && (!taste || r.taste === taste);
			}),
		[cat, time, macro, taste],
	);

	const hasFilters = cat !== 'Visi' || time || macro || taste;
	const clearAll = () => {
		setCat('Visi');
		setTime(null);
		setMacro(null);
		setTaste(null);
	};

	return (
		<main className="bz-rcp" data-screen-label="Receptai" style={{ '--rcp-accent': tw.accent }}>
			{/* ── Header ── */}
			<section className="bz-rcp-header">
				<div className="bz-container">
					<div className="bz-rcp-header-inner">
						<div className="bz-rcp-header-text">
							<h1>
								Receptai, kurie maitina, <span>o ne riboja</span>
							</h1>
							<p>Paprasti, sotūs ir subalansuoti patiekalai — su aiškiais makrosais ir laiku.</p>
						</div>

						<div className="bz-rcp-header-search">
							<div className="bz-rcp-search">
								<span className="bz-rcp-search-ico">
									<RIcon.search width="20" height="20" />
								</span>
								<input
									type="text"
									value={q}
									onChange={(e) => setQ(e.target.value)}
									placeholder="Ieškok recepto ar ingrediento…"
									aria-label="Paieška"
								/>
								{q && (
									<button className="bz-rcp-search-clear" aria-label="Išvalyti paiešką" onClick={() => setQ('')}>
										<svg
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
										>
											<path d="M6 6l12 12M18 6 6 18" />
										</svg>
									</button>
								)}
								<button className="bz-rcp-search-btn">Ieškoti</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className="bz-container">
				{/* ── Filters ── */}
				{tw.filtersStyle === 'Juosta' ? (
					<section className="bz-rcp-filterbar">
						<div className="bz-rcp-seg">
							{F.categories.map((c) => (
								<button key={c} className={`bz-rcp-segbtn ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
									{c}
								</button>
							))}
						</div>
						<div className="bz-rcp-barctl">
							<label className="bz-rcp-select">
								<select value={time || ''} onChange={(e) => setTime(e.target.value || null)}>
									<option value="">Visa trukmė</option>
									{F.time.map((t) => (
										<option key={t.id} value={t.id}>
											{t.label}
										</option>
									))}
								</select>
								<RIcon.chevron />
							</label>
							<label className="bz-rcp-select">
								<select value={macro || ''} onChange={(e) => setMacro(e.target.value || null)}>
									<option value="">Visi makro</option>
									{F.macro.map((m) => (
										<option key={m} value={m}>
											{m}
										</option>
									))}
								</select>
								<RIcon.chevron />
							</label>
							<label className="bz-rcp-select">
								<select value={taste || ''} onChange={(e) => setTaste(e.target.value || null)}>
									<option value="">Visi skoniai</option>
									{F.taste.map((t) => (
										<option key={t} value={t}>
											{t}
										</option>
									))}
								</select>
								<RIcon.chevron />
							</label>
							<button className="bz-rcp-clear" onClick={clearAll} disabled={!hasFilters}>
								Išvalyti
							</button>
						</div>
					</section>
				) : (
					<section className="bz-rcp-filters">
						<div className="bz-rcp-filter-primary">
							{F.categories.map((c) => (
								<button key={c} className={`bz-rcp-cat ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
									{c}
								</button>
							))}
						</div>

						<div className="bz-rcp-filter-divider" />

						<div className="bz-rcp-filter-groups">
							<div className="bz-rcp-fgroup">
								<span className="bz-rcp-fgroup-label">Trukmė</span>
								<div className="bz-rcp-fgroup-pills">
									{F.time.map((t) => (
										<button
											key={t.id}
											className={`bz-rcp-pill ${time === t.id ? 'active' : ''}`}
											onClick={() => setTime(time === t.id ? null : t.id)}
										>
											{t.label}
										</button>
									))}
								</div>
							</div>
							<div className="bz-rcp-fgroup">
								<span className="bz-rcp-fgroup-label">Makro pjūvis</span>
								<div className="bz-rcp-fgroup-pills">
									{F.macro.map((m) => (
										<button
											key={m}
											className={`bz-rcp-pill ${macro === m ? 'active' : ''}`}
											onClick={() => setMacro(macro === m ? null : m)}
										>
											{m}
										</button>
									))}
								</div>
							</div>
							<div className="bz-rcp-fgroup">
								<span className="bz-rcp-fgroup-label">Skonis</span>
								<div className="bz-rcp-fgroup-pills">
									{F.taste.map((t) => (
										<button
											key={t}
											className={`bz-rcp-pill ${taste === t ? 'active' : ''}`}
											onClick={() => setTaste(taste === t ? null : t)}
										>
											{t}
										</button>
									))}
								</div>
							</div>
						</div>
					</section>
				)}

				{/* ── Toolbar ── */}
				<div className="bz-rcp-toolbar">
					<div className="bz-rcp-count">
						Iš viso rasta <b>{filtered.length}</b> {filtered.length === 1 ? 'receptas' : 'receptų'}
					</div>
					<div className="bz-rcp-macrokey">
						{D.macroLegend.map((m) => (
							<span key={m.key} className="bz-rcp-macrokey-item">
								<span className="bz-rcp-macrokey-dot" style={{ background: m.color }} />
								<b>{m.key}</b> {m.label.toLowerCase()}
							</span>
						))}
					</div>
				</div>

				{/* ── Grid ── */}
				{filtered.length > 0 ? (
					<div className="bz-rcp-grid">
						{filtered.map((r, i) => (
							<RecipeCard
								key={r.title + i}
								r={r}
								saved={saved.has(r.title)}
								liked={liked.has(r.title)}
								onToggleSave={() => toggleSave(r.title)}
								onToggleLike={() => toggleLike(r.title)}
							/>
						))}
					</div>
				) : (
					<p className="bz-rcp-empty">
						Pagal pasirinktus filtrus receptų nerasta. Pabandyk{' '}
						<button className="bz-rcp-clear" onClick={clearAll}>
							išvalyti filtrus
						</button>
						.
					</p>
				)}
			</div>
		</main>
	);
}

Object.assign(window, { ReceptaiPage });
