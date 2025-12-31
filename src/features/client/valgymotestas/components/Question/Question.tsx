import styles from './Question.module.css';
import { Box } from '../../../../../components/Shared';

interface CurrentQuestionProps {
    currentQuestion: string
}
export const Question = ({ currentQuestion }: CurrentQuestionProps) => {
    return(
        <Box className={styles.question} padding={['0', '0', '50px', '0']}>
            <h2 className={styles.questionTitle}>{currentQuestion}</h2>
            <p className={styles.questionParagraph}>Pasirinkite atsakymą</p>
        </Box>
    );
};
