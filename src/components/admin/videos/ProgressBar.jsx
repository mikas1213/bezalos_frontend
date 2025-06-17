import styles from './ProgressBar.module.css';

const ProgressBar = ({ uploadError, uploadSuccess, uploadProgress, videoProgress, message }) => {
    return (
        <div className={`${styles.progressBarContainer} ${uploadError ? styles.error : ''} ${uploadSuccess && styles.uploaded}`}>
            <div className={styles.progressBar}>
                <div className={styles.progressServer} style={{ width: `${uploadProgress}%` }}>
                    <div className={`${styles.progressAws} ${styles.video}`} style={{ width: `${videoProgress}%`}} />
                </div>
            </div>

            <div className={styles.progressData}>
                <div className={styles.progressText}>{message}</div>
                {/* <div className={styles.progressText}>{uploadProgress >= 100 && videoProgress > 0 ? videoProgress : uploadProgress}%</div> */}
                <div className={styles.progressText}>

                    {!uploadError ? 
                        <>
                            <span>{uploadProgress}%</span>&nbsp;/&nbsp;<span>{videoProgress}%</span>
                        </> :
                        <span>err</span>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;