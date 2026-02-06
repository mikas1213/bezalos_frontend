import { useState, useEffect, type FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authService, { type ErrorResponse } from '../services/authService';

export const ResetPasswordPage = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [formData, setFormData] = useState({
        password: '',
        passwordConfirmed: ''
    });
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isValidatingToken, setIsValidatingToken] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);

    // Validate token on mount
    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setError('Nuoroda neteisinga');
                setIsValidatingToken(false);
                return;
            }

            try {
                const response = await authService.validateResetToken(token);
                setEmail(response.email);
                setTokenValid(true);
            } catch (err: any) {
                const errorResponse = err.response?.data as ErrorResponse;
                setError(errorResponse?.message || 'Nuoroda neteisinga arba nebegaliojanti');
                setTokenValid(false);
            } finally {
                setIsValidatingToken(false);
            }
        };

        validateToken();
    }, [token]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Client-side validation
        if (formData.password !== formData.passwordConfirmed) {
            setError('Slaptažodžiai nesutampa');
            return;
        }

        if (formData.password.length < 8) {
            setError('Slaptažodis turi būti bent 8 simbolių');
            return;
        }

        if (!/\d/.test(formData.password)) {
            setError('Slaptažodis turi turėti bent vieną skaičių');
            return;
        }

        if (!token) {
            setError('Nuoroda neteisinga');
            return;
        }

        setIsLoading(true);

        try {
            const response = await authService.updatePassword(token, formData);
            setSuccess(response.message);

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/prisijungti');
            }, 2000);
        } catch (err: any) {
            const errorResponse = err.response?.data as ErrorResponse;
            setError(errorResponse?.message || 'Klaida keičiant slaptažodį. Bandykite dar kartą.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (isValidatingToken) {
        return (
            <div className="reset-password-page">
                <div className="container">
                    <p>Tikrinama nuoroda...</p>
                </div>
            </div>
        );
    }

    if (!tokenValid) {
        return (
            <div className="reset-password-page">
                <div className="container">
                    <h1>Slaptažodžio atstatymas</h1>
                    <div className="error-message" style={{ color: 'red' }}>
                        {error}
                    </div>
                    <button onClick={() => navigate('/prisijungti')}>
                        Grįžti į prisijungimą
                    </button>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="reset-password-page">
                <div className="container">
                    <h1>Slaptažodis pakeistas!</h1>
                    <p>{success}</p>
                    <p>Nukreipiame į prisijungimą...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="reset-password-page">
            <div className="container">
                <h1>Atstatyti slaptažodį</h1>
                <p>El. paštas: {email}</p>

                {error && (
                    <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="password">Naujas slaptažodis</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                            disabled={isLoading}
                            autoComplete="new-password"
                        />
                        <small>Mažiausiai 8 simboliai, turi turėti skaičių</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="passwordConfirmed">Pakartokite slaptažodį</label>
                        <input
                            type="password"
                            id="passwordConfirmed"
                            name="passwordConfirmed"
                            value={formData.passwordConfirmed}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            autoComplete="new-password"
                        />
                    </div>

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Keičiama...' : 'Pakeisti slaptažodį'}
                    </button>
                </form>
            </div>
        </div>
    );
};
