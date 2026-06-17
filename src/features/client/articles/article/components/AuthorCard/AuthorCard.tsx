import { initials } from '../../utils/initials';

interface AuthorCardProps {
	author: string;
}

export const AuthorCard = ({ author }: AuthorCardProps) => {
	return (
		<div className="bz-author-card">
			<div className="bz-author-avatar">{initials(author)}</div>
			<div className="bz-author-body">
				<span className="bz-author-eyebrow">Autorė</span>
				<h4 className="bz-author-name">{author}</h4>
				<p className="bz-author-text">
					Mitybos specialistė ir „Be žalos“ bendruomenės įkūrėja. Padeda atkurti ramų, sąmoningą santykį su maistu — su
					meile ir be žalos.
				</p>
			</div>
		</div>
	);
};
