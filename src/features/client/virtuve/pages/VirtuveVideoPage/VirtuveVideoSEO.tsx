import { Helmet } from 'react-helmet';

import type { VideoPageDto } from '../../types';

const S3_BASE = 'https://bezalos.s3.us-east-1.amazonaws.com/';

interface Props {
	video: VideoPageDto;
}

const VirtuveVideoSEO = ({ video }: Props) => {
	const thumbnailUrl = `${S3_BASE}${video.imageS3Key}`;
	const videoUrl = `https://www.bezalos.lt/virtuve/${video.slug}`;
	const createdAt = new Date(video.createdAt).toISOString().split('T')[0];

	const keywords = [video.title, 'virtuvė', 'receptas', 'be žalos', 'sveikas maistas', ...video.videoTags].join(', ');

	const schemaData = {
		'@context': 'https://schema.org',
		'@type': 'VideoObject',
		name: video.title,
		description: video.description,
		thumbnailUrl,
		uploadDate: createdAt,
		...(video.contentUrl && { contentUrl: video.contentUrl }),
		duration: video.duration,
		keywords,
		author: {
			'@type': 'Person',
			name: 'Be žalos',
		},
		publisher: {
			'@type': 'Organization',
			name: 'Be žalos',
			logo: {
				'@type': 'ImageObject',
				url: 'https://www.bezalos.lt/logo.png',
			},
		},
	};

	return (
		<Helmet>
			<title>{video.title} | Be žalos Virtuvė</title>
			<meta name="description" content={video.description.slice(0, 160)} />
			<meta name="keywords" content={keywords} />

			<link rel="canonical" href={videoUrl} />

			<meta property="og:site_name" content="Be žalos" />
			<meta property="og:locale" content="lt_LT" />
			<meta property="og:title" content={video.title} />
			<meta property="og:description" content={video.description.slice(0, 160)} />
			<meta property="og:type" content="video.other" />
			<meta property="og:url" content={videoUrl} />
			<meta property="og:image" content={thumbnailUrl} />
			{video.contentUrl && <meta property="og:video" content={video.contentUrl} />}

			<meta name="twitter:card" content={video.contentUrl ? 'player' : 'summary_large_image'} />
			<meta name="twitter:title" content={video.title} />
			<meta name="twitter:description" content={video.description.slice(0, 160)} />
			<meta name="twitter:image" content={thumbnailUrl} />
			{video.contentUrl && <meta name="twitter:player" content={video.contentUrl} />}

			<script type="application/ld+json">{JSON.stringify(schemaData)}</script>
		</Helmet>
	);
};

export default VirtuveVideoSEO;
