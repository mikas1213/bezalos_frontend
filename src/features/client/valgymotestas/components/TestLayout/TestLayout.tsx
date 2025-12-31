import styles from './TestLayout.module.css';
import type { ReactNode } from 'react';
import { Cluster } from '../../../../../components/Shared';

type TestLayoutProps = {
    children: ReactNode
}
export const TestLayout = ({ children }: TestLayoutProps) => {
    return(
        <Cluster className='padding--b' justify='center' align='center'>
            <Cluster className={styles.testLayout} justify='flex-start' dir='column'>
                { children }
            </Cluster>
        </Cluster>
    );
};
