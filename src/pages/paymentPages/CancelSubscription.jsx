import styles from './CancelSubscription.module.css';
import Main from '../../components/UI/Main';
import Container from '../../components/virtuve/Container';

const CancelSubscription = () => {
    return (
        <>
            <Main>
                <Container>
                    <div className={styles.cancelSubscription}>
                        <div>
                            <h3>Kažkas negerai</h3>
                            <a href='http://localhost:5173/paslaugos'>Į paslaugas</a>
                        </div>
                    </div>
                </Container>
            </Main>
        </>
        
    );
};

export default CancelSubscription;