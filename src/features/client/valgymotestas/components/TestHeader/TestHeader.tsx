import styles from './TestHeader.module.css';
import { Box, Center } from '../../../../../components/Shared';

interface TestHeaderProps {
    title: string;
    subTitle: string;
}

export const TestHeader = ({ title, subTitle }: TestHeaderProps) => {
    return (
        <Box className={styles.testHeader}>
            <Center intrinsic={true}>
                <h3 className={styles.title}>{ title }</h3>
                <p className={styles.subTitle}>{ subTitle }</p>
            </Center>
        </Box>
    );
};
