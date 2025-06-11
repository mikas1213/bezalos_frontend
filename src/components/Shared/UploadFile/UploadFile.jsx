import styles from "./UploadFile.module.css";
import { FaRegArrowAltCircleUp } from "react-icons/fa";

const UploadFile = ({ label, buttonTitle, accept, name, className = '', handleFormInput }) => {
    return (
        <div className={`${styles.inputGroup} ${className}`}>
            <span className={styles.inputLabel}>{label}</span>
            <div className={styles.fileUpload}>
                <input
                    type='file'
                    accept={accept}
                    name={name}
                    id={name}
                    className={styles.inputFile}
                    onChange={handleFormInput}
                />
                <div
                    className={styles.uploadFileBtn}
                    onClick={() => {
                        document.getElementById(name).click();
                    }}
                >
                    <FaRegArrowAltCircleUp className={styles.iconPhoto} />
                    <span className={styles.buttonTitle}>{buttonTitle}</span>
                </div>
            </div>
        </div>
    );
};

export default UploadFile;
