import styles from './Pagination.module.css';
// import { useState } from 'react';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const Pagination = ({ setCurrentPage, currentPage, totalPages, pagesLimit = 5, color = '#d1d6cf' }) => {
    const renderPageNumbers = () => {
        if (totalPages === 1) {
            return (
                <button
                    key={1}
                    onClick={() => setCurrentPage(1)}
                    style={{ '--color-bgr-card': color }}
                    className={styles.activePage}
                >
                    1
                </button>
            );
        }

        const pageNumbers = [];
        const visiblePages = Math.min(pagesLimit, totalPages); // Visible pages count

        // First page
        pageNumbers.push(
            <button
                key={1}
                onClick={() => setCurrentPage(1)}
                style={{ '--color-bgr-card': color }}
                className={currentPage === 1 ? styles.activePage : ''}
            >
                1
            </button>
        );

        // Left ellipsis if necessary
        if (currentPage >= visiblePages && currentPage > Math.ceil(pagesLimit / 2) + 1) {
            pageNumbers.push(<button key='left'>. . .</button>);
        }

        // Visible page range
        const start = Math.max(2, currentPage - Math.floor(pagesLimit / 2)); // Start from 2 (not including the first page)
        const end = Math.min(totalPages - 1, currentPage + Math.floor(pagesLimit / 2)); // Exclude the last page

        for (let i = start; i <= end; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    style={{ '--color-bgr-card': color }}
                    className={currentPage === i ? styles.activePage : ''}
                >
                    {i}
                </button>
            );
        }

        // Right ellipsis if necessary
        if (currentPage < totalPages - visiblePages && currentPage + Math.ceil(pagesLimit / 2) < totalPages - 1) {
            pageNumbers.push(<button key='right'>. . .</button>);
        }

        // Last page
        pageNumbers.push(
            <button
                key={totalPages}
                onClick={() => setCurrentPage(totalPages)}
                style={{ '--color-bgr-card': color }}
                className={currentPage === totalPages ? styles.activePage : ''}
            >
                {totalPages}
            </button>
        );

        return pageNumbers;
    };

    return (
        <div className={styles.pagination}>
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
            >
                <MdKeyboardArrowLeft className={styles.icon} />
            </button>

            {renderPageNumbers()}

            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
            >
                <MdKeyboardArrowRight className={styles.icon} />
            </button>
        </div>
    );
};

export default Pagination;
