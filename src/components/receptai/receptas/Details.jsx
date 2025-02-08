import styles from './Details.module.css';
import { Clock, CirclePlay, Dot, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BiBowlRice } from 'react-icons/bi';


const Details = () => {
    const [bumbulis, setBumbulis] = useState(0);
    console.log(bumbulis)
    return (
        <div className={styles.details}>
            <div className={styles.title}>Bulvinis blynas su malta vištiena</div>

            <div className={styles.properties}>
                <div className={styles.time}>
                    <Clock className={styles.icon} />
                    <span>
                        45<small>min.</small>
                    </span>
                </div>

                <Link className={styles.video}>
                    <CirclePlay className={styles.icon} />
                    <span>Žiūrėti video</span>
                </Link>

                <div className={styles.slider}>
                    <div className={styles.number}><BiBowlRice className={styles.iconMeal}/></div>
                    {[0,1,2,3].map(val => <div key={val}
                        className={`${styles.number} ${val === bumbulis ? styles.active : ''}`} 
                        onClick={() => setBumbulis(val)}>
                            {val+1}
                            <small>x</small>
                        </div>
                    )}

                    <div 
                        className={styles.bumbulis} 
                        style={{left: `calc(2.25rem + ${20*bumbulis}%)`}}
                    ></div>
                </div>
            </div>


            {/* <div className={styles.portions}> */}
                {/* <div className={styles.portionsLabel}>Porcijų skaičius</div> */}
                {/* <div className={styles.slider}>
                    {[0,1,2,3].map(val => <div key={val}
                        className={`${styles.number} ${val === bumbulis ? styles.active : ''}`} 
                        onClick={() => setBumbulis(val)}>{val+1}x</div>
                    )}

                    <div 
                        className={styles.bumbulis} 
                        style={{left: `calc(0.25rem + ${25*bumbulis}%)`}}
                    ></div>
                </div> */}
            {/* </div> */}



            <div className={styles.bar}>
                <div className={`${styles.barItem} ${styles.b}`}>
                    <span>B</span>
                    <span>
                        195<small>g</small>
                    </span>
                </div>
                <div className={`${styles.barItem} ${styles.a}`}>
                    <span>A</span>
                    <span>46<small>g</small></span>
                </div>
                <div className={`${styles.barItem} ${styles.r}`}>
                    <span>R</span>
                    <span>120<small>g</small></span>
                </div>
                <div className={`${styles.barItem} ${styles.kcal}`}>
                    <span><Flame className={styles.iconFlame} /></span>
                    <span>2194</span>
                </div>
            </div>

        


            <div className={styles.products}>
                <div className={styles.prod}>
                    <Dot className={styles.iconDot} />
                    <span>Apelsinai</span>
                    <span>50 g</span>
                </div>


                <div className={styles.prod}>
                    <Dot className={styles.iconDot} />
                    <span>Avižinės porcijinės duonelės</span>
                    <span>150 g</span>
                </div>

                <div className={styles.prod}>
                    <Dot className={styles.iconDot} />
                    <span>Druska ir kt. prieskoniai</span>
                    <span>95 g</span>
                </div>

                <div className={styles.prod}>
                    <Dot className={styles.iconDot} />
                    <span>Balzaminio acto kremas</span>
                    <span>495 g</span>
                </div>

                <div className={styles.prod}>
                    <Dot className={styles.iconDot} />
                    <span>Riebi varškė</span>
                    <span>175 g</span>
                </div>

                
            </div>

            <div className={styles.description}>
            A simple egg and cheese sandwich. A simple egg and cheese sandwich. A simple egg and cheese sandwich.

            A simple egg and cheese sandwich.
            A simple egg and cheese sandwich.
            A simple egg and cheese sandwich.
            <var></var>
            </div>

        </div>
    );
};

export default Details;