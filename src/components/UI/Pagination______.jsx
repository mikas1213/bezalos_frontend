/*
import styles from './Pagination.module.css';
import { useState } from 'react';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
const Pagination = ({ setCurrentPage, currentPage, totalPages, pagesLimit = 5, color = '#d1d6cf' }) => {

    const [pageNumberLimit] = useState(pagesLimit);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(pagesLimit);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);

            if ((currentPage - 1) % pageNumberLimit === 0) {
                setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
                setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
            }
        }
    };
    
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);

            if (currentPage + 1 > maxPageNumberLimit) {
                setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
                setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
            }
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for(let i = 1; i <= totalPages; i++) {
            if(i < maxPageNumberLimit + 1 && i > minPageNumberLimit) {
                pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    style={{'--color-bgr-card': color}}
                    className={i === currentPage ? styles.activePage : ''}
                >{i}</button>);
            }
        }
        return pageNumbers;
    };

    return (
        <div className={styles.pagination}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                <MdKeyboardArrowLeft className={styles.icon} />
            </button>

            {renderPageNumbers()}

            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                <MdKeyboardArrowRight className={styles.icon} />
            </button>
        </div>
    );
};

export default Pagination;

*/