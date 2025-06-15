import styles from './File.module.css';
import { FileImage, FileVideo2, CircleCheck, Loader, CircleX } from 'lucide-react';

const params = {
    video: { icon: <FileVideo2 /> },
    photo: { icon: <FileImage />}
};
const File = ({ name, fileName, fileSize, fileType, className = '', onClick, uploading, uploadSuccess}) => {
    
    return (
        <div className={`${styles.fileCard} ${className} ${uploadSuccess && styles.uploadSuccess}`}>
            <div className={styles.fileIcon}>
                { params[name]?.icon }
            </div>

            <div className={styles.fileData}>
                <div className={styles.fileName}>
                    {fileName}
                </div>
                <div className={styles.fileInfo}>
                    {fileSize}
                </div>
                <div className={styles.fileInfo}>
                    {fileType}
                </div>
            </div>
            

            <div 
                className={`${styles.fileStatusIcon} ${uploadSuccess ? styles.iconSuccess : uploading ? styles.pending : styles.iconRemove}`} 
                onClick={uploadSuccess || uploading ? undefined : onClick}
            >
                {!uploadSuccess ? 
                    !uploading ? 
                        <CircleX /> : 
                        <Loader /> : 
                    <CircleCheck />
                }
            </div>
        </div>
    );
};

export default File;
