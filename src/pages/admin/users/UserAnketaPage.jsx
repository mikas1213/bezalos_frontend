import { useOutletContext } from 'react-router-dom';

const UserAnketaPage = () => {
    const { user } = useOutletContext();
    console.log('UserAnketaPageL ', user)
    return (
        <div>
            <div>
                <span>Vardas </span>
                <span>{user.name}</span>
            </div>

            <div>
                <span>El. paštas </span>
                <span>{user.email}</span>
            </div>
        </div>
    );
};

export default UserAnketaPage;