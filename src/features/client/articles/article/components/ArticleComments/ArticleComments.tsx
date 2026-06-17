import { type FormEvent, useState } from 'react';

import { Heart } from 'lucide-react';

import { useArticleComments } from '../../hooks';
import { initials } from '../../utils/initials';

interface ArticleCommentsProps {
	articleId: string;
}

export const ArticleComments = ({ articleId }: ArticleCommentsProps) => {
	const { comments, addComment, toggleLike } = useArticleComments(articleId);
	const [name, setName] = useState('');
	const [text, setText] = useState('');

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!text.trim()) return;
		addComment(name, text);
		setName('');
		setText('');
	};

	return (
		<section className="bz-comments">
			<h3 className="bz-comments-title">
				Komentarai <span>({comments.length})</span>
			</h3>

			<form className="bz-comment-form" onSubmit={handleSubmit}>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="bz-comment-name"
					placeholder="Tavo vardas (nebūtina)"
				/>
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					className="bz-comment-text"
					rows={3}
					placeholder="Pasidalink mintimis švelniai ir su pagarba…"
				/>
				<div className="bz-comment-actions">
					<button type="submit" className="bz-comment-submit" disabled={!text.trim()}>
						Komentuoti
					</button>
				</div>
			</form>

			<ul className="bz-comment-list">
				{comments.map((comment) => (
					<li key={comment.id} className="bz-comment">
						<div className="bz-avatar bz-comment-avatar">{initials(comment.name)}</div>
						<div className="bz-comment-main">
							<div className="bz-comment-head">
								<span className="bz-comment-author">{comment.name}</span>
								{comment.mine && <span className="bz-comment-badge">Tu</span>}
								<span className="bz-comment-date">{comment.date}</span>
							</div>
							<p className="bz-comment-body">{comment.text}</p>
							<button
								type="button"
								className={`bz-comment-like ${comment.likedByMe ? 'on' : ''}`}
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
