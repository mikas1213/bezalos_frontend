import { type SubmitEvent, useState } from 'react';

import cx from 'classnames';
import { Heart } from 'lucide-react';

import { useArticleComments } from '../../hooks';
import { initials } from '../../utils/initials';

import styles from './ArticleComments.module.scss';

interface ArticleCommentsProps {
	articleId: string;
}

export const ArticleComments = ({ articleId }: ArticleCommentsProps) => {
	const { comments, addComment, toggleLike } = useArticleComments(articleId);
	const [name, setName] = useState('');
	const [text, setText] = useState('');

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!text.trim()) return;
		addComment(name, text);
		setName('');
		setText('');
	};

	return (
		<section className={styles.comments}>
			<h3 className={styles.commentsTitle}>
				Komentarai <span>({comments.length})</span>
			</h3>

			<form className={styles.commentForm} onSubmit={handleSubmit}>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className={styles.commentName}
					placeholder="Tavo vardas (nebūtina)"
				/>
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					className={styles.commentText}
					rows={3}
					placeholder="Pasidalink mintimis švelniai ir su pagarba…"
				/>
				<div className={styles.commentActions}>
					<button type="submit" className={styles.commentSubmit} disabled={!text.trim()}>
						Komentuoti
					</button>
				</div>
			</form>

			<ul className={styles.commentList}>
				{comments.map((comment) => (
					<li key={comment.id} className={styles.comment}>
						<div className={cx(styles.avatar, styles.commentAvatar)}>{initials(comment.name)}</div>
						<div className={styles.commentMain}>
							<div className={styles.commentHead}>
								<span className={styles.commentAuthor}>{comment.name}</span>
								{comment.mine && <span className={styles.commentBadge}>Tu</span>}
								<span className={styles.commentDate}>{comment.date}</span>
							</div>
							<p className={styles.commentBody}>{comment.text}</p>
							<button
								type="button"
								className={cx(styles.commentLike, comment.likedByMe && styles.on)}
								onClick={() => toggleLike(comment.id)}
							>
								<Heart size={15} fill={comment.likedByMe ? 'currentColor' : 'none'} />
								<span>{comment.likes > 0 ? comment.likes : 'Patinka'}</span>
							</button>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
};
