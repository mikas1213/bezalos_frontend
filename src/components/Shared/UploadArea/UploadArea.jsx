import styles from './UploadArea.module.css';
import { IoMdVideocam } from 'react-icons/io';
import { IoMdImage } from 'react-icons/io';

const params = {
    video: { 
        icon: <IoMdVideocam />, 
        title: 'Video',
        fileFormats: 'MP4, MOV, WEBM, AVI, MKV'
    },
    photo: { 
        icon: <IoMdImage />, 
        title: 'Nuotrauka',
        fileFormats: 'JPEG, PNG, JPG, WEBP'
    }
};

const UploadArea = ({ accept, name, className = '', handleFormInput }) => {
    return (

        <div className={`${styles.uploadArea} ${className}`} onClick={() => { 
            document.getElementById(name).click() 
        }}>
            <div className={styles.uploadIcon}>
                {params[name].icon}
            </div>
            <div className={styles.uploadTitle}>{params[name].title}</div>
            <div className={styles.fileTypes}>{params[name].fileFormats}</div>
            <input
                type='file'
                accept={accept}
                name={name}
                id={name}
                className={styles.inputFile}
                onChange={handleFormInput}
            />
        </div>
    );
};

export default UploadArea;
