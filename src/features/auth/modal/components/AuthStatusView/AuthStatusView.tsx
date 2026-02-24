import { ExternalLink } from 'lucide-react';

import { useAuthentication } from '../../hooks/useAuthentication';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { InfoBox } from '../InfoBox';
import { ResendEmail } from '../ResendEmail';
import { SubmitButton } from '../SubmitButton';

import { AUTH_MODE_CONTENT } from './constants';
import type { Field } from './types';

import styles from './AuthStatusView.module.scss';
export const AuthStatusView = () => {
	const { authMode, setAuthMode, userEmail } = useAuthentication();
	const maskedEmail = userEmail?.replace(
		/^(.{2})(.*)(@.*)$/,
		(_, start, middle, domain) => start + '•'.repeat(middle.length) + domain,
	);

	const {
		title,
		subTitle,
		infoTitle,
		infoDescription,
		boldWord,
		submitLabel,
		submitMode,
		footerLabel,
		actionLabel,
		actionMode,
	} = AUTH_MODE_CONTENT[authMode as Field];

	return (
		<>
			<Header title={title} subTitle={subTitle} />

			{authMode === 'forgotSuccess' && <p className={styles?.maskedEmail}>{maskedEmail}</p>}

			<InfoBox title={infoTitle} subTitle={infoDescription} boldWord={boldWord} />

			{authMode === 'forgotSuccess' && <ResendEmail />}

			{authMode === 'forgotSuccess' ? (
				<div className={styles.openEmailWrapper}>
					<a
						href="https://mail.google.com"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.openEmailBtn}
					>
						<ExternalLink size={18} />
						{submitLabel}
					</a>
				</div>
			) : (
				<SubmitButton
					type="button"
					label={submitLabel}
					onClick={() => setAuthMode(submitMode)}
				/>
			)}

			{['forgotSuccess', 'loginAgain', 'signupAgain'].includes(authMode) && (
				<Footer>
					{authMode === 'forgotSuccess' ? (
						<Footer.BackToLogin actionLabel={actionLabel} mode="login" />
					) : (
						<Footer.SwitchAuth
							footerLabel={footerLabel}
							actionLabel={actionLabel}
							mode={actionMode}
						/>
					)}
				</Footer>
			)}
		</>
	);
};
