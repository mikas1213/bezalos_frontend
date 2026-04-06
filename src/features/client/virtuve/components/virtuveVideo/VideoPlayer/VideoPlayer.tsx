import type { SyntheticEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { virtuveService } from '../../../service/virtuveService';

import type { VideoPlayerProps } from './types';

import styles from './VideoPlayer.module.scss';

export const VideoPlayer = ({ video }: VideoPlayerProps) => {
	const isTracked = useRef(false);
	const [isEnded, setIsEnded] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const navigate = useNavigate();

	const handleTimeUpdate = async (e: SyntheticEvent<HTMLVideoElement>) => {
		const videoElement = e.currentTarget;
		const currentTime = videoElement.currentTime;
		const countAfter = video?.isSnippet ? 5 : 30;

		if (currentTime > countAfter && !isTracked.current) {
			isTracked.current = true;
			try {
				await virtuveService.updateVideoViews(video?.id, video?.isSnippet);
			} catch (err) {
				isTracked.current = false;

				if (err instanceof Error) {
					const message = err.message;
					console.error(message);
				}
			} finally {
				isTracked.current = true;
			}
		}
	};

	useEffect(() => {
		isTracked.current = false;
	}, [video?.embedUrl]);

	return (
		<div className={styles.videoContainer}>
			<video
				key={video?.embedUrl}
				onContextMenu={(event) => event.preventDefault()}
				controls={true}
				poster="data:image/gif,0000"
				playsInline
				controlsList="nodownload"
				width="100%"
				onTimeUpdate={handleTimeUpdate}
				onPlay={(e) => {
					if (e.currentTarget.currentTime < 2) {
						e.currentTarget.currentTime = 0;
					}
				}}
				ref={videoRef}
				onEnded={() => {
					if (video?.isSnippet) {
						setIsEnded(true);
					}
				}}
			>
				<source src={video.embedUrl + '#t=1.0'} />
			</video>
			{video?.isSnippet && <span className={styles.snippet}>Ištrauka</span>}

			{video?.isSnippet && isEnded && (
				<div className={styles.paywallOverlay}>
					<div className={styles.paywallContent}>
						<div className={styles.paywallLock}>
							<svg
								width="32"
								height="32"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
								<path d="M7 11V7a5 5 0 0 1 10 0v4" />
							</svg>
						</div>
						<h3 className={styles.paywallTitle}>Prisijunk prie narystės ir tęsk toliau</h3>
						<p className={styles.paywallDesc}>Nuo €16,90/mėn. – prieiga prie viso turinio</p>
						<div className={styles.paywallActions}>
							<button type="button" className={styles.paywallBtnPrimary} onClick={() => navigate('/paslaugos')}>
								Pradėti dabar
							</button>
							<button
								type="button"
								className={styles.paywallBtnSecondary}
								onClick={() => {
									setIsEnded(false);
									if (videoRef.current) {
										videoRef.current.currentTime = 0;
										videoRef.current.play();
									}
								}}
							>
								Žiūrėti iš naujo
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
