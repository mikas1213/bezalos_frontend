import { Award, Coffee, Heart, Smile, Sparkles } from 'lucide-react';

import { Container } from '../../../../../components/Shared';

const PaslaugosNereikiaPage = () => {
	return (
		<Container maxWidth="var(--content-width)">
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{/* Congratulations Section */}
				<div
					style={{
						textAlign: 'center',
						marginBottom: '60px',
						animation: 'fadeInUp 0.6s ease-out',
					}}
				>
					<div
						style={{
							fontSize: '80px',
							marginBottom: '24px',
							animation: 'bounce 1s ease-out 0.3s',
						}}
					>
						💚
					</div>

					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: '8px',
							background: 'hsl(100, 60%, 60%)',
							padding: '10px 24px',
							borderRadius: '999px',
							marginBottom: '24px',
							boxShadow: '0 4px 16px hsla(100, 60%, 60%, 0.3)',
						}}
					>
						<Award size={18} color="white" />
						<span
							style={{
								fontSize: '14px',
								fontWeight: '700',
								color: 'white',
								textTransform: 'uppercase',
								letterSpacing: '1px',
							}}
						>
							Puikūs rezultatai
						</span>
					</div>

					<h1
						style={{
							fontSize: 'clamp(36px, 6vw, 56px)',
							fontWeight: '800',
							color: 'var(--dark-green-500)',
							marginBottom: '20px',
							lineHeight: '1.2',
						}}
					>
						Jūs turite sveikus valgymo įpročius!
					</h1>

					<p
						style={{
							fontSize: 'clamp(18px, 2.5vw, 24px)',
							color: 'hsl(100, 60%, 40%)',
							fontWeight: '600',
							marginBottom: '24px',
						}}
					>
						Sveikiname! Turite sveiką santykį su maistu
					</p>

					<p
						style={{
							fontSize: '17px',
							lineHeight: '1.8',
							color: '#4a5568',
							maxWidth: '650px',
							margin: '0 auto',
						}}
					>
						Jūsų anketos rezultatai rodo, kad neturite išreikšto emocinio, išorinio ar kontroliuojančio valgymo įpročių.
						Tai puikus pasiekimas!
					</p>
				</div>

				{/* Final Message */}
				<div
					style={{
						alignSelf: 'center',
						textAlign: 'center',
						maxWidth: '800px',
						padding: '40px',
						marginBottom: '40px',
						background: 'linear-gradient(135deg, hsl(100, 65%, 95%) 0%, hsl(100, 60%, 98%) 100%)',
						borderRadius: '24px',
						border: '2px solid hsl(100, 60%, 60%)',
						animation: 'fadeInUp 0.6s ease-out 0.3s both',
					}}
				>
					<Sparkles size={32} color="hsl(100, 60%, 45%)" style={{ marginBottom: '16px' }} />
					<h3
						style={{
							fontSize: '24px',
							fontWeight: '700',
							color: 'var(--dark-green-500)',
							marginBottom: '12px',
						}}
					>
						Tęskite tai ką darote!
					</h3>
					<p
						style={{
							fontSize: '16px',
							lineHeight: '1.7',
							color: '#4a5568',
							maxWidth: '500px',
							margin: '0 auto',
						}}
					>
						Jei ateityje norėsite pasitikrinti ar atnaujinti rezultatus, visada galite grįžti ir užpildyti anketą iš
						naujo 💚
					</p>
				</div>

				{/* Tips Cards */}
				<div>
					<h2
						style={{
							fontSize: '28px',
							fontWeight: '700',
							color: 'var(--dark-green-500)',
							marginBottom: '32px',
							textAlign: 'center',
							animation: 'fadeInUp 0.6s ease-out 0.6s both',
						}}
					>
						Kaip išlaikyti sveikus įpročius?
					</h2>

					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
							gap: '24px',
							marginBottom: '60px',
						}}
					>
						<div
							style={{
								background: 'white',
								borderRadius: '20px',
								padding: '32px',
								boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
								border: '1px solid #e2e8f0',
								transition: 'all 0.3s ease',
								animation: 'fadeInUp 0.6s ease-out 0.7s both',
							}}
							onMouseOver={(e) => {
								e.currentTarget.style.transform = 'translateY(-4px)';
								e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
							}}
							onMouseOut={(e) => {
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
							}}
						>
							<div
								style={{
									width: '56px',
									height: '56px',
									borderRadius: '14px',
									background: 'linear-gradient(135deg, hsl(100, 60%, 70%) 0%, hsl(100, 60%, 50%) 100%)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginBottom: '20px',
								}}
							>
								<Heart size={28} color="white" strokeWidth={2} />
							</div>
							<h3
								style={{
									fontSize: '18px',
									fontWeight: '700',
									color: 'var(--dark-green-500)',
									marginBottom: '12px',
								}}
							>
								Klausyk savo kūno
							</h3>
							<p
								style={{
									fontSize: '15px',
									lineHeight: '1.7',
									color: '#4a5568',
									margin: 0,
								}}
							>
								Pažink savo alkio ir sotumo signalus. Tai pagrindinis būdas išlaikyti sveiką santykį su maistu.
							</p>
						</div>

						<div
							style={{
								background: 'white',
								borderRadius: '20px',
								padding: '32px',
								boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
								border: '1px solid #e2e8f0',
								transition: 'all 0.3s ease',
								animation: 'fadeInUp 0.6s ease-out 0.4s both',
							}}
							onMouseOver={(e) => {
								e.currentTarget.style.transform = 'translateY(-4px)';
								e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
							}}
							onMouseOut={(e) => {
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
							}}
						>
							<div
								style={{
									width: '56px',
									height: '56px',
									borderRadius: '14px',
									background: 'linear-gradient(135deg, hsl(100, 60%, 70%) 0%, hsl(100, 60%, 50%) 100%)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginBottom: '20px',
								}}
							>
								<Smile size={28} color="white" strokeWidth={2} />
							</div>
							<h3
								style={{
									fontSize: '18px',
									fontWeight: '700',
									color: 'var(--dark-green-500)',
									marginBottom: '12px',
								}}
							>
								Mėgaukis maistu
							</h3>
							<p
								style={{
									fontSize: '15px',
									lineHeight: '1.7',
									color: '#4a5568',
									margin: 0,
								}}
							>
								Leisk sau mėgautis įvairove be kaltės jausmo.
							</p>
						</div>

						<div
							style={{
								background: 'white',
								borderRadius: '20px',
								padding: '32px',
								boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
								border: '1px solid #e2e8f0',
								transition: 'all 0.3s ease',
								animation: 'fadeInUp 0.6s ease-out 0.5s both',
							}}
							onMouseOver={(e) => {
								e.currentTarget.style.transform = 'translateY(-4px)';
								e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
							}}
							onMouseOut={(e) => {
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
							}}
						>
							<div
								style={{
									width: '56px',
									height: '56px',
									borderRadius: '14px',
									background: 'linear-gradient(135deg, hsl(100, 60%, 70%) 0%, hsl(100, 60%, 50%) 100%)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									marginBottom: '20px',
								}}
							>
								<Coffee size={28} color="white" strokeWidth={2} />
							</div>
							<h3
								style={{
									fontSize: '18px',
									fontWeight: '700',
									color: 'var(--dark-green-500)',
									marginBottom: '12px',
								}}
							>
								Išlaikyk balansą
							</h3>
							<p
								style={{
									fontSize: '15px',
									lineHeight: '1.7',
									color: '#4a5568',
									margin: 0,
								}}
							>
								Gyvenimas yra apie pusiausvyrą - ne apie tobulumą. Tiesiog mėgaukis.
							</p>
						</div>
					</div>
				</div>
			</div>

			<style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

            @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
            }

            @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
            }
        `}</style>
		</Container>
	);
};

export default PaslaugosNereikiaPage;
