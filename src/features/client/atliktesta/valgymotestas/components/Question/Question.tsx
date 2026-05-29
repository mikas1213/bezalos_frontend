import { Box } from '../../../../../../components/Shared';

import styles from './Question.module.scss';

interface CurrentQuestionProps {
	currentQuestion: string;
}
export const Question = ({ currentQuestion }: CurrentQuestionProps) => {
	return (
		<Box className={styles.question}>
			<h2 className={styles.questionTitle}>{currentQuestion}</h2>
			<p className={styles.questionParagraph}>Pasirinkite atsakymą</p>
		</Box>
	);
};
