import { useState } from 'react';

import { Link } from 'react-router-dom';

import cx from 'classnames';

import type { VideoCardProps } from './types';

import styles from './VideoCard.module.scss';

export const VideoCard = ({ video, index = 0 }: VideoCardProps) => {
	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<Link to={video.slug} className={styles.card} style={{ animationDelay: `${index * 60}ms` }}>
			<img
				className={cx(styles.cardImage, { [styles.cardImageLoaded]: imageLoaded })}
				src={`https://bezalos.s3.us-east-1.amazonaws.com/${video.image_s3_key}`}
				alt={video.title}
				onLoad={() => setImageLoaded(true)}
			/>
			<div className={styles.cardOverlay}></div>

			<div className={styles.cardContent}>
				<div className={styles.cardBody}>
					<span className={styles.category}>{video.category}</span>
					<h2 className={styles.title}>{video.title}</h2>
					<p className={styles.description}>{video.description}</p>
				</div>
				<div className={styles.footer}>
					<div className={styles.tags}>
						{video.video_tags.map((tag) => (
							<span key={tag} className={styles.tag}>
								{tag}
							</span>
						))}
					</div>
					<div className={styles.social}>
						<div className={styles.side}>
							<div className={styles.socialItem}>
								<span className={styles.icon}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 -960 960 960"
										width="24px"
										fill="var(--white-100)"
									>
										<path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5Z" />
									</svg>
								</span>
								<span className={styles.value}>{video.views_total}</span>
							</div>
							<div className={styles.socialItem}>
								<span className={styles.icon}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 -960 960 960"
										width="24px"
										fill="var(--white-100)"
									>
										<path d="M160-240q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720L720-240H160Z" />
									</svg>
								</span>
								<span className={styles.value}>{video.comment_count}</span>
							</div>
						</div>
						<div className={cx(styles.side, styles.socialItem)}>
							<span className={styles.icon}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									fill="var(--white-100)"
								>
									<path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
								</svg>
							</span>
							<span className={styles.value}>{video.likes_count}</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};
