import type { ArticleBodyBlock } from '../../../articles/services/articlesService';

interface ArticleProseProps {
	lead: string;
	body: ArticleBodyBlock[];
}

export const ArticleProse = ({ lead, body }: ArticleProseProps) => {
	return (
		<div className="bz-prose">
			<p className="bz-prose-lead">{lead}</p>
			{body.map((block, index) => {
				if (block.t === 'h') {
					return (
						<h2 key={index} id={`sec-${index}`} className="bz-prose-h2">
							{block.x}
						</h2>
					);
				}
				if (block.t === 'q') {
					return (
						<blockquote key={index} className="bz-prose-quote">
							{block.x}
						</blockquote>
					);
				}
				return <p key={index}>{block.x}</p>;
			})}
		</div>
	);
};
