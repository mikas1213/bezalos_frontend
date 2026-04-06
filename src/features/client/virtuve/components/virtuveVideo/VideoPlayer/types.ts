interface VideoPlayer {
	id: string;
	embedUrl: string;
	isSnippet: boolean;
}
export interface VideoPlayerProps {
	video: VideoPlayer;
}
