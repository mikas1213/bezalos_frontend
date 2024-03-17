import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaUser, FaLock } from "react-icons/fa6";
import { RiEyeCloseLine } from "react-icons/ri";
import { BsEyeFill } from "react-icons/bs";
import styles from "./RegistrationForm.module.css";
import axios from "../../api/axios";

const RegistrationForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmed, setPasswordConfirmed] = useState("");
    const [radioButtonValue, setRadioButtonValue] = useState("abu");

    const [openEye_1, setOpenEye_1] = useState(false);
    const [openEye_2, setOpenEye_2] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(
            "http://localhost:3003/api/v1/auth/signup",
            {
                name,
                email,
                password,
                passwordConfirmed,
            },
            {
                headers: { "Content-Tupe": "application/json" },
                withCredentials: true,
            }
        );

        console.log("response: ", response);
    };

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1>REGISTRACIJA</h1>
                <div className={styles.inputs}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            value={name}
                            // required
                            // pattern="[A-Za-z]{3}"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Vardas"
                            autoComplete="off"
                        />
                        <FaUser className={styles.icon} />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            value={email}
                            // required
                            // pattern="[A-Za-z]{3}"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="El. paštas"
                            autoComplete="off"
                        />
                        <FaEnvelope className={styles.icon} />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type={openEye_1 ? "text" : "password"}
                            value={password}
                            // required
                            // pattern="[A-Za-z]{3}"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Slaptažodis"
                            autoComplete="off"
                        />
                        <FaLock className={styles.icon} />
                        <div
                            className={styles.eye}
                            onClick={() => setOpenEye_1((on) => !on)}
                        >
                            {openEye_1 ? (
                                <BsEyeFill className={styles.iconEye} />
                            ) : (
                                <RiEyeCloseLine className={styles.iconEye} />
                            )}
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            id="name"
                            type={openEye_2 ? "text" : "password"}
                            value={passwordConfirmed}
                            // required
                            // pattern="[A-Za-z]{3}"
                            onChange={(e) =>
                                setPasswordConfirmed(e.target.value)
                            }
                            placeholder="Pakartokite slaptažodį"
                            autoComplete="off"
                        />
                        <FaLock className={styles.icon} />
                        <div
                            className={styles.eye}
                            onClick={() => setOpenEye_2((on) => !on)}
                        >
                            {openEye_2 ? (
                                <BsEyeFill className={styles.iconEye} />
                            ) : (
                                <RiEyeCloseLine className={styles.iconEye} />
                            )}
                        </div>
                    </div>
                </div>

                <h3>Mane domina: </h3>

                <div className={styles.radios}>
                    <div className={styles.radioGroup}>
                        <input
                            type="radio"
                            name="target"
                            id="profilis"
                            value="profilis"
                            checked={radioButtonValue === "profilis"}
                            onChange={() => setRadioButtonValue("profilis")}
                        />
                        <span className={styles.checkmark} onClick={() => setRadioButtonValue("profilis")}></span>
                        <label htmlFor="profilis">Sveikas svorio metimas</label>
                    </div>

                    <div className={styles.radioGroup}>
                        <input
                            type="radio"
                            name="target"
                            id="virtuve"
                            value="virtuve"
                            checked={radioButtonValue === "virtuve"}
                            onChange={() => setRadioButtonValue("virtuve")}
                        />
                        <span className={styles.checkmark} onClick={() => setRadioButtonValue("virtuve")}></span>
                        <label htmlFor="virtuve">
                            Mitybos įpročių formavimas
                        </label>
                    </div>

                    <div className={styles.radioGroup}>
                        <input
                            type="radio"
                            name="target"
                            id="abu"
                            value="abu"
                            checked={radioButtonValue === "abu"}
                            onChange={() => setRadioButtonValue("abu")}
                        />
                        <span className={styles.checkmark} onClick={() => setRadioButtonValue("abu")}></span>
                        <label htmlFor="abu">Abu</label>
                    </div>

                    <div className={styles.radioGroup}>
                        <input
                            type="radio"
                            name="target"
                            id="nezinau"
                            value="nezinau"
                            checked={radioButtonValue === "nezinau"}
                            onChange={() => setRadioButtonValue("nezinau")}
                        />
                        <span className={styles.checkmark} onClick={() => setRadioButtonValue("nezinau")}></span>
                        <label htmlFor="nezinau">Dar nežinau</label>
                    </div>
                </div>
                <button>REGISTRUOTIS</button>
            </form>
        </>
    );
};

export default RegistrationForm;
