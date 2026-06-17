import type { ArticleBodyBlock } from '../../../articles/services/articlesService';

import styles from './ArticleProse.module.scss';

interface ArticleProseProps {
	lead: string;
	body: ArticleBodyBlock[];
}

export const ArticleProse = ({ lead, body }: ArticleProseProps) => {
	return (
		<div className={styles.prose}>
			<p className={styles.proseLead}>{lead}</p>
			{body.map((block, index) => {
				if (block.t === 'h') {
					return (
						<h2 key={index} id={`sec-${index}`} className={styles.proseH2}>
							{block.x}
						</h2>
					);
				}
				if (block.t === 'q') {
					return (
						<blockquote key={index} className={styles.proseQuote}>
							{block.x}
						</blockquote>
					);
				}
				return <p key={index}>{block.x}</p>;
			})}
		</div>
	);
};
