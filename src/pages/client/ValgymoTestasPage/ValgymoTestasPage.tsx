import styles from './ValgymoTestasPage.module.css';
import { useState } from 'react';
import { Box, Cluster } from '../../../components/Shared';
import { questions, answerItems, resultItems } from './constants';
import { calculateScores, getHighestScore } from '../../../features/client/valgymotestas/utils/calculateScores';
import {
    TestLayout,
    TestHeader,
    ProgressBar,
    Question,
    Answer,
    Button,
    ResultTable,
    ResultPoint,
    KnowMore,
    Explanation
} from '../../../features/client/valgymotestas/components';
import type { QuestionCategory, AnswerMap, AnswerValue, QuestionItem } from './types';

const ValgymoTestasPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState<AnswerMap>({});
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (value: AnswerValue) => {
        setAnswers({ ...answers, [questions[currentPage].id]: value });
    };

    const handleNext = () => {
        if (currentPage < questions.length - 1) {
            setCurrentPage(currentPage + 1);
        } else if (answers[questions[currentPage].id]) {
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const currentQuestion: QuestionItem = questions[currentPage];
    const currentAnswer: AnswerValue | undefined = answers[currentQuestion?.id];
    const progress: number = ((currentPage + 1) / questions.length) * 100;


    if (showResults) {
        const scores = calculateScores(questions, answers);
        const result = getHighestScore(scores);

        return (
            <>
                <TestHeader
                    title='Valgymo elgsenos klausimynas'
                    subTitle='Atlik šį testą ir sužinok kodėl iki šiol nepavyko pasiekti rezultatų'
                />
                <TestLayout>
                    <ResultTable>
                        {Object.entries(scores).sort((a, b) => Number(b[1]) - Number(a[1])).map(([key, val]) => <ResultPoint
                            key={key}
                            title={resultItems[key as QuestionCategory].title}
                            description={resultItems[key as QuestionCategory].description}
                            score={val}
                        />)}
                        <Explanation />
                    </ResultTable>
                    <KnowMore result={result} />
                </TestLayout>
            </>
        );
    }

    return (
        <>
            <TestHeader
                title='Valgymo elgsenos klausimynas'
                subTitle='Atlik šį testą ir sužinok kodėl iki šiol nepavyko pasiekti rezultatų'
            />
            <TestLayout>
                <ProgressBar
                    currentPage={currentPage}
                    questionLength={questions.length}
                    progress={progress}
                />

                <Question currentQuestion={currentQuestion.text} />
                <Cluster className={styles.answers} dir='column' gap='var(--s-12)'>
                    {answerItems.map((option, index) => (
                        <Answer
                            key={option.value}
                            index={index}
                            currentAnswer={currentAnswer}
                            option={option}
                            onClick={() => handleAnswer(option.value as AnswerValue)}
                        />
                    ))}
                </Cluster>

                <Box className={styles.buttonsContainer}>
                    <Button
                        onClick={handlePrevious}
                        variant='Atgal'
                        disabled={currentPage === 0}
                    />
                    <Button
                        onClick={handleNext}
                        variant={currentPage === questions.length - 1 ? 'Baigti' : 'Toliau'}
                        disabled={!currentAnswer}
                    />
                </Box>
            </TestLayout>
        </>
    );
};

export default ValgymoTestasPage;
