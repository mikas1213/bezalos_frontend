import styles from './Naryste_card.module.css';
// import { useContext } from 'react';
// import { NarysteContext } from '../../../pages/PaslaugosPage';

const Naryste_card = ({ plan, handleSubscriptionCheckout }) => {
    // const bilekas = useContext(NarysteContext);
    

    return (
        <div className={styles.naryste_card}>
            <h3>{ plan.plan_name }</h3>
            <div>€{ plan.price }</div>
            <button onClick={ () => handleSubscriptionCheckout({plan}) }>Užsakyti</button>
        </div>
    );
};


export default Naryste_card;