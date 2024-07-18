import styles from './Offer.module.css';
import avatar from '../../assets/images/offer/offer.webp';
import Overlay from './Overlay';

import { IoCloseSharp } from "react-icons/io5";
import { useEffect } from 'react';

const Offer = ({ setIsShowOffer }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsShowOffer(false); 
    };

    return (
        <Overlay>
            <div className={styles.offerModal}>
                <div className={styles.offerContent}>                    
                    <IoCloseSharp className={styles.icon} onClick={() => setIsShowOffer(false)} />
                    <div className={styles.imgContainer}>
                        <img src={avatar} alt='avatar' />
                    </div>

                    <div className={styles.textContainer}>
                        <h1>DOVANA 🎁</h1>
                        <p>
                            Įrašyk save el. paštą ir NEMOKAMAI gauk vieną žiūrimiausių Be žalos | Virtuvės merginų įrašą&nbsp;<br />
                            <span>&quot;Fizinis ir emocinis alkis&quot;</span> 
                        </p>
                    </div>

                    {/* <div className={styles.formContainer}> */}
                        <form className={styles.formGroup} onSubmit={handleSubmit}>
                            <input type="text" placeholder='el. paštas'/>
                            <button>IŠPAKUOTI DOVANĄ</button>
                        </form>
                    {/* </div> */}
                </div>
            </div>
        </Overlay>
    );
};

export default Offer;