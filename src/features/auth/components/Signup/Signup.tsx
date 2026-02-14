import styles from "./Signup.module.scss";
import { FormInput } from '../FormInput';
import { useAuthentication } from '../../hooks/useAuthentication';

export const Signup = () => {
    const { formData, handleChange, handleSubmit } = useAuthentication();

    return (
        <form className={styles.signup} id="auth-form" onSubmit={handleSubmit}>
            <FormInput
                type="text"
                name="name"
                label="Vardas"
                placeholder="Vardas"
                inputValue={formData.name}
                autoComplete="given-name"
                autoFocus={true}
                handleChange={handleChange}
            />
            <FormInput
                type="email"
                name="email"
                label="El. paštas"
                placeholder="vardas@pavyzdys.lt"
                inputValue={formData.email}
                autoComplete="email"
                handleChange={handleChange}
            />
            <FormInput
                type="password"
                name="password"
                label="Slaptažodis"
                placeholder="Mažiausiai 8 simboliai"
                inputValue={formData.password}
                autoComplete="new-password"
                handleChange={handleChange}
            />
            <FormInput
                type="password"
                name="passwordConfirmed"
                label="Pakartokite slaptažodį"
                placeholder="••••••••"
                inputValue={formData.passwordConfirmed}
                autoComplete="new-password"
                handleChange={handleChange}
            />
        </form>
    );
};
