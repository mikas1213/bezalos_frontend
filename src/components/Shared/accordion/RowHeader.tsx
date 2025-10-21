import styles from './RowHeader.module.css';
import { RiArrowLeftSLine } from 'react-icons/ri';
import type { Row, Color } from './types';
type Props = {
    row: Row,
    colors: Color, 
    isOpen: boolean
};

const RowHeader = ({ row, colors, isOpen }: Props) => {
    return (
        <div style={{ color: `${ isOpen ? colors.activeColor : colors.textColor }`}} className={styles.rowHeader} >
            <p>{row.title}</p>
            <span>
                <RiArrowLeftSLine 
                    style={{ transform: `${isOpen ? 'rotate(-90deg)' : 'rotate(0deg)'}`}} 
                    className={styles.icon}
                />
            </span>
        </div>
    );
};

export default RowHeader;
