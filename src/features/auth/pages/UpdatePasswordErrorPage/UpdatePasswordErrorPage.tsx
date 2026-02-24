import { useNavigate } from "react-router-dom";

import { ArrowLeft, CircleAlert, TriangleAlert } from "lucide-react";

import { Cluster } from "../../../../components/Shared";

import styles from "./UpdatePasswordErrorPage.module.scss";

export const UpdatePasswordErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <Cluster justify="center" className={styles.iconWrapper}>
                    <div className={styles.iconCircle}>
                        <TriangleAlert strokeWidth={1.5} className={styles.iconShake} />
                    </div>
                </Cluster>

                <h1 className={styles.title}>Nuoroda nebegalioja</h1>
                <p className={styles.subtitle}>
                    Slaptažodžio atkūrimo nuoroda yra netinkama arba pasibaigė jos galiojimo laikas
                </p>

                <div className={styles.reasonsBox}>
                    <div className={styles.reasonsContent}>
                        <div className={styles.reasonsIcon}>
                            <CircleAlert />
                        </div>
                        <div>
                            <p className={styles.reasonsTitle}>Galimos priežastys:</p>
                            <ul className={styles.reasonsList}>
                                <li>Nuorodos galiojimo laikas pasbaigė (10 min.)</li>
                                <li>Nuoroda jau buvo panaudota</li>
                                <li>Nuoroda buvo nukopijuota neteisingai</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <button type="button" onClick={() => navigate("/prisijungti")} className={styles.secondaryButton}>
                    <ArrowLeft size={16} />
                    Grįžti į prisijungimą
                </button>
            </div>
        </div>
    );
};
