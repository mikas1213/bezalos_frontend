import styles from './SectionTitle.module.css';
import { Box, Stack } from '../../Shared';
import { useMediaQuery } from '../../../contexts/MediaQueryProvider';

interface SectionTitleProps {
    title: string,
    subTitle?: string,
    size?: 'sm' | 'md' | 'lg'
}

export const SectionTitle = ({ title, subTitle, size = 'lg' }: SectionTitleProps) => {
    const mediaQuery: number = useMediaQuery();
    const titleClasses = [
        styles.title,
        styles[size]
    ].join(' ');

    const subTitleClasses = [
        styles.subTitle,
        styles[size]
    ].join(' ');

    return (
        <Stack>
            <Box className={titleClasses}>{ title }</Box>
            {subTitle && <Box className={subTitleClasses}>{ subTitle }</Box>}
        </Stack>
    );
};